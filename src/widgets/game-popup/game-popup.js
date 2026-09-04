import { TEAM_COLORS } from '../../entities/schedule/teams.js';
import { getVenueLinks, getTicketLink } from '../../entities/schedule/venue-links.js';
import { fmtTime } from '../../shared/lib/date.js';
import { hexToRgba } from '../../shared/lib/color.js';

export function mountGamePopup(overlayEl) {
  const panelEl = overlayEl.querySelector('.popup-panel');
  const titleEl = overlayEl.querySelector('.popup-title');
  const bodyEl = overlayEl.querySelector('.popup-body');
  const closeBtn = overlayEl.querySelector('.popup-close');

  function close() {
    overlayEl.hidden = true;
  }

  function open(dateKey, games) {
    titleEl.textContent = formatTitle(dateKey);
    bodyEl.innerHTML = '';
    for (const g of games) bodyEl.appendChild(makeCard(g));
    overlayEl.hidden = false;
  }

  closeBtn.addEventListener('click', close);
  overlayEl.addEventListener('click', (e) => {
    if (!panelEl.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlayEl.hidden) close();
  });

  return { open, close };
}

function formatTitle(dateKey) {
  return `${dateKey.slice(0, 4)}년 ${Number(dateKey.slice(4, 6))}월 ${Number(dateKey.slice(6, 8))}일`;
}

function makeCard(g) {
  const card = document.createElement('div');
  card.className = 'popup-card';

  const homeColor = TEAM_COLORS[g.tcodeH] || '#888888';
  const awayColor = TEAM_COLORS[g.tcodeA] || '#888888';
  const matchup = document.createElement('div');
  matchup.className = 'popup-matchup';
  matchup.style.background = `linear-gradient(90deg, ${hexToRgba(homeColor, 0.25)}, ${hexToRgba(awayColor, 0.25)})`;
  matchup.textContent = `${fmtTime(g.gameStart)} ${g.tnameH} vs ${g.tnameA}`;
  card.appendChild(matchup);

  const stadium = g.stadiumnameF || g.stadiumname || '';
  if (stadium) {
    const loc = document.createElement('div');
    loc.className = 'popup-location';
    loc.textContent = `📍 ${stadium}`;
    card.appendChild(loc);
  }

  const links = getVenueLinks(stadium);
  const linkRow = document.createElement('div');
  linkRow.className = 'popup-links';
  linkRow.appendChild(makeLink('네이버맵', links.naverMap));
  linkRow.appendChild(makeLink('좌석 시야 참고', links.seatGuide));
  linkRow.appendChild(makeLink('근처 맛집', links.restaurants));
  card.appendChild(linkRow);

  card.appendChild(makeLink('🎫 티켓 예매', getTicketLink(g), 'popup-ticket'));

  return card;
}

function makeLink(label, url, extraClass) {
  if (url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = label;
    if (extraClass) a.className = extraClass;
    return a;
  }
  const span = document.createElement('span');
  span.textContent = label;
  span.className = extraClass ? `link-disabled ${extraClass}` : 'link-disabled';
  return span;
}
