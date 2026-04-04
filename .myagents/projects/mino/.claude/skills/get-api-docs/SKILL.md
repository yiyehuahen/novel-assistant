---
name: get-api-docs
description: Use Context Hub (chub) CLI to fetch API documentation. Allows the agent to search, retrieve, and annotate API docs in different programming languages.
metadata:
  triggers:
    - "需要查 API 文档"
    - "怎么调用 XX API"
    - "chub"
    - "context-hub"
---

# Get API Docs - Context Hub

Use `chub` CLI to fetch API documentation when the agent needs to know how to call an API correctly.

## When to Use

Use this skill when:
- Writing code that calls an external API (OpenAI, Stripe, etc.)
- Unsure about API parameters or response format
- Need language-specific examples (Python, JavaScript, etc.)

## Commands

### Search for API docs
```bash
chub search "openai"
chub search "stripe payments"
```

### Get specific API docs
```bash
chub get openai/chat --lang py      # Python
chub get openai/chat --lang js      # JavaScript
chub get stripe/api --lang js       # Stripe JavaScript
```

### Make notes (persist across sessions)
```bash
chub annotate openai/chat "需要 raw response 处理"
```

### List your annotations
```bash
chub annotate --list
```

## Example Workflow

1. User asks: "帮我用 Python 调用 OpenAI 的 chat API"
2. Run: `chub get openai/chat --lang py`
3. Read the returned docs
4. Write correct code

## Notes

- Docs are versioned and language-specific
- Annotations persist across sessions
- Feedback helps improve docs for everyone