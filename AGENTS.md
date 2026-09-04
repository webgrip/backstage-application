# invoiceninja-application AI directives

This repository contains the code and infrastructure for the invoiceninja-application service. The following directives outline the key practices and standards for working with this codebase.

## Conventions

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- Use [Semantic Versioning](https://semver.org/) for versioning releases.
- Document all architectural decisions in ADRs.
- Maintain a high level of test coverage (aim for ≥90%).
- Test behavior, not implementation.
- Make atomic commits. Intent matters—each commit should represent a single logical change.
- **Comments are NOT allowed.** Always communicate intent with code: a precise name, a type, a
  smaller function, a test that states the case. A comment is a failure. This holds for every
  language in the repo, prose in YAML and TOML included. Machine-read directives stay, because the
  toolchain acts on them as syntax: `// @ts-check`, `eslint-disable`, `<!-- prettier-ignore -->`,
  `# syntax=`, `# renovate:`, `# yaml-language-server:`, and shebangs. Doc-comment forms the
  toolchain itself reads are not comments either and stay: godoc directly above an exported
  identifier, rustdoc `///` and `//!`, and PHPDoc blocks carrying type tags. Anything that outlives
  a single expression belongs in `docs/` or an ADR, where it gets reviewed, linked and kept
  current. The estate decision is
  [ADR 0006](https://forgejo.webgrip.dev/webgrip/workflows/src/branch/main/docs/adrs/0006-no-comments-in-code.md).

## Major thought influences

| Thinker              | Core Idea We Adopt                      |
| -------------------- | --------------------------------------- |
| **Kent Beck**        | Test‑Driven Development, Small Releases |
| **Robert C. Martin** | Clean Code & SOLID                      |
| **Sam Newman**       | Micro‑services, Continuous Delivery     |
| **Eric Evans**       | Domain‑Driven Design                    |

These thinkers influence our approach to software development, take their philosophies to heart, and apply them in our work.

## Repository Structure

- `docs/adrs`: Architectural Decision Records
- `docs/techdocs`: Custom mkdocs documentation, based on Spotify's techdocs
- `ops/docker`: Dockerfiles for different parts of the application live here
- `ops/helm`: Helm chart for deploying the application
- `ops/secrets`: Helm chart to deploy encrypted secrets for the application to use
- `src/`: This is where the main application code, or the main subject of the repository, resides
- `tests/unit`: Unit tests for the application (Test isolated units/classes/components/functions)
- `tests/integration`: Integration tests for the application (Test the integration of several components)
- `tests/functional`: Whereas integration tests test the integration of several components, functional tests focus on the functionality of the application as a whole. (Sending requests and asserting responses)
- `tests/contract`: Contract tests for the application (Test the functionality against the contract)
- `tests/e2e`: Use a simulated browser environment to interact with the application (Playwright)
- `tests/smoke`: Tests that verify the basic functionality of the application (eg. health checks, basic API endpoint checks, **negation** is important too. When we expect something not to happen, we need to test that as well, such as a HTTP 2XX on a request that should fail like admin endpoints.)
- `tests/manual`: Manual tests for the application. (eg. .http files, Postman collections, OpenAPI specifications)
- `tests/performance`: Performance tests for the application (JMeter, k6)
- `tests/behavioral`: BDD tests for the application (Cucumber, SpecFlow)

## Detailed information about uncommon patterns in this repository

### Secrets & Encryption

- Encrypted secrets are managed with age/sops. Plaintext secrets live under `ops/secrets/*/values.dec.yaml` and are encrypted with `make encrypt-secrets` (see `README.md`).
