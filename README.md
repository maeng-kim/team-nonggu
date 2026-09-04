# team-nonggu
For my team nonggu 🏀

## KBL 2026-2027 일정 캘린더

`index.html`을 정적 서버로 열면 됩니다 (ES 모듈이라 `file://` 직접 열기는 브라우저 CORS 제약으로 안 됩니다):

```
npx serve .
```

빌드 스텝/의존성 없음. 브라우저에서 KBL 공식 API(`api.kbl.or.kr/match/list`)를 직접 호출해 매번 최신 일정을 받아온다.

구조는 Feature-Sliced Design을 얇게 적용:

```
src/
├── app/            부트스트랩 (main.js) — 모든 걸 조립
├── widgets/         화면을 구성하는 복합 블록 (calendar-view, schedule-list)
├── features/        사용자 상호작용 단위 (team-filter, view-toggle, month-navigation)
├── entities/schedule/  도메인 로직 — API 호출, 팀 코드, 필터/정렬/그룹핑
└── shared/          범용 유틸/스타일 (date.js, app.css)
```

- 서버/인증/세션/배포 관련 스킬(redis-grant-session, capability-token-hmac, ssh, container-registry, deployment 등)은 적용하지 않음 — 이 앱엔 백엔드도, 로그인도, 저장할 상태도 없다.

