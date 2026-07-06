# Space Explorer

A Vue 3 + TypeScript portfolio project that explores NASA's public APIs, wrapped in an animated space-themed UI (starfield, orbiting planets, a close-approach radar). Visual design implemented from a Claude Design handoff.

## Features

- **Home** — a live status strip (today's APOD date, NEO count, rovers online), a hero with a live APOD preview card, and a "Seven ways in" bento grid linking every module.
- **Astronomy Picture of the Day** — browse NASA's daily photo/video archive back to 1995, with a date picker, previous/next day navigation, and a "surprise me" random date.
- **Solar System** — an animated orbit diagram of the eight planets (CSS-animated, spaced for legibility rather than to scale). Clicking a planet shows its facts and a real photo fetched live from the NASA Image and Video Library.
- **Mars Rover Photos** — filterable gallery (rover, camera, Earth date) of real rover imagery, with a lightbox viewer. See [CLAUDE.md](CLAUDE.md) for a known issue with this endpoint.
- **Near-Earth Objects** — a radar-style visualization plus a sortable list of asteroids making a close approach on a chosen date, flagging potentially hazardous ones.
- **Earth from Space (EPIC)** — full-disk daily photos of Earth from the DSCOVR satellite, browsable by date with a lightbox viewer.
- **Space Weather (DONKI)** — a filterable timeline of solar flares, coronal mass ejections and geomagnetic storms from the last 30 days.
- **Natural Events (EONET)** — currently active wildfires, storms, volcanoes and other events, shown on a hand-drawn world map and list.
- Canvas-based starfield background (twinkling stars, parallax on pointer + scroll, shooting stars), used app-wide.
- English/Spanish language toggle in the header (English by default), covering all UI chrome. NASA's APIs have no translation support, so APOD text, rover camera names, and asteroid/event designations always stay in English — see [CLAUDE.md](CLAUDE.md).

## Stack

Vue 3 (Composition API, `<script setup>`) + TypeScript + Tailwind CSS v4 + Vue Router + Pinia + Axios, organized as **Clean Architecture + feature-first**: each feature under `src/features/<name>/` has its own `domain/` (entities, repository interfaces, use cases), `infrastructure/` (concrete API clients implementing those interfaces), and `presentation/` (composables, components, views) layers. See [CLAUDE.md](CLAUDE.md) for the full architectural rationale.

Data comes from [NASA Open APIs](https://api.nasa.gov) (APOD, Mars Rover Photos, NeoWs, EPIC, DONKI), the [NASA Image and Video Library](https://images.nasa.gov), and [EONET](https://eonet.gsfc.nasa.gov).

## Getting started

```bash
npm install
cp .env.example .env   # then set VITE_NASA_API_KEY to your own key from https://api.nasa.gov
npm run dev
```

A NASA API key is free and instant to obtain. `DEMO_KEY` also works but is rate-limited to ~30 requests/hour.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`vue-tsc -b`) then build for production
- `npm run preview` — serve the production build locally

## Project structure

```
src/
  app entry: main.ts, App.vue
  router/              # route table, one route per feature view
  pages/                # HomeView (landing page linking to each feature)
  shared/
    config/             # env var access
    lib/                 # axios instances (NASA API, NASA Image Library, EONET), date helpers
    ui/                  # StarField, GlassCard, LoadingOrbit, ErrorState
    layout/              # AppHeader (nav + mobile menu + language toggle)
  features/
    apod/                 # domain / infrastructure / presentation
    solar-system/
    mars-rover/
    neo/
    epic/
    donki/
    eonet/
```

See [CLAUDE.md](CLAUDE.md) for a deeper architectural walkthrough and known API caveats.
