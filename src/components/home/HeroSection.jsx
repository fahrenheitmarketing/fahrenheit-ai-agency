import React from 'react';
import { motion } from 'framer-motion';
import ChatPanel from './ChatPanel';
import ParticleBackground from './ParticleBackground';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-[72px] scroll-m-0">
      <ParticleBackground />
      {/* Cubes pattern — top right */}
      <img
        src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-70 select-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16 relative z-10">
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
              We don't sell hours. We deliver{' '}
              <span className="text-accent italic">profit</span>
              {' '}and growth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12 max-w-xl font-body"
            >
              Fahrenheit is an AI enablement and custom software partner for companies operating in complex environments. For over a decade, we've built bespoke platforms, data systems, and digital infrastructure for enterprise clients—designed to perform under real-world conditions.
              <br /><br />
              We design the systems, develop the software, deploy the models, and operate the stack—measured in outcomes, not deliverables.
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
          </div>

          {/* Right — Chat Panel */}
          <div className="h-full max-h-[600px]">
            <ChatPanel />
          </div>
        </div>
      </div>
    </section>
  );
}