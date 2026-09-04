import { groupByDate } from '../../entities/schedule/schedule-model.js';
import { shortTeamName, TEAM_COLORS } from '../../entities/schedule/teams.js';
import { ymd, fmtTime } from '../../shared/lib/date.js';
import { hexToRgba } from '../../shared/lib/color.js';

export function renderCalendarView({ bodyEl, labelEl }, games, cursor, { onDayClick } = {}) {
  const byDate = groupByDate(games);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  labelEl.innerHTML = `<span class="month-num">${month + 1}월</span><span class="month-year">${year}</span>`;

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = ymd(new Date());

  bodyEl.innerHTML = '';

  for (let i = 0; i < firstDow; i++) {
    bodyEl.appendChild(makeCell(new Date(year, month, 1 - (firstDow - i)), byDate, today, true, onDayClick));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    bodyEl.appendChild(makeCell(new Date(year, month, day), byDate, today, false, onDayClick));
  }
  let next = 1;
  while (bodyEl.children.length % 7 !== 0) {
    bodyEl.appendChild(makeCell(new Date(year, month + 1, next++), byDate, today, true, onDayClick));
  }
}

function makeCell(date, byDate, today, isOtherMonth, onDayClick) {
  const cell = document.createElement('div');
  cell.className = 'cal-cell' + (isOtherMonth ? ' othermonth' : '');
  const key = ymd(date);
  if (key === today) cell.classList.add('today');

  const num = document.createElement('div');
  num.className = 'daynum';
  num.textContent = date.getDate();
  cell.appendChild(num);

  const dayGames = byDate.get(key) || [];
  if (dayGames.length) {
    const chips = document.createElement('div');
    chips.className = 'chips';
    for (const g of dayGames) chips.appendChild(makeChip(g));
    cell.appendChild(chips);
    cell.classList.add('has-games');
    cell.addEventListener('click', () => onDayClick && onDayClick(key, dayGames));
  }
  return cell;
}

function makeChip(g) {
  const chip = document.createElement('div');
  chip.className = 'chip';
  const homeColor = TEAM_COLORS[g.tcodeH] || '#888888';
  const awayColor = TEAM_COLORS[g.tcodeA] || '#888888';
  chip.style.background = `linear-gradient(90deg, ${hexToRgba(homeColor, 0.22)}, ${hexToRgba(awayColor, 0.22)})`;
  chip.innerHTML = `${fmtTime(g.gameStart)} <b>${shortTeamName(g.tnameH)}</b>-${shortTeamName(g.tnameA)}`;
  return chip;
}
