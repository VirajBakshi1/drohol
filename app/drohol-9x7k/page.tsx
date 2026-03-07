'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, BookOpen, FlaskConical, GraduationCap, Briefcase, User, RefreshCw } from 'lucide-react';

interface Counts {
  awards: number;
  publications: number;
  projects: number;
  phd: number;
  patents: number;
  grants: number;
  achievements: number;
  competitions: number;
  studentProjects: number;
  memberships: number;
  affiliations: number;
}

const sections = [
  { href: '/admin/profile', label: 'Profile', icon: User, color: 'bg-blue-50 text-blue-700', key: null },
  { href: '/admin/awards', label: 'Awards', icon: Trophy, color: 'bg-amber-50 text-amber-700', key: 'awards' },
  { href: '/admin/publications', label: 'Publications', icon: BookOpen, color: 'bg-cyan-50 text-cyan-700', key: 'publications' },
  { href: '/admin/research', label: 'Research Projects', icon: FlaskConical, color: 'bg-green-50 text-green-700', key: 'projects' },
  { href: '/admin/students', label: 'Students & Guidance', icon: GraduationCap, color: 'bg-purple-50 text-purple-700', key: 'studentProjects' },
  { href: '/admin/leadership', label: 'Leadership', icon: Briefcase, color: 'bg-teal-50 text-teal-700', key: 'memberships' },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  async function loadCounts() {
    const [awards, pubs, projects, phd, patents, grants, achievements, competitions, studentProjects, memberships, affiliations] =
      await Promise.all([
        fetch('/api/awards').then((r) => r.json()),
        fetch('/api/publications').then((r) => r.json()),
        fetch('/api/research/projects').then((r) => r.json()),
        fetch('/api/research/phd').then((r) => r.json()),
        fetch('/api/research/patents').then((r) => r.json()),
        fetch('/api/leadership/grants').then((r) => r.json()),
        fetch('/api/students/achievements').then((r) => r.json()),
        fetch('/api/students/competitions').then((r) => r.json()),
        fetch('/api/students/projects').then((r) => r.json()),
        fetch('/api/leadership/memberships').then((r) => r.json()),
        fetch('/api/leadership/affiliations').then((r) => r.json()),
      ]);
    setCounts({
      awards: awards.length,
      publications: pubs.length,
      projects: projects.length,
      phd: phd.length,
      patents: patents.length,
      grants: grants.length,
      achievements: achievements.length,
      competitions: competitions.length,
      studentProjects: studentProjects.length,
      memberships: memberships.length,
      affiliations: affiliations.length,
    });
  }

  useEffect(() => { loadCounts(); }, []);

  async function handleSeed() {
    setSeeding(true);
    setSeedMsg('');
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      setSeedMsg(data.message ?? 'Seeded successfully');
      loadCounts();
    } catch {
      setSeedMsg('Seed failed');
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage all website content from here.</p>
        </div>
        <div className="flex items-center gap-3">
          {seedMsg && <span className="text-sm text-green-600">{seedMsg}</span>}
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 disabled:opacity-50"
          >
            <RefreshCw size={16} className={seeding ? 'animate-spin' : ''} />
            Seed Database
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(({ href, label, icon: Icon, color, key }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                {key && counts ? (
                  <p className="text-2xl font-bold text-gray-900">{counts[key as keyof Counts]}</p>
                ) : (
                  <p className="text-sm font-medium text-gray-700 group-hover:underline">Edit →</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {counts && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Counts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-gray-500">Awards:</span> <span className="font-medium">{counts.awards}</span></div>
            <div><span className="text-gray-500">Publications:</span> <span className="font-medium">{counts.publications}</span></div>
            <div><span className="text-gray-500">Research Projects:</span> <span className="font-medium">{counts.projects}</span></div>
            <div><span className="text-gray-500">PhD Students:</span> <span className="font-medium">{counts.phd}</span></div>
            <div><span className="text-gray-500">Patents:</span> <span className="font-medium">{counts.patents}</span></div>
            <div><span className="text-gray-500">Grants:</span> <span className="font-medium">{counts.grants}</span></div>
            <div><span className="text-gray-500">Memberships:</span> <span className="font-medium">{counts.memberships}</span></div>
            <div><span className="text-gray-500">Affiliations:</span> <span className="font-medium">{counts.affiliations}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
