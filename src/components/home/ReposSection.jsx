import React from 'react';

const retirements = [
  { retired: 'Billable hours', favor: 'Outcome pricing' },
  { retired: 'Campaign theater', favor: 'Compounding systems' },
  { retired: 'AI pilots that die', favor: 'Shipped, owned, measured' },
  { retired: 'Reports you ignore', favor: 'Dashboards your CFO reads' },
];

export default function ReposSection() {
  return (
    <section className="relative py-24 px-6 lg:px-10 border-t border-border">
      {/* Cubes pattern — bottom left */}
      <img
        src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-70 select-none rotate-180"
      />
      <div className="relative max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body">03 · The reposition</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
              The agency model is burned out. We rebuilt it around AI — and your P&L.
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground text-base leading-relaxed font-body mb-10">
              Marketing spend has never been higher. Attention has never been lower. The difference between companies that win the next decade and ones that fade won't be creative — it'll be intelligence, deployed.
            </p>
            <div className="space-y-3">
              {retirements.map((r, i) => (
                <div key={i} className="bg-card border border-border rounded-sm shadow-sm grid grid-cols-2 gap-4 px-6 py-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-body">We retired</p>
                    <p className="font-heading text-lg text-foreground/40 line-through">{r.retired}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent mb-1 font-body">In favor of</p>
                    <p className="font-heading text-lg text-foreground">{r.favor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}