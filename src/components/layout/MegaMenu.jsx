import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MegaMenu({ items, columns = 3, onNavigate }) {
  const rows = Math.ceil(items.length / columns);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2">
        <div className={`grid ${columns === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {items.map((item, i) => {
            const col = i % columns;
            const isLastRow = Math.floor(i / columns) === rows - 1;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={`group flex items-start gap-4 px-6 py-6 transition-colors hover:bg-secondary/40 ${col < columns - 1 ? 'border-r border-dashed border-border' : ''} ${!isLastRow ? 'border-b border-dashed border-border' : ''}`}
              >
                <item.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-medium font-body text-foreground group-hover:text-accent transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}