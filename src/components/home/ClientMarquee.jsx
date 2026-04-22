import React from 'react';

const clients = [
  {
    name: 'PepsiCo',
    logo: 'https://companieslogo.com/img/orig/PEP_BIG-f38ffafd.png?t=1776347712',
  },
  {
    name: 'Transcore',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/61e429771_image.png',
  },
  {
    name: 'CITGO',
    logo: 'https://images.seeklogo.com/logo-png/3/1/citgo-logo-png_seeklogo-30721.png',
  },
  {
    name: 'Portacool',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/ff9ad4813_generated_image.png',
  },
  {
    name: 'Blink',
    logo: 'https://companieslogo.com/img/orig/BLNK_BIG-e55db701.png?t=1720244491',
  },
  {
    name: 'Northern Reflections',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/de5dc611b_image.png',
  },
  {
    name: 'Sentech',
    logo: 'https://images.seeklogo.com/logo-png/47/1/sentech-logo-png_seeklogo-477363.png',
  },
  {
    name: 'Cactus Life Sciences',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/afa88c46a_image.png',
  },
  {
    name: 'Lammes',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/811331bf4_image.png',
  },
  {
    name: 'Solnexus',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/876f14635_image.png',
  },
  {
    name: 'EliteCEU',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/afc229c76_image.png',
  },

];

export default function ClientMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <div className="border-t border-b border-border py-6 overflow-hidden bg-secondary/30">
      <p className="text-xs uppercase tracking-widest text-center text-muted-foreground mb-6 font-body px-6">
        Trusted where performance is measured
      </p>
      <div className="relative overflow-hidden">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {doubled.map((client, i) =>
            client.logo ? (
              <img
                key={i}
                src={client.logo}
                alt={client.name}
                className="h-14 w-auto flex-shrink-0 object-contain"
                style={{ filter: 'grayscale(100%) opacity(0.45)' }}
              />
            ) : (
              <span
                key={i}
                className="font-heading text-xl font-normal text-foreground/40 hover:text-foreground/60 transition-colors cursor-default flex-shrink-0"
              >
                {client.name}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}