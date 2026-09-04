# team-nonggu
For my team nonggu 🏀

## KBL 2026-2027 Schedule Calendar

Open `index.html` with a static server (it's an ES module, so opening `file://` directly won't work due to browser CORS restrictions):

```
npx serve .
```

No build step, no dependencies. The browser calls the official KBL API (`api.kbl.or.kr/match/list`) directly to fetch the latest schedule every time.

The structure applies Feature-Sliced Design in a light form:

```
src/
├── app/            bootstrap (main.js) — wires everything together
├── widgets/         composite blocks that make up the screen (calendar-view, game-popup)
├── features/        units of user interaction (team-filter, month-navigation)
├── entities/schedule/  domain logic — API calls, team codes, filtering/sorting/grouping
└── shared/          general-purpose utils/styles (date.js, app.css)
```

- Server/auth/session/deployment-related skills (redis-grant-session, capability-token-hmac, ssh, container-registry, deployment, etc.) don't apply here — this app has no backend, no login, and no state to persist.
