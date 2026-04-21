import React from 'react';
import { motion } from 'framer-motion';
import ChatPanel from './ChatPanel';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-[72px]">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16">
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
              We don't sell hours. We sell{' '}
              <span className="text-accent italic">profit</span>
              {' '}& growth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12 max-w-xl font-body"
            >
              Fahrenheit is an AI enablement partner for companies ready to turn intelligence into revenue. We design the systems, deploy the models, and operate the stack — measured in outcomes, not deliverables.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-0 border-t border-border"
            >
              {[['18+', 'Years Building'], ['350+', 'Global Clients'], ['∞', 'Models Deployed']].map(([val, label]) => (
                <div key={label} className="pr-8 pt-6">
                  <p className="font-heading text-3xl md:text-4xl font-normal text-foreground">{val}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-body">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Chat Panel */}
          <div className="h-full">
            <ChatPanel />
          </div>
        </div>
      </div>
    </section>
  );
}