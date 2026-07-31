# Acrekind

A place-aware planting planner for cold-climate gardens. Acrekind matches a garden’s hardiness zone, light, moisture and scale to a curated starting palette, then produces a planting map, bloom calendar, shareable link and PDF field note.

## Run locally

```bash
npm install
npm run dev
```

Quality checks run with `npm run check`. The production site is a static Next.js export in `out/`.

## Calculation notes

Plant suggestions are deterministic and generated from the curated dataset in `src/lib/planner.ts`. The tool is educational; local provenance, regulations and site fit must be confirmed before planting.

Built with Next.js, React, Anime.js, Motion and jsPDF.
