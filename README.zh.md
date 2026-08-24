# Relay DSH Workbench 插件

[English](README.md) | 中文

**npm 包名：** `relay-dsh-plugin-workbench`

`relay-dsh-plugin-workbench` 为官方
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）Web UI
增加一个可复用的 Workbench 壳层。其他插件可以通过它注册右侧面板和底部面板，
不需要修改 DSH 官方核心代码。

这个包本身不会增加一个明显的功能界面。普通用户通常会把它和 Files 或 Terminal
这样的功能插件一起安装。

![DSH Web 中承载 Relay Files 右侧面板的 Workbench](docs/images/dsh-workbench-files-panel.png)

截图来自官方 DSH `0.1.1-rc.2`，安装了 Workbench 和 Files。单独安装 Workbench
时，DSH 会保持默认布局，直到某个功能插件注册视图。

## 我需要这个插件吗？

你需要直接安装 Workbench 的场景主要是：

- 测试公共右侧/底部面板壳层；
- 开发另一个 DSH Workbench 视图插件；
- 希望先在某个 DSH Profile 里准备好公共 Workbench 布局，再安装本地功能插件。

使用 GitHub 开发版本的 `relay-dsh-plugin-files` 或
`relay-dsh-plugin-terminal` 时，需要手动一起安装 Workbench。DSH Profile 中的
pnpm 会阻止 GitHub 包作为传递依赖，所以开发版本安装命令会同时列出 Workbench 和
功能插件。

## 官方 DSH 快速开始

当前开发版本已验证：

- DeepSeek Harness `0.1.1-rc.2`，commit
  [`b150a551`](https://github.com/deepseek-ai/deepseek-harness/commit/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e)
- Node.js 22.13 或更新版本
- `pnpm` 已在 `PATH` 中可用

DSH 仍是开发预览版本，后续可能出现不兼容变化。

### 1. 安装

修改 Profile 插件前，请先停止正在运行的 DSH Web。

#### GitHub 开发版本

如果你想测试尚未发布的最新开发代码，可以使用 GitHub 安装：

```bash
pnpm dlx @deepseek-ai/dsh@0.1.1-rc.2 plugin --profile web add github:yangbobo2021/relay-dsh-plugin-workbench#main
```

如果希望可复现，请把 `#main` 改成具体 Tag 或完整 commit SHA。

#### npm 正式版本

可以这样安装 npm 正式包：

```bash
pnpm dlx @deepseek-ai/dsh@0.1.1-rc.2 plugin --profile web add relay-dsh-plugin-workbench@latest
```

### 2. 启动或重启 DSH Web

```bash
pnpm dlx @deepseek-ai/dsh@0.1.1-rc.2 web
```

如果你已经安装了 `dsh` 命令，也可以运行 `dsh web`。安装、更新或删除插件后都
需要重启 DSH Web。

### 3. 确认效果

单独安装 Workbench 时，DSH 会保持原有对话布局。只有其他插件注册右侧或底部视图
后，Workbench 的面板能力才会可见。普通用户想直接看到效果，可以安装 Files 或
Terminal 插件。

## 它提供什么？

- 通用右侧面板区域
- 通用底部面板区域
- 供视图插件使用的 `ctx.workbench` 注册服务
- `relay-dsh-plugin-workbench/contracts` 公共类型入口
- 幂等激活能力：多个功能插件同时带入 Workbench 时不会冲突

功能插件应通过 `ctx.workbench`、DSH keyed slots 和公开 contracts 交互，不应导入
Workbench 源码文件。

## 与 Relay 的关系

本仓库由 [Relay](https://github.com/yangbobo2021/Relay) 项目维护。Relay 探索
长时间运行的 Agent、外部事件投递、可复用 DSH Workbench 视图，以及多种对话后端。

Workbench 只负责公共面板壳层。Files、Terminal、Codex、Claude、Events 都是独立
可选插件。

## 更新、检查或删除

修改插件前先停止 DSH Web，完成后重新启动。

```bash
dsh plugin --profile web why relay-dsh-plugin-workbench
dsh plugin --profile web update relay-dsh-plugin-workbench
dsh plugin --profile web remove relay-dsh-plugin-workbench
```

如果是 GitHub 安装，`pnpm` 会在 DSH Profile 中记录来源。可以用 `why` 命令查看。

## 常见问题

### 安装 Workbench 后界面没有变化

这是预期行为。Workbench 是其他插件的宿主壳层，单独安装不会出现新的功能面板。
安装 Files 或 Terminal 后即可看到右侧或底部面板。

### 插件变更后 DSH 启动失败

先重启 DSH Web，并检查插件来源：

```bash
dsh plugin --profile web why relay-dsh-plugin-workbench
```

如果安装的是 GitHub `main`，可以尝试固定到一个已知 commit SHA。

### 安装提示缺少 pnpm

请参考官方文档安装 pnpm：<https://pnpm.io/installation>。

## 开发

```bash
git clone https://github.com/yangbobo2021/relay-dsh-plugin-workbench.git
cd relay-dsh-plugin-workbench
npm install
DSH_ROOT=/path/to/deepseek-harness npm run verify
npm pack
```

`npm run verify` 会基于官方 DSH checkout 运行类型检查、测试和生产构建。

## 反馈

问题和需求可以提交到本仓库 issue：
<https://github.com/yangbobo2021/relay-dsh-plugin-workbench/issues>
