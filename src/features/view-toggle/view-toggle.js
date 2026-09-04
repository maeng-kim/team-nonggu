// Toggles between 'calendar' and 'list' view. Owns only the button label;
// the caller decides what showing each view actually means.
export function mountViewToggle(buttonEl, onToggle) {
  let view = 'calendar';
  buttonEl.addEventListener('click', () => {
    view = view === 'calendar' ? 'list' : 'calendar';
    buttonEl.textContent = view === 'calendar' ? '리스트 보기' : '캘린더 보기';
    onToggle(view);
  });
}
