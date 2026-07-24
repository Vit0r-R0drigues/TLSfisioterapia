(() => {
  const root = document.documentElement;

  let theme = 'dark';

  try {
    const storedTheme = localStorage.getItem('tls-theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      theme = storedTheme;
    }
  } catch (error) {
    // Keep the safe default when storage is unavailable.
  }

  root.setAttribute('data-theme', theme);
})();
