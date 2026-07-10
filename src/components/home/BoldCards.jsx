import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Repeat, Users, Layers } from 'lucide-react';

const cards = [
  {
    icon: Calendar,
    title: 'Established in 2008',
    caption: 'Nearly two decades of building and scaling digital programs.',
  },
  {
    icon: Repeat,
    title: 'Month-to-Month Engagements',
    caption: 'No long-term contracts. We earn your business every month.',
  },
  {
    icon: Users,
    title: 'Seasoned Staff',
    caption: 'Senior strategists and specialists — no junior account farming.',
  },
  {
    icon: Layers,
    title: 'Full-Service Digital Agency',
    caption: 'SEO, SEM, Social, CRO, Development — all under one roof.',
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
            className="bg-card/30 backdrop-blur-md border border-border/40 rounded-lg p-6 flex flex-col justify-between hover:border-accent/60 transition-colors group"
          >
            <Icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" strokeWidth={2} />
            <div>
              <h3 className="font-heading text-lg font-normal text-foreground mb-2 leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {card.caption}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}