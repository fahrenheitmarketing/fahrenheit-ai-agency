import { ORGANIZATION_ID } from '@/lib/siteConfig';

const city = (name) => ({ '@type': 'City', name: `${name}, TX` });

// Service node for a location page; provider points at the site-wide organization.
export function buildLocationSchema(displayName, cities) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital marketing',
    name: `Digital Marketing Agency in ${displayName}, TX`,
    areaServed: cities.length === 1 ? city(cities[0]) : cities.map(city),
    provider: { '@id': ORGANIZATION_ID },
  };
}