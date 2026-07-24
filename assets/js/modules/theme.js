const STORAGE_KEY = 'tls-theme';
const DARK = 'dark';
const LIGHT = 'light';

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    // Ignore storage restrictions.
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function updateToggleButton(button, theme) {
  const isDark = theme === DARK;
  const icon = button.querySelector('[data-theme-icon]');

  button.removeAttribute('aria-pressed');
  button.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
  button.title = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';

  if (icon) {
    icon.className = isDark
      ? 'fi fi-rr-brightness theme-toggle-icon'
      : 'fi fi-rr-moon theme-toggle-icon';
  }
}

function buildToggleButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';
  button.dataset.themeToggle = 'true';
  button.innerHTML =
    '<i class="fi fi-rr-brightness theme-toggle-icon" data-theme-icon aria-hidden="true"></i>' +
    '<span class="theme-toggle-text">Tema</span>';
  return button;
}

function mountToggle(button) {
  const navList = document.querySelector('.nav-list');

  if (!navList) {
    const footer = document.querySelector('.footer-base .container');
    if (footer) {
      button.classList.add('footer-utility');
      footer.append(button);
    } else {
      button.classList.add('theme-toggle-floating');
      document.body.append(button);
    }
    return;
  }

  const item = document.createElement('li');
  item.className = 'nav-utility nav-theme-item';
  const mobileNavigation = window.matchMedia('(max-width: 74.999rem)');

  const syncPosition = () => {
    if (mobileNavigation.matches) {
      button.classList.remove('theme-toggle-floating');
      item.append(button);
      if (!item.isConnected) navList.append(item);
      return;
    }

    if (item.isConnected) item.remove();
    button.classList.add('theme-toggle-floating');
    document.body.append(button);
  };

  syncPosition();
  mobileNavigation.addEventListener?.('change', syncPosition);
}

export function initTheme() {
  const storedTheme = getStoredTheme();
  const preloadedTheme = document.documentElement.getAttribute('data-theme');
  const initialTheme = storedTheme === DARK || storedTheme === LIGHT
    ? storedTheme
    : (preloadedTheme === LIGHT ? LIGHT : DARK);
  applyTheme(initialTheme);

  if (document.querySelector('[data-theme-toggle]')) return;
  const toggle = buildToggleButton();
  updateToggleButton(toggle, initialTheme);
  mountToggle(toggle);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === DARK ? DARK : LIGHT;
    const next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    storeTheme(next);
    updateToggleButton(toggle, next);
  });
}
