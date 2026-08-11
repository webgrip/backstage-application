# Backstage Application

WebGrip's [Backstage](https://backstage.io) portal — the app image behind
`backstage.webgrip.dev`, deployed by
[homelab-cluster](https://docs.webgrip.dev/) (`kubernetes/apps/backstage/`).

## What lives here

- **[ADRs](adr/0001-using-backstage.md)** — decisions about the portal itself.
- **Structurizr** (`docs/structurizr/`) — C4 architecture workspace
  (`workspace.dsl`); not rendered on this site, open it with Structurizr Lite.
- **`app-config.k8s.yaml`** — the Kubernetes overlay enabling TechDocs'
  external builder against the homelab Garage bucket (homelab ADR-0039).

## Related

- Platform docs estate: [docs.webgrip.dev](https://docs.webgrip.dev/) —
  serving model, TechDocs pipeline, and this repo's place in it
  (homelab ADR-0052, plan-docs-estate-rollout).
