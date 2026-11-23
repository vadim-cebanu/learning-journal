# Server-side XSS Protection — OWASP Juice Shop

**Category:** XSS (Cross-Site Scripting)
**Difficulty:** ★★★★
**Vulnerability:** Stored XSS via a sanitization bypass (masking) in a legacy
`sanitize-html@1.4.2`
**Goal:** Perform a persisted XSS attack with
`<iframe src="javascript:alert(`xss`)">`, bypassing a **server-side** security
mechanism.
**Video walkthrough:** [Watch on Loom](https://www.loom.com/share/a5a6d2b447434e4096e266e9457c5bd8)

---

:::caution Educational purposes only
Performed on a local, personal OWASP Juice Shop instance. Never test these techniques on systems you do not own or have explicit permission to test.
:::

## 1. Summary

The feedback a customer submits (via the Contact form) is cleaned on the server
with an HTML sanitizer before being stored and later displayed. A plain
`<iframe>` is stripped out, so the payload must survive that sanitizer.

Juice Shop has several XSS tiers:

- **DOM / Reflected XSS** — handled purely in the browser; you just inject the
  payload.
- **Client-side XSS Protection** — the Angular frontend sanitizes input, so you
  bypass it by talking to the API directly (skip the frontend).
- **Server-side XSS Protection (this one)** — the **server** itself sanitizes
  the input before storing it. You cannot win by avoiding the frontend; you
  must defeat the server's sanitizer.

---

## 2. Root Cause

The server uses the outdated library **`sanitize-html` version 1.4.2**. This
version performs sanitization **only once and non-recursively** — it removes the
disallowed tags it finds in a single pass and does **not** re-scan the result.

That means if you *nest* a forbidden tag inside another copy of itself, removing
the inner one leaves behind a brand-new, valid forbidden tag that never gets
checked again. This technique is called **masking**.

---

## 3. Proof of Concept

### Payload

```
<<iframe src="javascript:alert(`xss`)">iframe src="javascript:alert(`xss`)">
```

### How the sanitizer processes it

1. Input received:
   `<<iframe src="javascript:alert(`xss`)">iframe src="javascript:alert(`xss`)">`
2. The sanitizer finds the first complete, recognized tag —
   `<iframe src="javascript:alert(`xss`)">` — and removes it.
3. What is left re-assembles into:
   `<iframe src="javascript:alert(`xss`)">`
4. Because there is no second pass, this now-valid `<iframe>` is **not**
   re-inspected. It is stored as-is.
5. When the feedback is rendered in the UI, the iframe's
   `src="javascript:..."` executes → `alert('xss')`.

---

## 4. Exploitation

1. Log in to Juice Shop (any account).
2. Open **Contact** — `http://localhost:3000/#/contact`.
3. In the **Comment** field, paste exactly:
   ```
   <<iframe src="javascript:alert(`xss`)">iframe src="javascript:alert(`xss`)">
   ```
4. Give any **star rating**.
5. Solve the **CAPTCHA** shown on the form.
6. Click **Submit**.

### Expected result

- The **Server-side XSS Protection** challenge is marked solved: the server
  detects that the XSS payload survived its own sanitization and was persisted.
- Viewing the page that displays customer feedback triggers the `xss` alert.

> Copy the payload verbatim — it relies on exact backticks and quotes. Changing
> a single character breaks the masking and the sanitizer will strip it.

---

## 5. Why It Works

A single cleaning pass cannot fully remove nested or malformed tags: stripping
the inner tag *creates* a new valid one that is never re-checked. The result is
then rendered as raw HTML (`[innerHTML]`), which is the dangerous sink where
the stored payload finally executes.

---

## 6. Remediation

:::tip Key takeaway
Validate and restrict untrusted input on the server side; never rely on the client or on outdated components.
:::

- **Update the library.** sanitize-html 1.4.2 is years out of date; current
  versions sanitize correctly and recursively.
- **Sanitize recursively / re-validate output.** Never trust that a single
  cleaning pass fully removes nested or malformed tags.
- **Encode on output as well as sanitizing on input.** Rendering stored content
  with `[innerHTML]` (raw HTML) is the dangerous sink; prefer safe binding or
  strict output encoding.
- **Use an allowlist** of permitted tags/attributes rather than trying to strip
  known-bad ones.

---

## 7. Impact

:::danger Why it matters
See the consequences below: this flaw can seriously affect the availability, integrity or confidentiality of the application.
:::

Stored (persisted) XSS is among the most dangerous web flaws: the payload is
saved server-side and runs in the browser of **every** user who views the
affected content — including administrators — allowing session theft, account
takeover, and actions performed as the victim. A broken sanitizer gives a false
sense of safety, which is worse than none at all.
