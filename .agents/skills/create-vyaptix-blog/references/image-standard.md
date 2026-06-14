# VyaptIX Blog Image Standard

## Core Rule

Every image must explain one nearby idea within a few seconds. Do not ask one
image to represent the entire article.

Use one cover image and usually 1-3 body images.

## Established Visual Modes

Choose the mode that best explains the section:

1. **Literal editorial scene**
   - realistic business situation
   - a clear human problem, decision, consequence, or outcome
   - useful for covers and argument-driven sections

2. **Simple process or architecture visual**
   - a small number of stages or layers
   - useful for workflows, comparisons, and operating models
   - keep labels short because image generators may misspell text

3. **Real product or team image**
   - preferred when available and accurate
   - never ask an image generator to invent a product screenshot

## ChatGPT Image Prompt Rules

The team currently uses ChatGPT image generation only. Make prompts simple and
literal.

- request `16:9 landscape, 1792 x 1024`
- describe one scene or one process
- specify the business message the viewer should understand
- use realistic professional photography or clean business infographic style
- keep important subjects centered for cropping
- avoid unnecessary decorative elements
- avoid text unless a very small number of short labels is essential
- avoid logos and fake interfaces

Avoid:

- generic robots, glowing brains, and science-fiction environments
- four or more unrelated scenes forced into one image
- complex dashboards, product screenshots, or dense architecture
- paragraphs or many labels inside generated images
- imagery used only as a visual break

## Prompt Template: Editorial Scene

```text
Create a realistic editorial image showing [one clear business situation].

The image must communicate: [one message].

Show [specific people, action, and environment]. Use realistic professional
photography, natural expressions, and restrained navy, blue, and cyan accents.

Do not include readable text, logos, robots, holograms, fake interfaces, or
science-fiction imagery.

Landscape 16:9, 1792 x 1024.
```

## Prompt Template: Simple Process

```text
Create a clean professional business infographic showing [process].

Show [3-6 stages or 3 layers] connected clearly from left to right. The image
must communicate: [one message].

Use simple icons, generous spacing, a light background, dark navy, cyan, blue,
and restrained green accents.

Use only these exact short labels: [labels].
Do not add paragraphs, extra labels, logos, robots, AI brains, or complex
technical infrastructure.

Landscape 16:9, 1792 x 1024.
```

Verify every generated label. Regenerate if any wording is incorrect.

## Placement

- Cover: summarize the central tension or promise.
- Body image: place directly after the section it explains.
- Workflow/architecture: place beside the section that introduces the process,
  not at the end of the article.
- Do not place two images consecutively without meaningful content between
  them.

## Alt Text

Describe the image's meaning and important visible content in one concise
sentence. Do not start with "Image of" or repeat the caption.

Good:

`Business professional moving from multiple disconnected tools to one organized workflow.`

Weak:

`Workflow Matters More Than Technology image.`

## Captions

Explain why the image matters to the article. A caption may state the takeaway
but should not merely repeat the alt text.

Example:

`A strong demo shows what AI can do. A strong product makes useful work easier to complete.`
