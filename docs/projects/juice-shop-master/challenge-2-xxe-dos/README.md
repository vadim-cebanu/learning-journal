# XXE DoS — OWASP Juice Shop

**Category:** XXE (XML External Entities)
**Difficulty:** ★★★★★
**Vulnerability:** XML External Entity injection → Denial of Service
**Goal:** "Give the server something to chew on for quite a while."
**Video walkthrough:** [Watch on Loom](https://www.loom.com/share/8af69a7afaa340f79e68b3cfafea2ece)

---

:::caution Educational purposes only
Performed on a local, personal OWASP Juice Shop instance. Never test these techniques on systems you do not own or have explicit permission to test.
:::

## 1. Summary

The *File Complaint* feature accepts `.xml` uploads and parses them on the
server with external entity resolution **enabled** (`noent: true`). This lets
an attacker define an external entity that points the parser at a resource
that never finishes — here `/dev/random`, an endless stream of random bytes.

The parser blocks trying to read it, exceeds the server's 2-second processing
limit, and the request is killed with a timeout. That timeout is exactly what
marks the challenge as solved — the server was successfully occupied without
an infinite loop.

---

## 2. Root Cause

XML parsers can be told to resolve *external entities* — references to files
or URLs outside the document. The server parses uploaded XML with this feature
turned on (`noent: true`) and without restricting DTDs, so an attacker controls
what the server reads.

---

## 3. Proof of Concept

### Payload

`xxe_dos.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///dev/random">
]>
<foo>&xxe;</foo>
```

### How it works

- `<!DOCTYPE foo [ ... ]>` declares a Document Type Definition.
- `<!ENTITY xxe SYSTEM "file:///dev/random">` defines an **external entity**
  that resolves to the system file `/dev/random`.
- `<foo>&xxe;</foo>` references the entity, forcing the parser to read it.

`/dev/random` never ends, so the parser hangs until the timeout fires.

---

## 4. Exploitation

1. Log in to Juice Shop (any account).
2. Open **Customer Feedback → File Complaint** (`/#/complain`).
3. **Message:** any text.
4. **Invoice:** select `xxe_dos.xml`.
5. **Submit.**

### Expected result

- The response is **delayed ~2 seconds** (the parser is stuck on `/dev/random`).
- The server returns **HTTP 503** (processing timed out).
- The **XXE DoS** challenge is marked solved on the Score Board.

---

## 5. Why It Works

When external entity resolution is left enabled on untrusted input, pointing
it at an infinite source (`/dev/random`) turns a harmless-looking XML upload
into a denial-of-service.

The same primitive, pointed at `/etc/passwd` instead, leaks server files
(the separate *XXE Data Access* challenge).

---

## 6. Remediation

:::tip Key takeaway
Validate and restrict untrusted input on the server side; never rely on the client or on outdated components.
:::

- **Disable external entity resolution and DTD processing** on any parser that
  handles untrusted XML (e.g. `noent: false`, disallow DOCTYPE).
- Validate and whitelist what the application accepts; reject documents that
  declare a DTD.
- Apply strict time and size limits on parsing as defense in depth.

---

## 7. Impact

:::danger Why it matters
See the consequences below: this flaw can seriously affect the availability, integrity or confidentiality of the application.
:::

XXE can cause denial of service (as here), disclose local files, perform
server-side request forgery, and in some stacks lead to remote code execution.
It is a high-severity class of bug precisely because a single uploaded document
can reach resources far beyond the intended scope.
