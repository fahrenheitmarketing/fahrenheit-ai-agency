import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const items = [
  {
    title: 'Established in 2008',
    caption: 'Nearly two decades of building and scaling digital programs.',
    stat: '18+ yrs',
    link: '/about',
  },
  {
    title: 'Month-to-Month Engagements',
    caption: 'No long-term contracts. We earn your business every month.',
    stat: 'No lock-in',
    link: '/pricing',
  },
  {
    title: 'Comprehensive Retainers',
    caption: 'Full-service marketing programs starting from $3,500/month.',
    stat: '$3,500/mo',
    link: '/pricing',
  },
];

export default function BoldCards() {
  return (
    <div className="flex flex-col justify-center h-full border-t border-border/40">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * i }}
        >
          <Link
            to={item.link}
            className="group flex items-center justify-between gap-6 py-8 border-b border-border/40 transition-all duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <div className="flex items-start gap-6">
              <span className="text-xs font-body text-muted-foreground pt-1 flex-shrink-0">0{i + 1}</span>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-normal text-foreground mb-1 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-sm">
                  {item.caption}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-heading text-lg text-accent whitespace-nowrap">{item.stat}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}