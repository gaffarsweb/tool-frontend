# tool-frontend

Public Next.js 14 (App Router) website for the OmniTools platform.

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev           # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Next ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Design tokens

`tailwind.config.ts` holds the full Stitch token set (Material 3 palette,
Geist + Inter type scale, 4/8 spacing grid). Mirror edits in
[../tool-adminui/tailwind.config.ts](../tool-adminui/tailwind.config.ts).
