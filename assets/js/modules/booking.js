import { LIVANCE_BOOKING_URL, isBookingConfigured } from '../site-config.js?v=20261030h';

const WHATSAPP_FALLBACK = 'https://api.whatsapp.com/send/?phone=5511999115387&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o.';

function trackBookingClick(link, destination) {
  const params = {
    source_page: window.location.pathname,
    unit: link.dataset.unit || document.body.dataset.unit || 'nao_informada',
    service: link.dataset.service || 'geral',
    button_position: link.dataset.position || 'nao_informada',
    destination
  };

  // gtag só existe depois do consentimento; sem ele o evento fica apenas na página
  if (window.__tlsAnalyticsLoaded && typeof window.gtag === 'function') {
    window.gtag('event', 'booking_click', params);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'booking_click', ...params });
  }
}

function mountMobileFloat() {
  // A página domiciliar desliga o botão: o agendamento em casa é feito pelo WhatsApp
  if (document.body.dataset.bookingFloat === 'off') return;
  if (!document.querySelector('.site-header') || document.querySelector('[data-booking-float]')) return;

  const link = document.createElement('a');
  link.className = 'booking-float';
  link.href = WHATSAPP_FALLBACK;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.dataset.booking = '';
  link.dataset.bookingFloat = '';
  link.dataset.position = 'botao_fixo_mobile';
  if (document.body.dataset.unit) link.dataset.unit = document.body.dataset.unit;
  link.innerHTML = '<i class="fi fi-rr-calendar-check" aria-hidden="true"></i><span>Agendar avaliação</span>';
  document.body.append(link);
  document.body.classList.add('has-booking-float');
}

export function initBooking() {
  mountMobileFloat();

  const configured = isBookingConfigured();
  const destination = configured ? 'livance' : 'whatsapp_fallback';

  document.querySelectorAll('[data-booking]').forEach((link) => {
    if (configured) link.href = LIVANCE_BOOKING_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dataset.destination = destination;
    link.addEventListener('click', () => trackBookingClick(link, destination));
  });
}
