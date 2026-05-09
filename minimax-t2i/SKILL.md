---
name: minimax-t2i
description: "Generate images using Minimax text-to-image API. Use when user wants to create images from text descriptions via Minimax API. Triggers: user provides Minimax API key and image description, or asks to generate/create/make an image."
---

# Minimax Text-to-Image

Generate images from text descriptions using Minimax's `image-01` model.

## Quick Start

**Required inputs:**
1. Minimax API key (from https://platform.minimaxi.com)
2. Text description of the desired image

**API endpoint:** `POST https://api.minimax.io/v1/text_to_image`

**Headers:**
```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

**Request body:**
```json
{
  "model": "image-01",
  "prompt": "<user description>",
  "response_format": "url",
  "prompt_optimizer": true
}
```

**Optional parameters:** `aspect_ratio`, `width`, `height`, `style`

## Workflow

1. Collect API key and image description from user
2. Call the API with the user's prompt
3. Return the generated image URL from the response

## Response

The API returns a JSON with image URL:
```json
{
  "data": [{
    "url": "https://..."
  }]
}
```

Return the URL to the user so they can view or download the image.

## Notes

- `prompt_optimizer: true` improves prompt quality for better results
- Aspect ratio options: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`
- Style options vary by model; `image-01` supports multiple styles
