# Insecure App for Cyber Security Base 2021

## Installation

- Install [nodejs](https://nodejs.org) (tested with version 16)
- Run `cd insecure-app` and `npm i`
- Copy `.env.example` as `.env`
- Run `npm run initdb` to create the database and to populate it
- **Development**
  - Run `npm run dev`
- **Production**
  - Run `npm run build` and `npm start`

### How to reset database

- `cd insecure-app`
- Delete `prisma/dev.db`
- Run `npm run initdb`

### Default users (username:password)

- akiha:vermillion
- arcueid:redblood

## Flaws

Based on [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

- [FLAW1] [A01:2021 – Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
  - Notes can be deleted and viewed by anyone just by iterating IDs.
  - **Fix** in [insecure-app/pages/api/note.ts](insecure-app/pages/api/note.ts) by uncommenting marked lines (11 and downwards)
- [FLAW2] [A02:2021 – Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/) and [A07:2021 – Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)
  - Passwords are stored in plain text.
  - **Fix** by encrypting and salting passwords.
- [FLAW3] [A06:2021 – Vulnerable and Outdated Components](https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/)
  - An outdated dependency: iron-session. Latest version at the time of writing is 6.0.4 but the app uses 6.0.1.
  - **Fix** in package.json:
    - Automatic minor updates `"iron-session": "6.0.1",` -> `"iron-session": "^6.0.1",`
    - Automatic patch updates `"iron-session": "6.0.1",` -> `"iron-session": "~6.0.1",`
    - Manual update `"iron-session": "6.0.1",` -> `"iron-session": "6.0.4",`
- [FLAW4] [A03:2021 – Injection](https://owasp.org/Top10/A03_2021-Injection/)
  - Note data is not validated or sanitized by the application.
  - **Fix** in [insecure-app/pages/api/note.ts](insecure-app/pages/api/note.ts) by uncommenting marked lines (40 and downwards)
- [FLAW5] [A05:2021 – Security Misconfiguration](https://owasp.org/Top10/A05_2021-Security_Misconfiguration/)
  - The security settings in the iron-session are not set to secure values.
  - **Fix** in [insecure-app/lib/session.ts](insecure-app/lib/session.ts) by setting the secure prop in cookieOptions to `process.env.NODE_ENV === 'production'`.
