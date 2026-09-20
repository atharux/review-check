# Review Check

An open-source starter for the engine behind a pre-submission App Store
audit tool: screenshots get typed by keyword, a handful of yes/no context
questions gate which rules apply, and every finding is ranked by severity
— honestly, so an unanswered question down-weights a finding instead of
hiding it.

**This is not the production rule set.** It ships with 6 illustrative,
widely-known rejection reasons, written fresh for this demo. The paid
audit at [appreview.atharux.com](https://appreview.atharux.com) runs
against 27+ rules built from real client rejections, each carrying its own
`verified` / `stale` field so nothing stale reaches a client report. This
repo exists to show the mechanism is real — the value in the paid product
is the curated rule library, not the engine.

## What it does

1. Answer a few yes/no questions about the app (accounts, purchases, web
   wrapping, permissions).
2. Eight example screenshot filenames get typed automatically by keyword
   — no real screenshots are uploaded, this is a fixed demo set.
3. Findings rank by severity (`blocker` > `likely` > `watch`). A finding
   whose gating question was never answered stays visible, at 0.6x weight,
   with an explicit note saying why — never silently dropped.
4. Expand **Under the hood** for the actual keyword table and scoring
   formula. Nothing here is a black box.

## Why it's built this way

The interesting design problem in a pre-submission audit tool isn't the
rule content — it's how to be honest about confidence. A tool that
silently hides a finding because a question went unanswered is worse than
one that shows it, clearly marked, at reduced weight. That's the pattern
this demo is actually about.

## Stack

React 19 + TypeScript + Vite, no backend. Design tokens are shared with
the [App Review](https://appreview.atharux.com) landing page — same
lightMuseum palette (warm paper, DM Mono + Space Grotesk), so this reads
as part of the same product family rather than an unrelated tool.

## Development

```bash
npm install
npm run dev            # app at localhost:5173
npm run build           # type-check + production build
npm run storybook       # component stories at localhost:6006
npm run build-storybook
npm run deploy           # build + wrangler pages deploy
```

Component stories live next to their components (`src/components/*.stories.tsx`):
`ContextRow`, `ScreenChip`, `FindingCard`.

## Scope

Guideline references point at the public App Store Review Guidelines and
Human Interface Guidelines; all wording here is original, not quoted from
Apple's text. This is an interaction-design prototype, not an official
Apple tool, and passing every check here is not a guarantee of App Store
approval.
