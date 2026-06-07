# VyaptIX Website - Gemini CLI Project Instructions

Import the shared repository instructions:

@./AGENTS.md

## Blog Creation Workflow

Gemini CLI discovers the canonical `create-vyaptix-blog` skill directly from:

```text
.agents/skills/create-vyaptix-blog/
```

For requests to recommend, write, structure, review, draft, or publish a
VyaptIX blog, activate and follow that skill.

Use `/skills list` to confirm discovery and `/skills reload` after skill changes.
Do not create a separate `.gemini/skills` copy of this workflow.
