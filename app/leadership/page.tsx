'use client';

import { motion } from 'framer-motion';
import { Users, Building2, Award, Briefcase } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { currentPortfolios, presentAffiliations, industryCoalitions } from '@/data/resumeData';

export default function LeadershipPage() {
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
            Leadership & Affiliations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Leadership roles, professional affiliations, and industry collaborations
          </motion.p>
        </div>

        <AnimatedSection>
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Present Portfolios */}
            <div>
              <SectionHeader
                title="Present Portfolios"
                subtitle="Current leadership roles and responsibilities"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPortfolios.map((portfolio, index) => (
                  <Card key={index} delay={index * 0.1}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0">
                        <Users className="text-white" size={20} />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {portfolio}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Professional Affiliations */}
            <div>
              <SectionHeader
                title="Professional Affiliations"
                subtitle="Active memberships and positions in professional organizations"
              />
              <div className="grid md:grid-cols-2 gap-6">
                {presentAffiliations.map((affiliation, index) => (
                  <Card key={index} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                        <Award className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-2">
                          {affiliation.role}
                        </span>
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {affiliation.organization}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Industry Coalitions */}
            <div>
              <SectionHeader
                title="Industry & Organizational Coalitions"
                subtitle="Advisory and technical positions with industry and organizations"
              />
              <div className="space-y-4">
                {industryCoalitions.map((coalition, index) => (
                  <Card key={index} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center flex-shrink-0">
                        <Building2 className="text-white" size={20} />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {coalition}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Responsibilities Highlight */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Key Leadership Highlights
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <Users className="mx-auto text-white mb-3" size={32} />
                    <div className="text-2xl font-bold text-white mb-1">9+</div>
                    <div className="text-sm text-blue-100">Present Portfolios</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <Award className="mx-auto text-white mb-3" size={32} />
                    <div className="text-2xl font-bold text-white mb-1">7</div>
                    <div className="text-sm text-blue-100">Professional Affiliations</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <Briefcase className="mx-auto text-white mb-3" size={32} />
                    <div className="text-2xl font-bold text-white mb-1">6</div>
                    <div className="text-sm text-blue-100">Industry Coalitions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
