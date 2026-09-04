// Owns the "which month is the calendar showing" cursor and its prev/next buttons.
export function mountMonthNavigation(prevBtn, nextBtn, onChange) {
  const cursor = new Date();
  cursor.setDate(1);

  function emit() {
    onChange(cursor);
  }

  prevBtn.addEventListener('click', () => {
    cursor.setMonth(cursor.getMonth() - 1);
    emit();
  });
  nextBtn.addEventListener('click', () => {
    cursor.setMonth(cursor.getMonth() + 1);
    emit();
  });

  return { getCursor: () => cursor };
}
