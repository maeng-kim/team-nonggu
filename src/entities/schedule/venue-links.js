export const VENUE_LINKS = {};

export function getVenueLinks(stadiumName) {
  return VENUE_LINKS[stadiumName] || {};
}

export const TICKET_LINKS = {};

export function getTicketLink(game) {
  const key = `${game.gameDate}_${game.tcodeH}_${game.tcodeA}`;
  return TICKET_LINKS[key] || '';
}
