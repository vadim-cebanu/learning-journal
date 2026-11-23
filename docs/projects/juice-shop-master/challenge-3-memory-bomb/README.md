# Memory Bomb — OWASP Juice Shop

**Category:** Insecure Deserialization
**Difficulty:** ★★★★
**Vulnerability:** YAML "billion laughs" (exponential alias expansion) on an
unvalidated file-upload endpoint
**Goal:** Drop some explosive data into a vulnerable file-handling endpoint.
**Video walkthrough:** [Watch on Loom](https://www.loom.com/share/e272963d3fdd4440bab5c2a927459de7)

---

:::caution Educational purposes only
Performed on a local, personal OWASP Juice Shop instance. Never test these techniques on systems you do not own or have explicit permission to test.
:::

## 1. Summary

The *File Complaint* upload endpoint also accepts **YAML** files and parses
them on the server with no size limit, no content validation, and no safe
schema. A tiny YAML file that uses nested anchors and aliases expands into tens
of millions of objects in memory when parsed — a classic **billion-laughs**
attack. The parser runs under a 2-second limit; the expansion blows past it,
the request is killed, and the challenge is solved.

The file on disk is a few hundred bytes. In memory it becomes gigabytes.

---

## 2. Root Cause

The handler reads the whole uploaded buffer and feeds it straight to the YAML
parser:

```
const data = file.buffer.toString()
... yaml.load(data) ...   // no size cap, no extension allowlist, no schema
```

There is nothing stopping a malicious document from defining recursive alias
expansion, so a few lines of YAML force the parser to allocate enormous nested
structures.

---

## 3. Proof of Concept

### Payload

`bomb.yml`:

```yaml
a: &a ["lol","lol","lol","lol","lol","lol","lol","lol","lol"]
b: &b [*a,*a,*a,*a,*a,*a,*a,*a,*a]
c: &c [*b,*b,*b,*b,*b,*b,*b,*b,*b]
d: &d [*c,*c,*c,*c,*c,*c,*c,*c,*c]
e: &e [*d,*d,*d,*d,*d,*d,*d,*d,*d]
f: &f [*e,*e,*e,*e,*e,*e,*e,*e,*e]
g: &g [*f,*f,*f,*f,*f,*f,*f,*f,*f]
h: &h [*g,*g,*g,*g,*g,*g,*g,*g,*g]
i: &i [*h,*h,*h,*h,*h,*h,*h,*h,*h]
```

### How it detonates

- `&a` defines a list of 9 strings.
- `&b` references `a` nine times → 9 × 9 = 81 strings.
- `&c` references `b` nine times → 729.
- …each level multiplies by 9.
- `i` reaches 9⁸ ≈ **43,000,000** copies of `"lol"`.

The file is ~342 bytes; the parsed structure is gigabytes.

---

## 4. Exploitation

1. Log in to Juice Shop (any account).
2. Open **Customer Feedback → File Complaint** (`/#/complain`).
3. **Message:** any text.
4. **Invoice:** in the file picker, switch the filter to **All files** so you
   can select a `.yml` file, and choose `bomb.yml`.
5. Click **Submit**.

### Expected result

- The response is **delayed ~2 seconds** while the parser expands the bomb.
- The server returns **HTTP 503** (resources exhausted / timed out).
- The **Memory Bomb** challenge is marked solved.

---

## 5. Why It Works

YAML anchors (`&name`) and aliases (`*name`) are a legitimate feature for
reusing data. But a parser that resolves them eagerly and without limits will
happily follow an exponential chain of references. Because the server trusts
any uploaded YAML, a 342-byte file becomes a memory-exhaustion weapon.

---

## 6. Remediation

:::tip Key takeaway
Validate and restrict untrusted input on the server side; never rely on the client or on outdated components.
:::

- **Cap upload size** and reject oversized or unexpected file types before
  parsing.
- **Use a safe YAML schema** that disables or limits alias expansion
  (e.g. a "safe load" mode), or a parser hardened against billion-laughs.
- **Enforce resource limits** (time, memory, output node count) on any
  deserialization of untrusted input.
- **Validate structure** against an expected schema instead of loading
  arbitrary documents.

---

## 7. Impact

:::danger Why it matters
See the consequences below: this flaw can seriously affect the availability, integrity or confidentiality of the application.
:::

A single small file can exhaust server memory and CPU, taking the application
offline (denial of service). Unbounded deserialization of untrusted input is a
recurring, high-impact weakness — the same idea underlies XML bombs (XXE DoS)
and other parser-amplification attacks.
