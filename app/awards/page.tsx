'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { AwardCard } from '@/components/ui/Card';

interface AwardData {
  _id: string;
  title: string;
  year: string;
  organization: string;
  description?: string;
  category: 'international' | 'national' | 'institute';
}

export default function AwardsPage() {
  const [international, setInternational] = useState<AwardData[]>([]);
  const [national, setNational] = useState<AwardData[]>([]);
  const [institute, setInstitute] = useState<AwardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/awards?category=international').then((r) => r.json()),
      fetch('/api/awards?category=national').then((r) => r.json()),
      fetch('/api/awards?category=institute').then((r) => r.json()),
    ])
      .then(([intl, natl, inst]) => {
        setInternational(intl);
        setNational(natl);
        setInstitute(inst);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          >
            Awards & Recognition
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Honored for excellence in teaching, research, and innovation
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card text-center"
          >
            <Trophy className="mx-auto text-amber-600 mb-2" size={40} />
            <div className="text-3xl font-bold gradient-text">{international.length}</div>
            <div className="text-sm text-gray-600">International</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card text-center"
          >
            <Trophy className="mx-auto text-primary-600 mb-2" size={40} />
            <div className="text-3xl font-bold gradient-text">{national.length}</div>
            <div className="text-sm text-gray-600">National</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card text-center"
          >
            <Trophy className="mx-auto text-teal-600 mb-2" size={40} />
            <div className="text-3xl font-bold gradient-text">{institute.length}</div>
            <div className="text-sm text-gray-600">Institute Level</div>
          </motion.div>
        </div>

        <AnimatedSection>
          <div className="max-w-6xl mx-auto space-y-16">
            {/* International Awards */}
            <div>
              <SectionHeader title="International Awards" />
              <div className="space-y-4">
                {international.map((award, index) => (
                  <AwardCard
                    key={index}
                    title={award.title}
                    year={award.year}
                    organization={award.organization}
                    description={award.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* National Awards */}
            <div>
              <SectionHeader title="National Awards" />
              <div className="space-y-4">
                {national.map((award, index) => (
                  <AwardCard
                    key={index}
                    title={award.title}
                    year={award.year}
                    organization={award.organization}
                    description={award.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Institute Awards */}
            <div>
              <SectionHeader title="Institute Level Awards" />
              <div className="space-y-4">
                {institute.map((award, index) => (
                  <AwardCard
                    key={index}
                    title={award.title}
                    year={award.year}
                    organization={award.organization}
                    description={award.description}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
