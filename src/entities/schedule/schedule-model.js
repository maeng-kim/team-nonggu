export function filterByTeam(games, teamCode) {
  if (teamCode === 'all') return games;
  return games.filter((g) => g.tcodeH === teamCode || g.tcodeA === teamCode);
}

export function groupByDate(games) {
  const map = new Map();
  for (const g of games) {
    if (!map.has(g.gameDate)) map.set(g.gameDate, []);
    map.get(g.gameDate).push(g);
  }
  for (const list of map.values()) list.sort((a, b) => a.gameStart.localeCompare(b.gameStart));
  return map;
}

export function sortChronological(games) {
  return games.slice().sort((a, b) => (a.gameDate + a.gameStart).localeCompare(b.gameDate + b.gameStart));
}
