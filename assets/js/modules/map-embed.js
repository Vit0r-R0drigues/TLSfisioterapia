import { GOOGLE_MAPS_EMBED_KEY } from '../site-config.js?v=20261030h';

function mapUrl(query) {
  const q = encodeURIComponent(query);
  // Formato oficial (Maps Embed API) quando há chave; sem chave, o formato público de incorporação
  return GOOGLE_MAPS_EMBED_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(GOOGLE_MAPS_EMBED_KEY)}&q=${q}`
    : `https://maps.google.com/maps?q=${q}&output=embed`;
}

// Carrega o mapa do Google somente quando o visitante pede, sem custo de desempenho nem cookies antes do clique
export function initMapEmbeds() {
  document.querySelectorAll('[data-map-embed]').forEach((container) => {
    const button = container.querySelector('[data-map-load]');
    if (!button) return;

    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = mapUrl(container.dataset.mapQuery);
      iframe.title = container.dataset.mapTitle || 'Mapa da unidade';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.className = 'map-frame';
      container.replaceChildren(iframe);
      iframe.focus();
    });
  });
}
