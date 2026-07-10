import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Repeat, Users, Layers } from 'lucide-react';

const cards = [
  {
    icon: Calendar,
    title: 'Established in 2008',
    caption: 'Nearly two decades of building and scaling digital programs.',
    stat: '18+',
    statLabel: 'Years',
    gradient: 'from-orange-500/20 to-red-600/10',
    glow: 'shadow-[0_0_40px_-12px_rgba(211,99,54,0.4)]',
    accent: 'text-orange-400',
    iconBg: 'bg-orange-500/15',
    ring: 'group-hover:border-orange-500/50',
  },
  {
    icon: Repeat,
    title: 'Month-to-Month Engagements',
    caption: 'No long-term contracts. We earn your business every month.',
    stat: '0',
    statLabel: 'Contracts',
    gradient: 'from-emerald-500/20 to-teal-600/10',
    glow: 'shadow-[0_0_40px_-12px_rgba(16,185,129,0.4)]',
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    ring: 'group-hover:border-emerald-500/50',
  },
  {
    icon: Users,
    title: 'Seasoned Staff',
    caption: 'Senior strategists and specialists — no junior account farming.',
    stat: '100%',
    statLabel: 'Senior',
    gradient: 'from-violet-500/20 to-purple-600/10',
    glow: 'shadow-[0_0_40px_-12px_rgba(139,92,246,0.4)]',
    accent: 'text-violet-400',
    iconBg: 'bg-violet-500/15',
    ring: 'group-hover:border-violet-500/50',
  },
  {
    icon: Layers,
    title: 'Full-Service Digital Agency',
    caption: 'SEO, SEM, Social, CRO, Development — all under one roof.',
    stat: '7',
    statLabel: 'Services',
    gradient: 'from-sky-500/20 to-blue-600/10',
    glow: 'shadow-[0_0_40px_-12px_rgba(56,189,248,0.4)]',
    accent: 'text-sky-400',
    iconBg: 'bg-sky-500/15',
    ring: 'group-hover:border-sky-500/50',
  },
];

export default function BoldCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            className={`relative overflow-hidden bg-transparent backdrop-blur-md border border-border/40 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${card.ring}`}
          >
            {/* Gradient wash */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${card.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${card.accent}`} strokeWidth={2} />
                </div>
                <div className="text-right">
                  <span className={`font-heading text-3xl font-normal ${card.accent} leading-none`}>{card.stat}</span>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 font-body">{card.statLabel}</p>
                </div>
              </div>
              <h3 className="font-heading text-lg font-normal text-foreground mb-2 leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {card.caption}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </motion.div>
        );
      })}
    </div>
  );
}