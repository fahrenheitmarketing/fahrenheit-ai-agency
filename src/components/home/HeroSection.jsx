import React from 'react';
import { motion } from 'framer-motion';
import BoldCards from './BoldCards';
import WaveBackground from './WaveBackground';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-[76px] scroll-m-0">
      <WaveBackground />
      {/* Cubes pattern — top right */}
      <img
        src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-70 select-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              AI Enablement · Since 2008
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8"
            >
              Choose the model that's right{' '}
              <span className="text-accent italic">for your business</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12 max-w-xl font-body"
            >
              Whether it's an agentic AI package, managed hosting, an ongoing retainer that leverages AI wherever possible to maximize your ROI, or a one-time fixed-bid project — every solution is tailored to your specific needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-0 border-t border-border"
            >
              {[['18+', 'Years Building'], ['350+', 'Global Clients'], ['1000+', 'Campaigns Managed']].map(([val, label]) => (
                <div key={label} className="pr-8 pt-6">
                  <p className="font-heading text-3xl md:text-4xl font-normal text-foreground">{val}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-body">{label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-4 bg-accent/10 border border-accent/30 rounded-lg px-5 py-4"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-accent font-body mb-1">Agentic Retainers</p>
                <p className="text-sm text-muted-foreground font-body">Starting at only</p>
              </div>
              <p className="font-heading text-3xl font-normal text-foreground">
                $1,500<span className="text-base text-muted-foreground font-body">/mo</span>
              </p>
            </motion.div>
          </div>

          {/* Right — Bold Cards */}
          <div className="h-full">
            <BoldCards />
          </div>
        </div>
      </div>
    </section>
  );
}