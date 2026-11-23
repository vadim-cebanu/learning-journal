# Juice Shop Master

This project documents a set of security challenges solved in the **OWASP Juice Shop**, a deliberately insecure web application used for security training. For each challenge it explains the vulnerability, how it was exploited, the risks it poses, and how it should be fixed.

> Target application: [**OWASP Juice Shop**](https://github.com/juice-shop/juice-shop) (open source)

:::caution Educational purposes only
All attacks were carried out on a local, personal OWASP Juice Shop instance, using no real personal data. Never test these techniques on systems you do not own or have explicit permission to test.
:::

## Prerequisites

- **Node.js ≥ 20** and **npm**
- A modern browser with DevTools
- (Optional) **Burp Suite** for intercepting requests

## Quickstart

1. Clone & start the official OWASP Juice Shop:
   ```bash
   git clone https://github.com/juice-shop/juice-shop
   cd juice-shop
   npm install
   npm start
   ```
2. Open the application at `http://localhost:3000`.
3. Open the folder of each challenge below for the full write-up.

## Tools

- OWASP Juice Shop (run locally)
- Browser DevTools (Console / Network)
- Burp Suite (request interception)
- Python 3 (crafting payloads — malicious ZIP, XML, YAML)

## Challenges

| # | Challenge | Category | Difficulty | Documentation | Video |
|---|-----------|----------|------------|---------------|---------|
| 1 | Arbitrary File Write | Vulnerable Components (Zip Slip) | ★★★★ | [Read](./challenge-1-arbitrary-file-write/README.md) | [Loom](https://www.loom.com/share/063c85fb6c1540f6a577264bdb93f4b2) |
| 2 | XXE DoS | XXE (XML External Entities) | ★★★★★ | [Read](./challenge-2-xxe-dos/README.md) | [Loom](https://www.loom.com/share/8af69a7afaa340f79e68b3cfafea2ece) |
| 3 | Memory Bomb | Insecure Deserialization | ★★★★ | [Read](./challenge-3-memory-bomb/README.md) | [Loom](https://www.loom.com/share/e272963d3fdd4440bab5c2a927459de7) |
| 4 | Server-side XSS Protection | XSS | ★★★★ | [Read](./challenge-4-server-side-xss-protection/README.md) | [Loom](https://www.loom.com/share/a5a6d2b447434e4096e266e9457c5bd8) |

:::info
Challenges 1–3 all abuse the same *File Complaint* upload endpoint, each through a different file type (ZIP, XML, YAML) — a good illustration of how one weak endpoint enables very different attacks.
:::

## Challenge Write-up Structure

Every challenge follows the same layout:

1. **Summary**
2. **Root Cause**
3. **Proof of Concept** (payload, preparation, flow — varies per challenge)
4. **Exploitation**
5. **Why It Works**
6. **Remediation**
7. **Impact**

## Documentation Structure

```
juice-shop-master/
├── README.md
├── _category_.yaml
├── challenge-1-arbitrary-file-write/
│   └── README.md
├── challenge-2-xxe-dos/
│   └── README.md
├── challenge-3-memory-bomb/
│   └── README.md
├── challenge-4-server-side-xss-protection/
    └── README.md

```

## References

- OWASP Juice Shop (source): https://github.com/juice-shop/juice-shop
- Pwning OWASP Juice Shop (companion guide): https://pwning.owasp-juice.shop
- OWASP Top 10: https://owasp.org/www-project-top-ten/

---

