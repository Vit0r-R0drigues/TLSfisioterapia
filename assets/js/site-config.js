// Configuração central do site. Edite somente este arquivo para trocar a agenda ou as unidades.

// URL pública da agenda da TLS na Livance. Enquanto o valor contiver "{{",
// os botões de agendamento usam o link de WhatsApp escrito no próprio HTML.
export const LIVANCE_BOOKING_URL = '{{LIVANCE_BOOKING_URL}}';

export const SITE_URL = 'https://tlsfisioterapia.com.br';

// Chave da Google Maps Embed API (gratuita, restrita ao domínio do site). Com ela, os mapas das
// unidades usam o formato oficial do Google; vazia, usam o formato público sem chave.
export const GOOGLE_MAPS_EMBED_KEY = '';

// Endereços conferidos em https://www.livance.com.br/unidades.
// googleBusinessProfileEligible: só mude para true depois de confirmar que a unidade
// pode ser cadastrada como estabelecimento da TLS no Perfil da Empresa no Google.
// Depois de alterar uma unidade, rode: node scripts/atualizar-dados-unidades.mjs
export const UNITS = {
  paulista: {
    name: 'Paulista',
    streetAddress: 'Av. Paulista, 2064, 21º andar',
    addressLocality: 'São Paulo',
    neighborhood: 'Bela Vista',
    addressRegion: 'SP',
    postalCode: '01310-200',
    googleBusinessProfileEligible: false
  },
  brigadeiro: {
    name: 'Brigadeiro',
    streetAddress: 'Rua Cincinato Braga, 340',
    addressLocality: 'São Paulo',
    neighborhood: 'Bela Vista',
    addressRegion: 'SP',
    postalCode: '01333-011',
    googleBusinessProfileEligible: false
  },
  ibirapuera: {
    name: 'Ibirapuera',
    streetAddress: 'Rua Agostinho Rodrigues Filho, 550',
    addressLocality: 'São Paulo',
    neighborhood: 'Vila Clementino',
    addressRegion: 'SP',
    postalCode: '04026-040',
    googleBusinessProfileEligible: false
  },
  'vila-mariana': {
    name: 'Vila Mariana',
    streetAddress: 'Rua Domingos de Morais, 2781, 14º andar',
    addressLocality: 'São Paulo',
    neighborhood: 'Vila Mariana',
    addressRegion: 'SP',
    postalCode: '04035-001',
    googleBusinessProfileEligible: false
  },
  'santo-andre': {
    name: 'Santo André',
    streetAddress: 'Avenida Portugal, 1285, 2º e 3º pavimentos',
    addressLocality: 'Santo André',
    neighborhood: 'Centro',
    addressRegion: 'SP',
    postalCode: '09040-011',
    googleBusinessProfileEligible: false
  }
};

export function isBookingConfigured() {
  return /^https:\/\//.test(LIVANCE_BOOKING_URL) && !LIVANCE_BOOKING_URL.includes('{{');
}
