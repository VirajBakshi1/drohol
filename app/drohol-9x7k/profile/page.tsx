'use client';

import { useEffect, useState } from 'react';

interface Stats {
  phdCompleted: number;
  phdOngoing: number;
  mtechCompleted: number;
  btechCompleted: string;
  publications: number;
  projects: number;
  experience: string;
}

interface PersonalInfo {
  _id?: string;
  name: string;
  designation: string;
  institution: string;
  email: string[];
  qualification: string;
  summary: string;
  profileImage: string;
  stats: Stats;
  currentPortfolios: string[];
  industryCoalitions: string[];
  professionalPhilosophy: string;
  researchInterests: string[];
}

const empty: PersonalInfo = {
  name: '', designation: '', institution: '', email: [], qualification: '', summary: '',
  profileImage: '', professionalPhilosophy: '',
  stats: { phdCompleted: 0, phdOngoing: 0, mtechCompleted: 0, btechCompleted: '200+', publications: 0, projects: 0, experience: '27+' },
  currentPortfolios: [], industryCoalitions: [], researchInterests: [],
};

function ArrayField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState(value.join('\n'));
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-gray-400">(one per line)</span></label>
      <textarea
        rows={4}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        value={draft}
        onChange={(e) => { setDraft(e.target.value); onChange(e.target.value.split('\n').filter(Boolean)); }}
      />
    </div>
  );
}

export default function ProfileAdmin() {
  const [data, setData] = useState<PersonalInfo>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/personal-info')
      .then((r) => r.json())
      .then((d) => setData({ ...empty, ...d }))
      .finally(() => setLoading(false));
  }, []);

  function set(field: keyof PersonalInfo, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function setStat(field: keyof Stats, value: string | number) {
    setData((prev) => ({ ...prev, stats: { ...prev.stats, [field]: value } }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await fetch('/api/personal-info', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      setMsg('Saved successfully!');
    } catch {
      setMsg('Error saving.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        {msg && <span className={`text-sm ${msg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{msg}</span>}
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Basic Information</h2>
          {(['name', 'designation', 'institution', 'qualification', 'profileImage'] as const).map((f) => (
            <div key={f}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{f.replace(/([A-Z])/g, ' $1')}</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={data[f] as string} onChange={(e) => set(f, e.target.value)} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={data.summary} onChange={(e) => set('summary', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Philosophy</label>
            <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={data.professionalPhilosophy} onChange={(e) => set('professionalPhilosophy', e.target.value)} />
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(Object.keys(data.stats) as (keyof Stats)[]).map((k) => (
              <div key={k}>
                <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">{k.replace(/([A-Z])/g, ' $1')}</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={data.stats[k]} onChange={(e) => setStat(k, e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrays */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Lists</h2>
          <ArrayField label="Email Addresses" value={data.email} onChange={(v) => set('email', v)} />
          <ArrayField label="Current Portfolios" value={data.currentPortfolios} onChange={(v) => set('currentPortfolios', v)} />
          <ArrayField label="Industry Coalitions" value={data.industryCoalitions} onChange={(v) => set('industryCoalitions', v)} />
          <ArrayField label="Research Interests" value={data.researchInterests} onChange={(v) => set('researchInterests', v)} />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
