# VyaptIX Website - Claude Code Instructions

Read and follow `AGENTS.md` as the shared repository source of truth.

This is the current Next.js App Router website. Determine behavior from the
current checkout and do not use machine-specific memory folders or instructions
from another repository.

## Blog Creation Workflow

For requests to recommend, write, structure, review, draft, or publish a
VyaptIX blog, invoke:

```text
/create-vyaptix-blog
```

Claude Code discovers the adapter at:

```text
.claude/skills/create-vyaptix-blog/SKILL.md
```

The adapter delegates to the canonical workflow at:

```text
.agents/skills/create-vyaptix-blog/
```

Update the canonical workflow rather than duplicating its instructions.
