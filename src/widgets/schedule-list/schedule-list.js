import { sortChronological } from '../../entities/schedule/schedule-model.js';
import { fmtTime, fmtGameDate } from '../../shared/lib/date.js';

// Renders the full (already filtered) season as a flat chronological list.
export function renderScheduleList(listEl, games) {
  const sorted = sortChronological(games);
  listEl.innerHTML = '';

  if (!sorted.length) {
    listEl.innerHTML = '<li>해당 조건의 경기가 없습니다.</li>';
    return;
  }

  for (const g of sorted) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="d">${fmtGameDate(g.gameDate, g.weekDay)} ${fmtTime(g.gameStart)}</span>` +
      `<span class="cat">${g.seasonCategoryName}</span>` +
      `<span>${g.tnameH} vs ${g.tnameA}</span>`;
    listEl.appendChild(li);
  }
}
