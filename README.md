# SDET Automation Portfolio

Playwright + TypeScript test automation framework, built progressively
as I learn. Target app: [SauceDemo](https://www.saucedemo.com).

## Status
- [x] Project setup and config
- [x] Page Object Model
- [x] Custom fixtures
- [x] Data-driven tests
- [x] Environment config (.env)
- [ ] API tests
- [x] HTML reports and trace viewer
- [x] CI on every push (GitHub Actions)
- [x] storageState auth reuse

## Run locally
- npm install
- npx playwright install
- npx playwright test
- BASE_URL=https://your-env.example.com npx playwright test

## Design decisions
- Used storageState so that I can remove repeated UI logins and isolate login failures to one setup step as well.
- Page objects are provided as fixtures, so a test asks for inventoryPage the same way it asks for page, with no setup code of its own. If how a page object is created ever changes, it’s fixed in one place (fixtures/test.ts) instead of in every test.
- The full suite runs in chromium ( the most used engine ); the @smoke tests ( login, invalid login, cart) also run in Firefox and Webkit. This cut CI test runs from 25 to 15 which cut CI run time from 23.6s to 18s while still
checking the critical paths in every engine. Trade-off: a browser-specific bug in a non-smoke feature could slip through; if one is found, that test gets promoted to @smoke.
- Tests use relative paths, and a single baseURL lives in playwright.config.ts. The BASE_URL environment variable overrides it, so CI can point the same suite at staging or production without code changes; if the address is wrong, the login setup fails first and nothing else runs.