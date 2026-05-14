---
'space-dashboard': minor
---

Comprehensive dependency upgrade covering 30+ packages.

- React 18 → 19, Vite 6 → 8, TypeScript 5.9 → 6
- Sentry SDK to v10 (browser + Vite plugin), recharts to v3, react-toastify to v11
- ESLint stack to v10 (lint, react-hooks, react-refresh, sonarjs, globals); dropped two unused devDeps
- Build times noticeably faster thanks to Vite 8's Rolldown/Oxc internals (~5× quicker on this repo)
- Closed several known security advisories: Vite arbitrary file read (HIGH), axios SSRF and cloud-metadata exfiltration, Babel RegExp DoS
- All dependency versions now pinned exactly (no caret ranges) to prevent silent drift; dependabot cadence tightened to monthly with cooldowns on minor/patch
- Fixed a duplicate "new panels added" toast in dev (StrictMode double-invocation of useState initializer)
- Deliberate carve-outs: `react-tooltip` stays on v5 due to v6 multi-anchor tooltip regressions; `@types/node` tracks the Node 22 runtime
