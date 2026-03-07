'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, FileCheck, Trophy, IndianRupee, FileText } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';

interface ResearchProject {
  _id: string;
  title: string;
  fundingAgency: string;
  amount: string;
  startDate: string;
  endDate?: string;
  status: 'Completed' | 'Ongoing';
  location?: string;
}

interface PhDStudent {
  _id: string;
  title: string;
  scholar: string;
  university: string;
  awardDate?: string;
  fellowship?: string;
  status: 'Completed' | 'In Progress';
}

interface Patent {
  _id: string;
  title: string;
  applicationNumber: string;
  applicationDate: string;
  number?: string;
  grantDate?: string;
  status: 'Awarded' | 'Filed';
}

interface Grant {
  _id: string;
  source: string;
  amount: string;
  purpose: string;
  year: string;
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'phd' | 'patents' | 'grants'>('projects');
  const [loading, setLoading] = useState(true);

  const [allProjects, setAllProjects] = useState<ResearchProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ResearchProject[]>([]);

  const [allPhd, setAllPhd] = useState<PhDStudent[]>([]);
  const [filteredPhd, setFilteredPhd] = useState<PhDStudent[]>([]);

  const [allPatents, setAllPatents] = useState<Patent[]>([]);
  const [filteredPatents, setFilteredPatents] = useState<Patent[]>([]);

  const [allGrants, setAllGrants] = useState<Grant[]>([]);
  const [filteredGrants, setFilteredGrants] = useState<Grant[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/research/projects').then((r) => r.json()),
      fetch('/api/research/phd').then((r) => r.json()),
      fetch('/api/research/patents').then((r) => r.json()),
      fetch('/api/leadership/grants').then((r) => r.json()),
    ])
      .then(([projects, phd, patents, grants]) => {
        setAllProjects(projects);
        setFilteredProjects(projects);
        setAllPhd(phd);
        setFilteredPhd(phd);
        setAllPatents(patents);
        setFilteredPatents(patents);
        setAllGrants(grants);
        setFilteredGrants(grants);
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
            Research & Innovation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Pioneering work in Robotics, Automation, and Mechanical Engineering
          </motion.p>
        </div>

        {/* Search Bar */}
        {activeTab === 'projects' && (
          <SearchBar
            data={allProjects}
            onSearch={setFilteredProjects}
            searchFields={['title', 'fundingAgency']}
            placeholder="Search research projects by title or funding agency..."
          />
        )}
        {activeTab === 'phd' && (
          <SearchBar
            data={allPhd}
            onSearch={setFilteredPhd}
            searchFields={['title', 'scholar', 'university']}
            placeholder="Search PhD by title, scholar name, or university..."
          />
        )}
        {activeTab === 'patents' && (
          <SearchBar
            data={allPatents}
            onSearch={setFilteredPatents}
            searchFields={['title', 'number', 'applicationNumber']}
            placeholder="Search patents by title or patent number..."
          />
        )}
        {activeTab === 'grants' && (
          <SearchBar
            data={allGrants}
            onSearch={setFilteredGrants}
            searchFields={['source', 'purpose']}
            placeholder="Search grants by source or purpose..."
          />
        )}

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { key: 'projects', label: 'Projects', icon: FlaskConical },
                { key: 'phd', label: 'PhD Guidance', icon: FileCheck },
                { key: 'patents', label: 'Patents', icon: Trophy },
                { key: 'grants', label: 'Grants', icon: IndianRupee },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <AnimatedSection>
            <div className="max-w-6xl mx-auto space-y-12">
              <div>
                <SectionHeader title={`Completed Research Projects (${allProjects.filter((p) => p.status === 'Completed').length})`} />
                <div className="space-y-6">
                  {filteredProjects.filter((p) => p.status === 'Completed').map((project, index) => (
                    <Card key={project._id} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center flex-shrink-0">
                          <FileCheck className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{project.fundingAgency}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">{project.status}</span>
                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{project.amount}</span>
                            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{project.startDate} - {project.endDate}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <SectionHeader title={`Ongoing Research Projects (${allProjects.filter((p) => p.status === 'Ongoing').length})`} />
                <div className="space-y-6">
                  {filteredProjects.filter((p) => p.status === 'Ongoing').map((project, index) => (
                    <Card key={project._id} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                          <FlaskConical className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{project.fundingAgency}</p>
                          {project.location && <p className="text-sm text-gray-600 mb-2">Location: {project.location}</p>}
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{project.status}</span>
                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{project.amount}</span>
                            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Started: {project.startDate}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* PhD Guidance Tab */}
        {activeTab === 'phd' && (
          <AnimatedSection>
            <div className="max-w-6xl mx-auto space-y-12">
              <div>
                <SectionHeader title={`PhD Completed (${allPhd.filter((p) => p.status === 'Completed').length})`} />
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPhd.filter((p) => p.status === 'Completed').map((phd, index) => (
                    <Card key={phd._id} delay={index * 0.1}>
                      <h3 className="font-semibold text-gray-900 mb-2">{phd.title}</h3>
                      <p className="text-sm text-gray-700 mb-1">Scholar: {phd.scholar}</p>
                      <p className="text-sm text-gray-600 mb-2">{phd.university}</p>
                      {phd.fellowship && (
                        <p className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded inline-block mb-2">{phd.fellowship}</p>
                      )}
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Awarded: {phd.awardDate}</span>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <SectionHeader title={`PhD In Progress (${allPhd.filter((p) => p.status === 'In Progress').length})`} />
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPhd.filter((p) => p.status === 'In Progress').map((phd, index) => (
                    <Card key={phd._id} delay={index * 0.1}>
                      <h3 className="font-semibold text-gray-900 mb-2">{phd.title}</h3>
                      <p className="text-sm text-gray-700 mb-1">Scholar: {phd.scholar}</p>
                      <p className="text-sm text-gray-600 mb-2">{phd.university}</p>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{phd.status}</span>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Patents Tab */}
        {activeTab === 'patents' && (
          <AnimatedSection>
            <div className="max-w-6xl mx-auto space-y-12">
              <div>
                <SectionHeader title={`Patents Awarded (${allPatents.filter((p) => p.status === 'Awarded').length})`} />
                <div className="space-y-6">
                  {filteredPatents.filter((p) => p.status === 'Awarded').map((patent, index) => (
                    <Card key={patent._id} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                          <Trophy className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{patent.title}</h3>
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <p>Patent No: {patent.number}</p>
                            <p>Application No: {patent.applicationNumber}</p>
                            <p>Application Date: {patent.applicationDate}</p>
                            <p>Grant Date: {patent.grantDate}</p>
                          </div>
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Awarded</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <SectionHeader title={`Patents Filed (${allPatents.filter((p) => p.status === 'Filed').length})`} />
                <div className="space-y-6">
                  {filteredPatents.filter((p) => p.status === 'Filed').map((patent, index) => (
                    <Card key={patent._id} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                          <FileText className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{patent.title}</h3>
                          <div className="text-sm text-gray-600 mb-2">
                            <p>Application No: {patent.applicationNumber}</p>
                            <p>Application Date: {patent.applicationDate}</p>
                          </div>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{patent.status}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Grants Tab */}
        {activeTab === 'grants' && (
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <SectionHeader title="Research Grants & Funding" subtitle="Total funding received: ₹3+ Crores" />
              <div className="space-y-6">
                {filteredGrants.map((grant, index) => (
                  <Card key={grant._id} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center flex-shrink-0">
                        <IndianRupee className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{grant.source}</h3>
                          <span className="text-lg font-bold text-green-600">{grant.amount}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{grant.purpose}</p>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">{grant.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}

