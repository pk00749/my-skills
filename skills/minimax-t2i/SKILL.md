---
name: minimax-t2i
description: Use Minimax's image generation API (text-to-image) to generate images from text descriptions. Triggers when users want to create images via Minimax, generate pictures from prompts, or need text-to-image conversion using Minimax. Also use when users mention Minimax image generation, image creation, or similar requests. You handle API key setup and all API calls — the user only provides the key and description.
---

# Minimax Text-to-Image Skill

Generate images using Minimax's image-01 model via their REST API.

## API Details

- **Endpoint**: `POST https://api.minimaxi.com/v1/image_generation`
- **Auth**: Bearer token in `Authorization` header

## Required Inputs

1. `MINIMAX_API_KEY` — User provides this directly; never hardcode
2. `prompt` — Image description from user

## Default Parameters

All parameters have sensible defaults — only ask if user specifies:

| Parameter | Default | Options |
|-----------|---------|---------|
| `aspect_ratio` | `1:1` | `1:1`, `16:9`, `9:16`, `4:3`, `3:4` |
| `response_format` | `url` | `url` (returns image URL) |
| `n` | `1` | Number of images (1-3) |
| `prompt_optimizer` | `true` | Automatically optimizes prompt |

**If user mentions specific requirements in their description** (e.g., "16:9 ratio", "3张图", "竖图"), use those values. Otherwise, use defaults.

## Workflow

1. Extract API key and prompt from user's request
2. Check if user specified any optional parameters in their description
3. Build API request with appropriate values
4. Execute the API call
5. Return image URL(s) to user

## API Request Format

```bash
curl --request POST \
  --url https://api.minimaxi.com/v1/image_generation \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "image-01",
    "prompt": "<user description>",
    "aspect_ratio": "<default or user-specified>",
    "response_format": "url",
    "n": "<default or user-specified>",
    "prompt_optimizer": true
  }'
```

## Response Handling

The API returns JSON with an `images` array. Each image has a `url` field.

Example:
```json
{
  "images": [
    {"url": "https://..."},
    {"url": "https://..."}
  ]
}
```

Extract all URLs and present them clearly to the user.

## Parameter Detection from User Description

Watch for these patterns in the user's prompt:
- **数量**: "3张图", "生成n张", "多张图" → `n: 2` or `n: 3`
- **横竖**: "横图", "竖图", "16:9", "9:16" → `aspect_ratio` accordingly
- **风格**: "动漫风", "写实", "电影感" → include in prompt emphasis

If no specific parameters mentioned, use all defaults.

## Error Handling

If API returns an error, present the error message clearly with suggestions:
- `"Invalid API key"` → 检查API key是否正确
- `"Prompt too long"` → 精简描述
- Network errors → 重试或检查网络