'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Award, Users, FlaskConical } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { StatCard, Card } from '@/components/ui/Card';
import { personalInfo, stats, currentPortfolios } from '@/data/resumeData';
import { internationalAwards } from '@/data/awardsData';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden" style={{ backgroundColor: '#F5F3F7' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.05),transparent_50%)] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)] -z-10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center lg:justify-end order-2 lg:order-1"
              >
                <div className="relative group">
                  {/* Image container */}
                  <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                    <Image
                      src="https://0.academia-photos.com/31412733/84850451/73489486/s200_ss.ohol.jpeg"
                      alt="Dr. Shantipal S. Ohol"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left order-1 lg:order-2 flex flex-col justify-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-xl md:text-2xl text-cyan-700 mb-3 font-semibold">
                  {personalInfo.designation}
                </p>
                <p className="text-lg md:text-xl text-slate-700 mb-6 font-medium">
                  {personalInfo.institution}
                </p>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                  {personalInfo.summary}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/research"
                    className="group bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Research
                    <ArrowRight className="inline group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white backdrop-blur-sm border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-slate-50 hover:border-cyan-400 hover:scale-105 transition-all duration-300"
                  >
                    Contact Me
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-16 bg-gradient-to-b from-white/50 to-indigo-50/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Academic Excellence"
            subtitle="Decades of dedication to education, research, and innovation"
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            <StatCard number={stats.academicExperience} label="Years Teaching" delay={0} />
            <StatCard number={stats.internationalJournals.toString()} label="International Journals" delay={0.1} />
            <StatCard number={stats.internationalConferences.toString() + '+'} label="International Conferences" delay={0.2} />
            <StatCard number={stats.patentsAwarded.toString()} label="Patents Awarded" delay={0.3} />
            <StatCard number={stats.grantsReceived} label="Research Grants" delay={0.4} />
          </div>
        </div>
      </AnimatedSection>

      {/* About Summary */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Professional Summary"
              subtitle="Expertise in Robotics, Automation & Mechanical Engineering"
            />
            <Card>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="text-primary-600" size={20} />
                    Academic Qualifications
                  </h3>
                  <p className="text-gray-700">{personalInfo.qualification}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    All degrees from Govt. College of Engineering Pune (COEP), SPPU, Pune
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FlaskConical className="text-primary-600" size={20} />
                    Experience Highlights
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>Academic: {stats.academicExperience} Years</li>
                    <li>Research: {stats.researchExperience} Years</li>
                    <li>Administrative: {stats.administrativeExperience} Years</li>
                    <li>Industrial: {stats.industrialExperience} Years</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Current Roles */}
      <AnimatedSection className="py-16 bg-gradient-to-b from-cyan-50/30 to-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Current Portfolios"
              subtitle="Leadership roles and responsibilities"
              centered
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      </AnimatedSection>

      {/* Featured Awards */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Award Highlights"
              subtitle="Recognition for excellence in research and innovation"
            />
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {internationalAwards.slice(0, 4).map((award, index) => (
                <Card key={index} delay={index * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {award.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {award.organization}
                      </p>
                      <span className="inline-block mt-2 text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {award.year}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Link href="/awards" className="gradient-button inline-flex items-center">
                View All Awards
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(148,163,184,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(148,163,184,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore My Work
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Discover my research, publications, and contributions to robotics and automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/publications"
                className="bg-white text-slate-800 px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-2xl hover:bg-slate-50 transition-all duration-300 hover:scale-105"
              >
                Publications
              </Link>
              <Link
                href="/research"
                className="bg-slate-700/50 backdrop-blur-sm border-2 border-slate-400 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:text-slate-800 hover:border-white hover:scale-105 hover:shadow-xl"
              >
                Research Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
