'use client';

import { useState, useEffect } from 'react';
import { Save, Link as LinkIcon, Mail, MapPin, User } from 'lucide-react';

interface PersonalInfo {
  _id?: string;
  name: string;
  designation: string;
  institution: string;
  email: string[];
  qualification: string;
  summary: string;
  profileImage: string;
  professionalPhilosophy: string;
}

export default function AdminContactPage() {
  const [data, setData] = useState<PersonalInfo | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/personal-info').then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setMsg('');
    const res = await fetch('/api/personal-info', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMsg('Saved successfully!');
    else setMsg('Error saving.');
    setSaving(false);
  };

  if (!data) return <div className="p-8 text-gray-400">Loading…</div>;

  const set = (field: keyof PersonalInfo, value: string) =>
    setData((prev) => prev ? { ...prev, [field]: value } : prev);

  const setEmail = (idx: number, value: string) =>
    setData((prev) => {
      if (!prev) return prev;
      const emails = [...prev.email];
      emails[idx] = value;
      return { ...prev, email: emails };
    });

  const addEmail = () => setData((prev) => prev ? { ...prev, email: [...prev.email, ''] } : prev);
  const removeEmail = (idx: number) =>
    setData((prev) => prev ? { ...prev, email: prev.email.filter((_, i) => i !== idx) } : prev);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-500 mt-1">Manage content displayed on the Contact page</p>
      </div>

      <div className="space-y-6">
        {/* Identity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-cyan-600" />
            <h2 className="font-semibold text-gray-900">Identity</h2>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={data.name}
                onChange={(e) => set('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={data.designation}
                onChange={(e) => set('designation', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={data.institution}
                onChange={(e) => set('institution', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={data.qualification}
                onChange={(e) => set('qualification', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-cyan-600" />
              <h2 className="font-semibold text-gray-900">Email Addresses</h2>
            </div>
            <button
              onClick={addEmail}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              + Add
            </button>
          </div>
          <div className="space-y-2">
            {data.email.map((email, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={email}
                  onChange={(e) => setEmail(i, e.target.value)}
                  placeholder="email@example.com"
                />
                {data.email.length > 1 && (
                  <button
                    onClick={() => removeEmail(i)}
                    className="text-red-400 hover:text-red-600 text-sm px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon size={18} className="text-cyan-600" />
            <h2 className="font-semibold text-gray-900">Profile Image URL</h2>
          </div>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={data.profileImage}
            onChange={(e) => set('profileImage', e.target.value)}
            placeholder="https://..."
          />
          {data.profileImage && (
            <div className="mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.profileImage} alt="Profile preview" className="w-20 h-20 rounded-full object-cover border-2 border-cyan-200" />
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-cyan-600" />
            <h2 className="font-semibold text-gray-900">Professional Summary</h2>
          </div>
          <textarea
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={data.summary}
            onChange={(e) => set('summary', e.target.value)}
          />
        </div>

        {/* Professional Philosophy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Professional Philosophy / Personal Statement</h2>
          <textarea
            rows={5}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={data.professionalPhilosophy}
            onChange={(e) => set('professionalPhilosophy', e.target.value)}
          />
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Save size={16} />
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          {msg && (
            <span className={`text-sm font-medium ${msg.startsWith('Saved') ? 'text-green-600' : 'text-red-500'}`}>
              {msg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
