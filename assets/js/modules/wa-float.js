export function initWhatsAppFloat() {
  const widget = document.querySelector('[data-wa-float]');
  if (!widget) return;

  if (!window.matchMedia('(min-width: 48rem)').matches) return;

  widget.classList.add('active');
  setTimeout(() => widget.classList.remove('active'), 3200);
}
