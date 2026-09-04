import { fetchSeasonSchedule } from '../entities/schedule/kbl-api.js';
import { filterByTeam } from '../entities/schedule/schedule-model.js';
import { mountTeamFilter } from '../features/team-filter/team-filter.js';
import { mountViewToggle } from '../features/view-toggle/view-toggle.js';
import { mountMonthNavigation } from '../features/month-navigation/month-navigation.js';
import { renderCalendarView } from '../widgets/calendar-view/calendar-view.js';
import { renderScheduleList } from '../widgets/schedule-list/schedule-list.js';

const el = {
  status: document.getElementById('status'),
  calTable: document.getElementById('calendar'),
  calBody: document.getElementById('calBody'),
  monthLabel: document.getElementById('monthLabel'),
  calNav: document.getElementById('calNav'),
  list: document.getElementById('list'),
  teamSelect: document.getElementById('teamSelect'),
  viewToggle: document.getElementById('viewToggle'),
  prevMonth: document.getElementById('prevMonth'),
  nextMonth: document.getElementById('nextMonth'),
};

const state = { games: [], team: 'all', view: 'calendar' };

function render() {
  const filtered = filterByTeam(state.games, state.team);
  const showCalendar = state.view === 'calendar';

  el.calNav.hidden = !showCalendar;
  el.calTable.hidden = !showCalendar;
  el.list.hidden = showCalendar;

  if (showCalendar) {
    renderCalendarView({ bodyEl: el.calBody, labelEl: el.monthLabel }, filtered, monthNav.getCursor());
  } else {
    renderScheduleList(el.list, filtered);
  }
}

mountTeamFilter(el.teamSelect, (team) => { state.team = team; render(); });
mountViewToggle(el.viewToggle, (view) => { state.view = view; render(); });
const monthNav = mountMonthNavigation(el.prevMonth, el.nextMonth, () => render());

fetchSeasonSchedule()
  .then((games) => {
    state.games = games;
    el.status.hidden = true;
    el.calTable.hidden = false;
    render();
  })
  .catch((err) => {
    el.status.textContent = '일정을 불러오지 못했습니다: ' + err.message;
  });
