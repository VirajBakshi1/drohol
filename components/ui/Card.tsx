'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function Card({ children, className = '', hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover ? {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      } : {}}
      className={`glass-card card-hover-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  delay?: number;
}

export function StatCard({ number, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="glass-card text-center cursor-pointer group"
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div className="text-sm md:text-base text-gray-700 group-hover:text-indigo-700 transition-colors duration-300">
        {label}
      </div>
    </motion.div>
  );
}

interface AwardCardProps {
  title: string;
  year: string;
  organization: string;
  description?: string;
  delay?: number;
}

export function AwardCard({ title, year, organization, description, delay = 0 }: AwardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.03,
        y: -10,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      className="glass-card group card-hover-glow cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-all duration-300"
        >
          <span className="text-white text-xl">🏆</span>
        </motion.div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
              {title}
            </h3>
            <span className="text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full whitespace-nowrap group-hover:bg-indigo-100 transition-colors duration-300">
              {year}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1 group-hover:text-gray-800 transition-colors duration-300">
            {organization}
          </p>
          {description && (
            <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-700 transition-colors duration-300">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
