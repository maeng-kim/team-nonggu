// Talks to KBL's public schedule endpoint. This is the only file that knows
// the API shape (URL, required headers) — everything else deals in plain
// game objects.
const API_URL = 'https://api.kbl.or.kr/match/list?fromDate=20260801&toDate=20270731&tcodeList=all';
const HEADERS = { channel: 'WEB', teamcode: 'XX' };

export async function fetchSeasonSchedule() {
  const res = await fetch(API_URL, { headers: HEADERS });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}
