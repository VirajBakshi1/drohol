'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Trophy,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Briefcase,
  Mail,
  Image,
  Images,
  ExternalLink,
  LogOut,
  KeyRound,
} from 'lucide-react';

const ADMIN_BASE = '/drohol-9x7k';
const AUTH_PAGES = [`${ADMIN_BASE}/login`, `${ADMIN_BASE}/change-password`];

const navItems = [
  { href: `${ADMIN_BASE}`, label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: `${ADMIN_BASE}/profile`, label: 'Profile', icon: User },
  { href: `${ADMIN_BASE}/contact`, label: 'Contact', icon: Mail },
  { href: `${ADMIN_BASE}/hero`, label: 'Hero Slides', icon: Image },
  { href: `${ADMIN_BASE}/gallery`, label: 'Gallery', icon: Images },
  { href: `${ADMIN_BASE}/awards`, label: 'Awards', icon: Trophy },
  { href: `${ADMIN_BASE}/publications`, label: 'Publications', icon: BookOpen },
  { href: `${ADMIN_BASE}/research`, label: 'Research', icon: FlaskConical },
  { href: `${ADMIN_BASE}/students`, label: 'Students', icon: GraduationCap },
  { href: `${ADMIN_BASE}/leadership`, label: 'Leadership', icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Login and change-password pages render without sidebar
  if (AUTH_PAGES.includes(pathname)) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`${ADMIN_BASE}/login`);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Dr. Ohol Portfolio CMS</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={16} />
            View Website
          </Link>
          <Link
            href={`${ADMIN_BASE}/change-password`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <KeyRound size={16} />
            Change Password
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-red-500 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
