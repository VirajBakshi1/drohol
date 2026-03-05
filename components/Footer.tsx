'use client';

import Link from 'next/link';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-cyan-50/50 to-white border-t border-cyan-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    Associate Professor, Mechanical Engineering Dept.
                  </p>
                  <p className="text-sm text-gray-700">
                    COEP Technological University, Pune
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <a
                    href="mailto:sso.mech@coep.ac.in"
                    className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    sso.mech@coep.ac.in
                  </a>
                  <a
                    href="mailto:shantipalso@gmail.com"
                    className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    shantipalso@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/about"
                className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/research"
                className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                Research
              </Link>
              <Link
                href="/publications"
                className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                Publications
              </Link>
              <Link
                href="/awards"
                className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                Awards
              </Link>
              <Link
                href="/leadership"
                className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                Leadership
              </Link>
              <Link
                href="/guidance"
                className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                Students
              </Link>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              27+ years of academic experience in Robotics, Automation, and Mechanical Engineering with extensive research contributions and leadership in academic innovation.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Dr. Shantipal S. Ohol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
