'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Users } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { personalInfo, qualifications, experience, professionalMemberships } from '@/data/resumeData';

export default function AboutPage() {
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
            About Dr. Shantipal S. Ohol
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            A journey of academic excellence and innovation in Robotics & Mechanical Engineering
          </motion.p>
        </div>

        {/* Personal Statement */}
        <AnimatedSection className="mb-16">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Professional Philosophy" />
            <Card>
              <p className="text-gray-700 leading-relaxed">
                Extreme will-power to work hard with strong determination and focused attitude, having a good aptitude for learning.
                Good team-worker, adaptable, flexible, and well natured. Having good decision-making and improvisations skills, even under pressure.
                Self-motivated, committed and with a firm sense of responsibility. Organized, with good spoken and written communication skills.
                Willingness to work to the fullest capacity in a healthy environment, expand my knowledge and work for the progress of the Organization.
              </p>
            </Card>
          </div>
        </AnimatedSection>

        {/* Academic Qualifications */}
        <AnimatedSection className="mb-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Academic Qualifications"
              subtitle="Excellence in Mechanical Engineering and Manufacturing Automation"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {qualifications.map((qual, index) => (
                <Card key={index} delay={index * 0.1}>
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4">
                      <GraduationCap className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {qual.degree}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{qual.institution}</p>
                    <p className="text-sm text-gray-600 mb-2">{qual.university}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {qual.year}
                      </span>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {qual.class}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-auto">
                      <strong>Specialization:</strong> {qual.specialization}
                    </p>
                    {qual.thesis && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Thesis:</strong> {qual.thesis}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Experience Timeline */}
        <AnimatedSection className="mb-16 bg-white/50 py-12 -mx-4 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Professional Experience"
              subtitle="Over 27 years of academic and industrial excellence"
              centered
            />

            {/* Industrial Experience */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-primary-600" size={24} />
                Industrial Experience
              </h3>
              <div className="space-y-6">
                {experience.industrial.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:rounded-full before:bg-primary-600 before:shadow-lg"
                  >
                    <div className="glass-card">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{exp.designation}</h4>
                        <span className="text-sm text-gray-600">{exp.period}</span>
                      </div>
                      <p className="text-gray-700 font-medium mb-1">{exp.organization}</p>
                      <p className="text-sm text-gray-600">{exp.responsibilities}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Teaching Experience */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="text-accent-teal" size={24} />
                Teaching Experience
              </h3>
              <div className="space-y-6">
                {experience.teaching.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:rounded-full before:bg-accent-teal before:shadow-lg"
                  >
                    <div className="glass-card">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{exp.designation}</h4>
                        <span className="text-sm text-gray-600">{exp.period}</span>
                      </div>
                      <p className="text-gray-700 font-medium">{exp.organization}</p>
                      <span className="inline-block mt-2 text-xs font-medium text-accent-teal bg-teal-50 px-3 py-1 rounded-full">
                        {exp.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Professional Memberships */}
        <AnimatedSection>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Professional Memberships"
              subtitle="Active member of prestigious professional organizations"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalMemberships.map((membership, index) => (
                <Card key={index} delay={index * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Award className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{membership.name}</h4>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded whitespace-nowrap">
                          {membership.year}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{membership.organization}</p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {membership.type}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
