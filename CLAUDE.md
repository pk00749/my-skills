# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概述

这是自定义 Claude Code Skills 的开发目录。Skills 通过 `/skill-name` 命令调用。

## Minimax 文生图 Skill

位置: `minimax-t2i/`

**API 端点**: `POST https://api.minimax.io/v1/text_to_image`

**认证**: `Authorization: Bearer <API_KEY>`

**请求体**:
```json
{
  "model": "image-01",
  "prompt": "<用户描述>",
  "response_format": "url",
  "prompt_optimizer": true
}
```

**可选参数**: `aspect_ratio`, `width`, `height`, `style`

## Skill 文件结构

每个 skill 放置在独立目录中，包含:
- `skill.md` — Skill 定义和使用说明
- 实现代码（根据复杂度可使用脚本或直接集成）

## 本地配置

在 `.claude/settings.local.json` 中配置 permissions:
```json
{
  "permissions": {
    "allow": [
      "WebFetch(domain:platform.minimaxi.com)",
      "Bash(curl -s \"https://api.minimax.io/...\")"
    ]
  }
}
```

## 常用命令

```bash
git status
git remote -v
```
