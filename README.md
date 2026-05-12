# Claude Skills

Claude Code 的技能包管理工具。

## 安装

```bash
npm install
```

## 使用方法

### 列出可用技能

```bash
npx skills list
```

输出示例：
```
Available skills:

  - minimax-t2i          Use Minimax's image generation API...
```

### 安装技能

```bash
npx skills install <skill-name>
```

例如安装 minimax-t2i：
```bash
npx skills install minimax-t2i
```

技能会被安装到 `~/.claude/skills/` 目录下。

## 可用技能

| 技能 | 描述 |
|------|------|
| minimax-t2i | 使用 Minimax 的图像生成 API (text-to-image)，通过文本描述生成图片 |
