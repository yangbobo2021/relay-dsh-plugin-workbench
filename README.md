# Relay DSH Workbench Plugin

English | [中文](README.zh.md)

**npm package:** `@relay/dsh-plugin-workbench`

`@relay/dsh-plugin-workbench` adds a reusable Workbench shell to the official
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) Web
UI. It gives other plugins a safe place to register right-side panels and bottom
panels without modifying DSH core code.

This package does not add a visible feature by itself. Install it directly only
when you are developing or testing another Workbench view plugin. Normal users
usually install a feature plugin such as Files or Terminal; those plugins install
Workbench automatically.

## Do I Need This Plugin?

Install Workbench directly when you want to:

- test the shared side/bottom panel shell by itself;
- develop another DSH plugin that contributes a Workbench view;
- make sure a DSH Profile already has the common Workbench layout before adding
  local feature plugins.

You do not need to install it manually before installing
`@relay/dsh-plugin-files` or `@relay/dsh-plugin-terminal`. They bring Workbench
with them.

## Quick Start With Official DSH

The current development build has been validated with:

- DeepSeek Harness `0.1.1-rc.2`, commit
  [`b150a551`](https://github.com/deepseek-ai/deepseek-harness/commit/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e)
- Node.js 22.13 or newer
- `pnpm` available on `PATH`

DSH is a developer preview and may introduce compatibility-breaking changes.

### 1. Install

Stop a running DSH Web process before changing Profile plugins.

#### GitHub development build

Use this today, before the first npm release:

```bash
npx @deepseek-ai/dsh@0.1.1-rc.2 plugin --profile web add github:yangbobo2021/relay-dsh-plugin-workbench#main
```

For a reproducible install, replace `#main` with a tag or full commit SHA.

#### npm release

After `@relay/dsh-plugin-workbench` is published to npm, install it with:

```bash
npx @deepseek-ai/dsh@0.1.1-rc.2 plugin --profile web add @relay/dsh-plugin-workbench@latest
```

At the time this README was written, the npm package had not been published yet.
If the command reports `404 Not Found`, use the GitHub install above.

### 2. Start or restart DSH Web

```bash
npx @deepseek-ai/dsh@0.1.1-rc.2 web
```

If you already have a `dsh` command installed, `dsh web` is equivalent. Restart
DSH Web after installing, updating, or removing plugins.

### 3. Confirm behavior

Workbench alone keeps the normal DSH conversation layout. It only becomes visible
when another plugin registers a side or bottom view. For an end-user visible test,
install the Files or Terminal plugin instead.

## What It Provides

- A generic right-side panel region
- A generic bottom panel region
- The public `ctx.workbench` registry for view plugins
- Public contracts at `@relay/dsh-plugin-workbench/contracts`
- Idempotent activation, so multiple feature plugins can safely bring Workbench
  into the same DSH Profile

Feature plugins should use `ctx.workbench`, keyed DSH slots, and the public
contracts entry. They should not import Workbench source files.

## Plugin Boundary and Relay

This repository is maintained as part of
[Relay](https://github.com/yangbobo2021/Relay), an open-source project for
long-running agent work, external-event delivery, reusable DSH workbench views,
and multiple conversation backends.

Workbench is intentionally small. It owns only the common panel shell; Files,
Terminal, Codex, Claude, and Events remain separate optional plugins.

## Update, Inspect, or Remove

Stop DSH Web before changing plugins, then restart it afterward.

```bash
dsh plugin --profile web why @relay/dsh-plugin-workbench
dsh plugin --profile web update @relay/dsh-plugin-workbench
dsh plugin --profile web remove @relay/dsh-plugin-workbench
```

For GitHub installs, `pnpm` records the package source inside the DSH Profile.
Run `dsh plugin --profile web why @relay/dsh-plugin-workbench` to inspect it.

## Troubleshooting

### Nothing changed after installing Workbench

That is expected when Workbench is installed by itself. It is a host shell for
other plugins. Install Files or Terminal to see a new panel.

### DSH fails to start after a plugin change

Restart DSH Web and inspect the plugin source:

```bash
dsh plugin --profile web why @relay/dsh-plugin-workbench
```

If the package came from GitHub `main`, try pinning a known commit SHA.

### Installation says pnpm is missing

Install pnpm using the official guide: <https://pnpm.io/installation>.

## Development

```bash
git clone https://github.com/yangbobo2021/relay-dsh-plugin-workbench.git
cd relay-dsh-plugin-workbench
npm install
DSH_ROOT=/path/to/deepseek-harness npm run verify
npm pack
```

`npm run verify` runs type checking, tests, and the production build against an
official DSH checkout.

## Feedback

Report bugs and feature requests in this repository's issue tracker:
<https://github.com/yangbobo2021/relay-dsh-plugin-workbench/issues>
