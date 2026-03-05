'use client';

import Link from 'next/link';
import { Mail, MapPin, BookOpen, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700 mt-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Contact Information
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-sm text-slate-300">
                    Associate Professor, Mechanical Engineering Dept.
                  </p>
                  <p className="text-sm text-slate-300">
                    COEP Technological University, Pune
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:sso.mech@coep.ac.in"
                    className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    sso.mech@coep.ac.in
                  </a>
                  <a
                    href="mailto:shantipalso@gmail.com"
                    className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    shantipalso@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Quick Links
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/about"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                About
              </Link>
              <Link
                href="/research"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Research
              </Link>
              <Link
                href="/publications"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Publications
              </Link>
              <Link
                href="/awards"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Awards
              </Link>
              <Link
                href="/leadership"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Leadership
              </Link>
              <Link
                href="/guidance"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Students
              </Link>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <Award size={18} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                About
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              27+ years of academic experience in Robotics, Automation, and Mechanical Engineering with extensive research contributions and leadership in academic innovation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">
                Robotics
              </span>
              <span className="text-xs font-medium bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full border border-blue-500/20">
                Automation
              </span>
              <span className="text-xs font-medium bg-teal-500/10 text-teal-300 px-3 py-1 rounded-full border border-teal-500/20">
                Mechatronics
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Dr. Shantipal S. Ohol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
