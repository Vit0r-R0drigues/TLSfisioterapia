// Monta os dados estruturados de cada unidade a partir de site-config.js.
// O resultado é gravado no HTML por scripts/atualizar-dados-unidades.mjs, para o Google ler sem executar JavaScript.
import { SITE_URL, UNITS } from '../site-config.js';

const ORGANIZATION_ID = `${SITE_URL}/#organizacao`;

const IN_PERSON_SERVICES = [
  'Avaliação Fisioterapêutica Inicial',
  'Fisioterapia Traumato-Ortopédica',
  'Fisioterapia Neurofuncional e Geriátrica',
  'Fisioterapia Cardiorrespiratória',
  'Análise e Avaliação em Fisioterapia Forense'
];

function postalAddress(unit) {
  return {
    '@type': 'PostalAddress',
    streetAddress: `${unit.streetAddress} - ${unit.neighborhood}`,
    addressLocality: unit.addressLocality,
    addressRegion: unit.addressRegion,
    postalCode: unit.postalCode,
    addressCountry: 'BR'
  };
}

// Enquanto a unidade não for elegível ao Perfil da Empresa, descreve apenas um local de atendimento
function serviceLocationGraph(unit, pageUrl) {
  return [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'TLS Fisioterapia',
      url: `${SITE_URL}/`,
      telephone: '+55-11-92552-0084'
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#servico`,
      name: `Fisioterapia presencial na unidade ${unit.name}`,
      serviceType: IN_PERSON_SERVICES,
      provider: { '@id': ORGANIZATION_ID },
      url: pageUrl,
      availableChannel: {
        '@type': 'ServiceChannel',
        name: 'Atendimento mediante agendamento em consultório Livance',
        serviceLocation: {
          '@type': 'Place',
          name: `Consultório Livance ${unit.name}`,
          address: postalAddress(unit)
        }
      }
    }
  ];
}

function localBusinessGraph(unit, pageUrl) {
  return [
    {
      '@type': 'Physiotherapy',
      '@id': `${pageUrl}#unidade`,
      name: `TLS Fisioterapia - ${unit.name}`,
      url: pageUrl,
      telephone: '+55-11-92552-0084',
      address: postalAddress(unit),
      parentOrganization: { '@id': ORGANIZATION_ID }
    }
  ];
}

export function buildUnitSchema(slug) {
  const unit = UNITS[slug];
  if (!unit) throw new Error(`Unidade desconhecida: ${slug}`);

  const pageUrl = `${SITE_URL}/unidades/${slug}/`;
  const graph = unit.googleBusinessProfileEligible
    ? localBusinessGraph(unit, pageUrl)
    : serviceLocationGraph(unit, pageUrl);

  return { '@context': 'https://schema.org', '@graph': graph };
}
