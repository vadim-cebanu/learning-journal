# Juice Shop Master

This project documents a set of security challenges solved in the **OWASP Juice Shop**, a deliberately insecure web application used for security training. For each selected challenge it explains the vulnerability, how it was exploited, the risks it poses, and how it should be fixed. All work was performed locally against a personal Juice Shop instance.

> **Disclaimer:** The entire content of this documentation is for **educational purposes only**. All attacks were carried out on a local, personal OWASP Juice Shop instance, using no real personal data.

## Table of Contents

- [Quickstart](#quickstart)
- [Challenges](#challenges)
  - [Login Admin (SQL Injection)](#login-admin-sql-injection)
  - [DOM XSS](#dom-xss)
- [Documentation Structure](#documentation-structure)

## Quickstart

1. Start your local OWASP Juice Shop:
   ```bash
   cd juice-shop
   npm start
   ```
2. Open the application at `http://localhost:3000`.
3. Open the folder of each challenge below for the full write-up and its video link.

## Challenges

> The submission covers challenges from **different categories** (not all from the same area).

| Challenge | Category | Documentation | Video |
|-----------|----------|---------------|-------|
| Login Admin (SQL Injection) | Injection | [Read](./challenge-1-login-admin/README.md) | [▶️ Loom](https://www.loom.com/share/69d729838c7548a5b23fa5d5cdb462a3) |
| DOM XSS | Cross-Site Scripting (XSS) | [Read](./challenge-2-dom-xss/README.md) | _add link_ |

### Login Admin (SQL Injection)

**Category:** Injection (OWASP Top 10 — A03:2021)

The login form builds its SQL query directly from user input. By injecting a crafted
value into the email field, the password check is bypassed and the attacker logs in as
the administrator without any valid password.

**Why it is dangerous:** SQL Injection is one of the most severe web vulnerabilities. An
attacker can bypass authentication and take over any account (including the admin), and
can read, modify or delete arbitrary data in the database — for example dumping every
user's credentials. Because it reaches the database directly, a single injectable field
can expose the entire data of the application.

➡️ Full write-up: [challenge-1-login-admin](./challenge-1-login-admin/README.md)

### DOM XSS

**Category:** Cross-Site Scripting (XSS) (OWASP Top 10 — A03:2021)

The search field inserts the user's input into the page as raw HTML, because the
application disables Angular's built-in sanitization. An HTML/JavaScript payload typed
into the search box is therefore executed in the browser (a DOM-based XSS).

**Why it is dangerous:** With XSS an attacker can run arbitrary JavaScript in the victim's
browser — stealing session cookies and impersonating the user, performing actions in their
name, or redirecting them to a malicious page. Because the code runs with the victim's
identity, a single injectable output can fully compromise their session.

➡️ Full write-up: [challenge-2-dom-xss](./challenge-2-dom-xss/README.md)

## Documentation Structure

```
juice-shop-master/
├── README.md                     # this file: description, ToC, quickstart, challenge overview
├── _category_.yaml               # Docusaurus sidebar config for this project
├── challenge-1-login-admin/
│   ├── README.md                 # full challenge documentation
│   ├── _category_.yaml
│   └── images/                   # screenshots (fix.png, fix1.png … fix4.png)
└── challenge-2-dom-xss/
    ├── README.md                 # full challenge documentation
    ├── _category_.yaml
    └── images/                   # screenshots (fix.png, fix1.png … fix4.png)
```