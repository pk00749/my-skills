# Minimax Image Generation API Reference

## Endpoint

```
POST https://api.minimax.io/v1/text_to_image
```

## Authentication

```
Authorization: Bearer <API_KEY>
```

Get API key from https://platform.minimaxi.com

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| model | string | Yes | Model name, e.g., `image-01` |
| prompt | string | Yes | Image description text |
| response_format | string | Yes | Set to `url` |
| prompt_optimizer | boolean | No | Enable prompt optimization, default `true` |
| aspect_ratio | string | No | Image ratio: `1:1`, `16:9`, `9:16`, `4:3`, `3:4` |
| width | integer | No | Image width (when model supports) |
| height | integer | No | Image height (when model supports) |
| style | string | No | Style preset (varies by model) |

## Response

```json
{
  "data": [{
    "url": "https://..."
  }],
  "request_id": "..."
}
```

## Error Codes

- 400: Invalid parameters
- 401: Invalid API key
- 429: Rate limit exceeded
- 500: Server error
