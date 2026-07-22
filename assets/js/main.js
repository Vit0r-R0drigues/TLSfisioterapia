import { initNavigation } from './modules/navigation.js?v=20260721';
import { initYear } from './modules/year.js?v=20260721';
import { initReveal } from './modules/reveal.js?v=20260721';
import { initTextRotator } from './modules/text-rotator.js?v=20260721';
import { initWhatsAppFloat } from './modules/wa-float.js?v=20260721';
import { initContactForm } from './modules/contact-form.js?v=20260721';
import { initCalculators } from './modules/calculadoras.js?v=20260721';
import { initTheme } from './modules/theme.js?v=20260721';
import { initCookieConsent } from './modules/cookie-consent.js?v=20260721';

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCookieConsent();
  initNavigation();
  initYear();
  initReveal();
  initTextRotator();
  initWhatsAppFloat();
  initContactForm();
  initCalculators();
});
