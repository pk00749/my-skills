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

技能会被安装到 `~/.claude/skills/` 目录下。

**安装到项目本地目录：**
```bash
npx skills install <skill-name> --local
```

安装到 `./.claude/skills/` 目录下，方便项目内共享。

## 从 GitHub 安装

**方式一：直接执行 bin**
```bash
npx git+https://github.com/yourname/my-skills.git skills install minimax-t2i
```

**方式二：先 clone 再本地执行**
```bash
git clone https://github.com/yourname/my-skills.git
cd my-skills
npm install
npx skills install minimax-t2i
```

## 可用技能

| 技能 | 描述 |
|------|------|
| minimax-t2i | 使用 Minimax 的图像生成 API (text-to-image)，通过文本描述生成图片 |
