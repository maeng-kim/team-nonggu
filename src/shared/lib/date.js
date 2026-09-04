// pure date helpers shared across features/widgets — no DOM, no state

export function ymd(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
}

export function fmtTime(hhmm) {
  return hhmm ? `${hhmm.slice(0, 2)}:${hhmm.slice(2, 4)}` : '';
}

export function fmtGameDate(gameDate, weekDay) {
  return `${gameDate.slice(0, 4)}.${gameDate.slice(4, 6)}.${gameDate.slice(6, 8)} (${weekDay})`;
}
