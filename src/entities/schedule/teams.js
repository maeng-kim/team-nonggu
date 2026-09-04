// KBL team code -> full name. Codes come straight from the /match/list response
// (tcodeH / tcodeA); hardcoded because the league roster only changes yearly.
export const TEAMS = {
  '06': '수원 KT',
  '10': '울산 현대모비스',
  '16': '원주 DB',
  '35': '서울 삼성',
  '50': '창원 LG',
  '55': '서울 SK',
  '60': '부산 KCC',
  '64': '대구 한국가스공사',
  '66': '고양 소노',
  '70': '안양 정관장',
};

export function shortTeamName(fullName) {
  return fullName.split(' ').slice(1).join(' ') || fullName;
}
