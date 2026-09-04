import { groupByDate } from '../../entities/schedule/schedule-model.js';
import { shortTeamName } from '../../entities/schedule/teams.js';
import { ymd, fmtTime } from '../../shared/lib/date.js';

// Renders one month's grid into bodyEl/labelEl for the given (already filtered) games.
export function renderCalendarView({ bodyEl, labelEl }, games, cursor) {
  const byDate = groupByDate(games);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  labelEl.textContent = `${year}년 ${month + 1}월`;

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = ymd(new Date());

  bodyEl.innerHTML = '';
  let row = document.createElement('tr');

  for (let i = 0; i < firstDow; i++) {
    row.appendChild(makeCell(new Date(year, month, 1 - (firstDow - i)), byDate, today, true));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    row.appendChild(makeCell(new Date(year, month, day), byDate, today, false));
    if (row.children.length === 7) {
      bodyEl.appendChild(row);
      row = document.createElement('tr');
    }
  }
  let next = 1;
  while (row.children.length > 0 && row.children.length < 7) {
    row.appendChild(makeCell(new Date(year, month + 1, next++), byDate, today, true));
  }
  if (row.children.length) bodyEl.appendChild(row);
}

function makeCell(date, byDate, today, isOtherMonth) {
  const td = document.createElement('td');
  if (isOtherMonth) td.className = 'othermonth';
  const key = ymd(date);
  if (key === today) td.classList.add('today');

  const num = document.createElement('div');
  num.className = 'daynum';
  num.textContent = date.getDate();
  td.appendChild(num);

  for (const g of byDate.get(key) || []) {
    const chip = document.createElement('div');
    chip.className = 'game';
    chip.title = `${g.tnameH} vs ${g.tnameA} (${g.stadiumnameF || g.stadiumname})`;
    chip.innerHTML = `${fmtTime(g.gameStart)} <b>${shortTeamName(g.tnameH)}</b>-${shortTeamName(g.tnameA)}`;
    td.appendChild(chip);
  }
  return td;
}
