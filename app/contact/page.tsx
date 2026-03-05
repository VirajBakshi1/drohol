'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { personalInfo } from '@/data/resumeData';

export default function ContactPage() {
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
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Feel free to reach out for collaborations, research opportunities, or inquiries
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Address Card */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Address</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {personalInfo.designation}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Department of Mechanical Engineering
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {personalInfo.institution}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Shivajinagar, Pune - 411005
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Maharashtra, India
                    </p>
                  </div>
                </div>
              </Card>

              {/* Email Card */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Email</h3>
                    {personalInfo.email.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="block text-gray-700 hover:text-cyan-600 transition-colors mb-2 text-base"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Research Interests */}
          <AnimatedSection delay={0.2}>
            <Card>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Globe className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Research Areas & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Robotics',
                      'Automation',
                      'Mechatronics',
                      'AI in Robotics',
                      'Industrial Robotics',
                      'Humanoid Robotics',
                      'Exoskeletons',
                      'Machine Design',
                      'Control Systems',
                    ].map((interest, index) => (
                      <span
                        key={index}
                        className="text-sm font-medium bg-gradient-to-r from-cyan-50 to-blue-50 text-gray-700 px-4 py-2 rounded-full border border-cyan-200"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          {/* Professional Summary */}
          <AnimatedSection delay={0.3}>
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">About</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {personalInfo.summary}
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Academic Experience</p>
                  <p className="text-xl font-bold text-gray-900">27+ Years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Research Publications</p>
                  <p className="text-xl font-bold text-gray-900">90+ Papers</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">PhD Scholars Guided</p>
                  <p className="text-xl font-bold text-gray-900">7 (3 Completed)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Patents</p>
                  <p className="text-xl font-bold text-gray-900">4 (2 Awarded)</p>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
