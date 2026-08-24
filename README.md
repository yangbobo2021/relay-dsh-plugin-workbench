# Relay DSH Workbench Plugin

`@relay/dsh-plugin-workbench` replaces the official DSH root layout through a
bundle patch and republishes the official sidebar, conversation, details, and
overlay seats. It adds generic keyed `side` and `bottom` view regions plus the
versioned `ctx.workbench` registry.

Use this plugin when you want DSH to host independently installed right-side or
bottom-panel views. The package contains no built-in feature view.

Install from npm:

```bash
dsh plugin --profile web add @relay/dsh-plugin-workbench @relay/dsh-plugin-files
```

Install the current GitHub development version:

```bash
dsh plugin --profile web add github:yangbobo2021/relay-dsh-plugin-workbench
```

Feature plugins should communicate with Workbench through `ctx.workbench`, keyed
DSH slots, and the public `@relay/dsh-plugin-workbench/contracts` type entry.
They should not import Workbench source files.

This repository is maintained as part of the broader Relay project. Relay explores
event-driven Agent workflows and DSH-compatible plugins, while this package stays
focused on the reusable Workbench shell.

When DSH exposes equivalent generic panel slots upstream, this plugin can stop
replacing `ui-layout` without changing feature view contracts.
