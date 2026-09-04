import { fetchSeasonSchedule } from '../entities/schedule/kbl-api.js';
import { filterByTeam } from '../entities/schedule/schedule-model.js';
import { mountTeamFilter } from '../features/team-filter/team-filter.js';
import { mountMonthNavigation } from '../features/month-navigation/month-navigation.js';
import { renderCalendarView } from '../widgets/calendar-view/calendar-view.js';
import { mountGamePopup } from '../widgets/game-popup/game-popup.js';

const el = {
  status: document.getElementById('status'),
  calCard: document.getElementById('calendarCard'),
  calBody: document.getElementById('calBody'),
  monthLabel: document.getElementById('monthLabel'),
  teamSelect: document.getElementById('teamSelect'),
  prevMonth: document.getElementById('prevMonth'),
  nextMonth: document.getElementById('nextMonth'),
  popupOverlay: document.getElementById('gamePopup'),
};

const state = { games: [], team: 'all' };
const popup = mountGamePopup(el.popupOverlay);

function render() {
  const filtered = filterByTeam(state.games, state.team);
  renderCalendarView({ bodyEl: el.calBody, labelEl: el.monthLabel }, filtered, monthNav.getCursor(), {
    onDayClick: (dateKey, dayGames) => popup.open(dateKey, dayGames),
  });
}

mountTeamFilter(el.teamSelect, (team) => { state.team = team; render(); });
const monthNav = mountMonthNavigation(el.prevMonth, el.nextMonth, () => render());

fetchSeasonSchedule()
  .then((games) => {
    state.games = games;
    el.status.hidden = true;
    el.calCard.hidden = false;
    render();
  })
  .catch((err) => {
    el.status.textContent = '일정을 불러오지 못했습니다: ' + err.message;
  });
