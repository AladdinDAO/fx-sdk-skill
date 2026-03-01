# FX SDK Skill

Agent skill for integrating the **FX Protocol TypeScript SDK** (`@aladdindao/fx-sdk`) with AI coding assistants. Use it to query positions, build transaction plans (increase/reduce/adjust leverage, deposit/mint, repay/withdraw), and generate runnable agent-ready code on Ethereum mainnet.

## Install

**Cursor**  
Copy this repo into project or personal skills:

```bash
# Project scope — skill only in this repo
git clone https://github.com/AladdinDAO/fx-sdk-skill.git .cursor/skills/fx-sdk-skill

# Personal scope — skill in all your projects
git clone https://github.com/AladdinDAO/fx-sdk-skill.git ~/.cursor/skills/fx-sdk-skill
```

**Claude Code**  
```bash
# Project
git clone https://github.com/AladdinDAO/fx-sdk-skill.git .claude/skills/fx-sdk-skill

# Personal
git clone https://github.com/AladdinDAO/fx-sdk-skill.git ~/.claude/skills/fx-sdk-skill
```

**Codex CLI**  
```bash
git clone https://github.com/AladdinDAO/fx-sdk-skill.git ~/.codex/skills/fx-sdk-skill
```

The assistant will load `SKILL.md` from the skill directory when the context matches (e.g. “integrate fx-sdk”, “FX position”, “depositAndMint”).

## When to Use

- Integrate `@aladdindao/fx-sdk` into an agent or tool.
- Generate transaction execution code for increase/reduce/adjust/deposit/repay.
- Debug SDK parameters or validate FX trading workflows.
- Build adapter functions with typed input, dry-run, and nonce-ordered execution.

## Repo Structure

| Path | Purpose |
|------|--------|
| `SKILL.md` | Main skill instructions (required). |
| `references/sdk-playbook.md` | Request shapes and test checklist. |
| `references/agent-adapter-example.ts` | Example adapter and usage. |
| `agents/openai.yaml` | Chip/config for agent UIs. |

## Requirements

- Node.js with `@aladdindao/fx-sdk`.
- Ethereum mainnet (or configured RPC); use `FxSdk({ rpcUrl, chainId: 1 })` when a custom RPC is provided.

## License

MIT
