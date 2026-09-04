import { TEAMS } from '../../entities/schedule/teams.js';

// Renders the team <select> and reports the chosen team code ('all' | tcode).
export function mountTeamFilter(selectEl, onChange) {
  const allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = '전체 팀';
  selectEl.appendChild(allOpt);

  for (const [code, name] of Object.entries(TEAMS)) {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = name;
    selectEl.appendChild(opt);
  }

  selectEl.addEventListener('change', () => onChange(selectEl.value));
}
