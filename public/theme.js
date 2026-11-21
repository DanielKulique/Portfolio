/* Apply theme before paint; fall back gracefully when storage is unavailable. */
try {
  const saved = localStorage.getItem('theme');
  document.documentElement.dataset.theme =
    saved === 'light' || saved === 'dark'
      ? saved
      : matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
} catch {
  document.documentElement.dataset.theme = 'dark';
}
