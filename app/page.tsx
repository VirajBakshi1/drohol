'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Award, Users, FlaskConical } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { StatCard, Card } from '@/components/ui/Card';

interface PersonalInfoData {
  name: string;
  designation: string;
  institution: string;
  qualification: string;
  summary: string;
  profileImage: string;
  currentPortfolios: string[];
  stats: {
    academicExperience: string;
    internationalJournals: number;
    internationalConferences: number;
    patentsAwarded: number;
    grantsReceived: string;
    researchExperience: string;
    administrativeExperience: string;
    industrialExperience: string;
  };
}

interface AwardData {
  _id: string;
  title: string;
  year: string;
  organization: string;
  description?: string;
  category: string;
}

interface HeroSlideData {
  _id: string;
  url: string;
  type: 'image' | 'video';
  alt: string;
}

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(null);
  const [internationalAwards, setInternationalAwards] = useState<AwardData[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetch('/api/hero-slides').then((r) => r.json()).then(setHeroSlides);
  }, []);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    Promise.all([
      fetch('/api/personal-info').then((r) => r.json()),
      fetch('/api/awards?category=international').then((r) => r.json()),
    ])
      .then(([info, awards]) => {
        setPersonalInfo(info);
        setInternationalAwards(awards);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !personalInfo?.stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600" />
        {!loading && (
          <p className="ml-4 text-gray-500 text-sm">
            Database empty —{' '}
            <a href="/admin" className="text-cyan-600 underline">go to Admin</a>{' '}
            and click &quot;Seed Database&quot; to populate content.
          </p>
        )}
      </div>
    );
  }

  const { stats, currentPortfolios } = personalInfo;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[heroIndex]?.url || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80'}
                alt={heroSlides[heroIndex]?.alt || ''}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Color backdrop — deep navy/cyan gradient so content pops */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/80 to-slate-900/70" />
        {/* Subtle cyan tint overlay on right side so profile region stays readable */}
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-950/40 via-transparent to-transparent" />

        {/* Carousel dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === heroIndex ? 'w-6 h-2 bg-cyan-400' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* LEFT — Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center"
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-4"
                >
                  Professor &amp; Researcher
                </motion.span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-xl md:text-2xl text-cyan-300 mb-3 font-semibold">
                  {personalInfo.designation}
                </p>
                <p className="text-base md:text-lg text-slate-300 mb-6 font-medium">
                  {personalInfo.institution}
                </p>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  {personalInfo.summary}
                </p>

                {/* Quick stats strip */}
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
                  {[
                    { value: stats.academicExperience, label: 'Yrs Experience' },
                    { value: stats.internationalJournals.toString(), label: 'Intl. Journals' },
                    { value: stats.patentsAwarded.toString(), label: 'Patents' },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{value}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/research"
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Research
                    <ArrowRight className="inline group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:border-cyan-400 hover:text-cyan-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                  >
                    Contact Me
                  </Link>
                </div>
              </motion.div>

              {/* RIGHT — Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="flex justify-center lg:justify-center order-1 lg:order-2"
              >
                <div className="relative">
                  {/* Decorative ring */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-transparent" />
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden">
                    <Image
                      src={personalInfo.profileImage || 'https://0.academia-photos.com/31412733/84850451/73489486/s200_ss.ohol.jpeg'}
                      alt={personalInfo.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
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
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
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
