// O blog mudou de /BLOG/ para /blog/; a página 404 leva o visitante ao endereço novo
(() => {
  const { pathname, search, hash } = window.location;
  if (/^\/BLOG(\/|$)/.test(pathname)) {
    window.location.replace(pathname.replace(/^\/BLOG/, '/blog') + search + hash);
  }
})();
