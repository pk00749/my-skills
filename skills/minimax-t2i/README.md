# Minimax Text-to-Image Skill

利用 Minimax 文生图 API，通过文字描述生成图片。

## 功能

- 只需提供 API Key 和图片描述，即可生成图片
- 支持多种画面比例：1:1、16:9、9:16、4:3、3:4
- 支持生成多张图片（1-3张）
- 自动优化描述词（prompt_optimizer）
- 直接返回图片 URL

## 安装

将 `minimax-t2i/` 目录复制到 Claude Code 的 skills 目录：

```bash
# 找到你的 Claude Code skills 目录
# 通常位于 ~/.claude/skills/ 或项目根目录的 .claude/skills/

# 复制 skill 到 skills 目录
cp -r minimax-t2i ~/.claude/skills/
```

或在 Claude Code 中直接使用 `/skill` 命令调用。

## 使用方法

### 1. 准备 API Key

从 [Minimax 开放平台](https://www.minimaxi.com/) 获取 API Key。

### 2. 生成图片

在 Claude Code 中发送以下格式的请求：

```
用 <你的API Key> 生成一张 <图片描述>，比例为 <4:3>
```

示例：
```
用 sk-cp-xxxxx 生成一张可爱的中华田园犬照片，4:3比例
```

### 3. 参数说明

| 参数 | 默认值 | 说明 |
|------|--------|------|
| 比例 | 1:1 | 可选：1:1, 16:9, 9:16, 4:3, 3:4 |
| 数量 | 1张 | 可选：1-3张 |

### 4. 获取结果

API 返回图片 URL，可直接在浏览器中打开查看。

## 示例

**请求：**
```
用 sk-cp-xxxxx 生成一张春天森林长满花的图片，竖图
```

**返回：**
```
图片已生成！
https://hailuo-image-algeng-data.oss-cn-wulanchabu.aliyuncs.com/...
```

## 文件结构

```
minimax-t2i/
└── SKILL.md          # Skill 核心文件
```

## 注意事项

- API Key 由用户自行保管，不会被存储
- 图片 URL 有效期有限，如过期需重新生成
- 中文描述会被自动翻译优化