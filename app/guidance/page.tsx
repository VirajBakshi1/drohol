'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Award, Users } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Card, StatCard } from '@/components/ui/Card';
import { studentStats, studentAchievements, mtechProjects, competitionMentorship } from '@/data/studentsData';

export default function GuidancePage() {
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
            Students & Guidance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Mentoring the next generation of robotics and engineering innovators
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <StatCard number={studentStats.phdCompleted.toString()} label="PhD Completed" />
          <StatCard number={studentStats.phdOngoing.toString()} label="PhD Ongoing" />
          <StatCard number={studentStats.mtechCompleted.toString()} label="MTech Projects" />
          <StatCard number={studentStats.btechCompleted} label="BTech Projects" />
        </div>

        <AnimatedSection>
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Student Achievements */}
            <div>
              <SectionHeader
                title="Student Achievements"
                subtitle="Recognition and awards won by students under guidance"
              />
              <div className="grid md:grid-cols-2 gap-6">
                {studentAchievements.map((achievement, index) => (
                  <Card key={index} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Trophy className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{achievement.achievement}</h3>
                        <p className="text-sm text-gray-700 mb-1">{achievement.students}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                            {achievement.year}
                          </span>
                          <span className="text-xs text-gray-600">{achievement.prize}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Competition Mentorship */}
            <div>
              <SectionHeader
                title="Competition Mentorship"
                subtitle="Guiding students to excel in national and international competitions"
              />
              <div className="grid md:grid-cols-2 gap-6">
                {competitionMentorship.map((comp, index) => (
                  <Card key={index} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Award className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{comp.competition}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Role:</strong> {comp.role}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Years:</strong> {comp.years}
                        </p>
                        {comp.location && (
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Location:</strong> {comp.location}
                          </p>
                        )}
                        {comp.achievements && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-700 mb-1">Achievements:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {comp.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-primary-600">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* MTech Projects Sample */}
            <div>
              <SectionHeader
                title="MTech Projects Guided"
                subtitle="Sample of 54 completed MTech projects"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mtechProjects.map((project, index) => (
                  <Card key={index} delay={index * 0.05}>
                    <div className="flex flex-col h-full">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mb-3">
                        <GraduationCap className="text-white" size={20} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                        {project.title}
                      </h4>
                      <p className="text-xs text-gray-700 mb-1">{project.student}</p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded">
                          {project.degree}
                        </span>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {project.year}
                        </span>
                      </div>
                      {project.type && (
                        <p className="text-xs text-gray-500 mt-2">{project.type}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Student Guidance Impact
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <Users className="mx-auto text-white mb-3" size={40} />
                    <div className="text-3xl font-bold text-white mb-2">100+</div>
                    <div className="text-cyan-50">Total Projects Guided</div>
                    <div className="text-sm text-cyan-100 mt-2">
                      Including BTech, MTech, and PhD projects
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <Trophy className="mx-auto text-white mb-3" size={40} />
                    <div className="text-3xl font-bold text-white mb-2">Multiple</div>
                    <div className="text-cyan-50">National & International Awards</div>
                    <div className="text-sm text-cyan-100 mt-2">
                      Including ROBOCON Championships
                    </div>
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
