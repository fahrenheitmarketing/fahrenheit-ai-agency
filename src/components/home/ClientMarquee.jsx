import React from 'react';

const clients = [
  {
    name: 'PepsiCo',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/bca8fcf11_image.png',
    scale: 2,
  },
  {
    name: 'Transcore',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/61e429771_image.png',
  },
  {
    name: 'CITGO',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/205fec2dc_image.png',
  },
  {
    name: 'Portacool',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5ceeef5bf_image.png',
    scale: 1.5,
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
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/91cfda926_image.png',
    scale: 1.5,
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
    scale: 0.7,
  },
  {
    name: 'Barbara Bush Foundation for Family Literacy',
    logo: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/73ae57c73_image.png',
  },

];

const LogoItem = ({ client, i }) =>
  client.logo ? (
    <img
      key={i}
      src={client.logo}
      alt={client.name}
      className="w-auto flex-shrink-0 object-contain"
      style={{ filter: 'grayscale(100%) opacity(0.45)', height: client.scale ? `${3.5 * client.scale}rem` : '3.5rem' }}
    />
  ) : (
    <span
      key={i}
      className="font-heading text-xl font-normal text-foreground/40 flex-shrink-0"
    >
      {client.name}
    </span>
  );

export default function ClientMarquee() {
  return (
    <div className="border-t border-b border-border py-6 overflow-hidden bg-secondary/30">
      <p className="text-xs uppercase tracking-widest text-center text-muted-foreground mb-6 font-body px-6">
        Trusted where performance is measured
      </p>
      <div className="relative overflow-hidden">
        <div className="flex items-center w-max" style={{ animation: 'marquee-seamless 30s linear infinite' }}>
          {/* First set */}
          <div className="flex items-center gap-16 pr-16">
            {clients.map((client, i) => <LogoItem key={`a-${i}`} client={client} i={i} />)}
          </div>
          {/* Exact duplicate — creates seamless loop */}
          <div className="flex items-center gap-16 pr-16">
            {clients.map((client, i) => <LogoItem key={`b-${i}`} client={client} i={i} />)}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee-seamless {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}