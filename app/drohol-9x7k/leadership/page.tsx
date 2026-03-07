'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type Tab = 'memberships' | 'affiliations' | 'grants';

interface Membership { _id?: string; organization: string; role?: string; membershipId?: string; year?: string; }
interface Affiliation { _id?: string; role: string; organization: string; period?: string; }
interface Grant { _id?: string; source: string; amount: string; purpose: string; year: string; }

const emptyM: Membership = { organization: '' };
const emptyA: Affiliation = { role: '', organization: '' };
const emptyG: Grant = { source: '', amount: '', purpose: '', year: '' };

export default function LeadershipAdmin() {
  const [tab, setTab] = useState<Tab>('memberships');
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [fM, setFM] = useState<Membership>(emptyM);
  const [fA, setFA] = useState<Affiliation>(emptyA);
  const [fG, setFG] = useState<Grant>(emptyG);
  const [saving, setSaving] = useState(false);

  async function load() {
    const [m, a, g] = await Promise.all([
      fetch('/api/leadership/memberships').then((r) => r.json()),
      fetch('/api/leadership/affiliations').then((r) => r.json()),
      fetch('/api/leadership/grants').then((r) => r.json()),
    ]);
    setMemberships(m); setAffiliations(a); setGrants(g);
  }
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  function openAdd() {
    if (tab === 'memberships') setFM(emptyM);
    if (tab === 'affiliations') setFA(emptyA);
    if (tab === 'grants') setFG(emptyG);
    setModal(true);
  }

  const routes: Record<Tab, string> = { memberships: '/api/leadership/memberships', affiliations: '/api/leadership/affiliations', grants: '/api/leadership/grants' };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const form = tab === 'memberships' ? fM : tab === 'affiliations' ? fA : fG;
    const isEdit = !!form._id;
    await fetch(isEdit ? `${routes[tab]}/${form._id}` : routes[tab], {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false); setModal(false); load();
  }

  async function del(route: string, id: string) {
    if (!confirm('Delete?')) return;
    await fetch(`${route}/${id}`, { method: 'DELETE' });
    load();
  }

  const tabs = [
    { key: 'memberships' as Tab, label: 'Memberships', count: memberships.length },
    { key: 'affiliations' as Tab, label: 'Affiliations', count: affiliations.length },
    { key: 'grants' as Tab, label: 'Grants', count: grants.length },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leadership</h1>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700"><Plus size={16} /> Add</button>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map(({ key, label, count }) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === key ? 'bg-cyan-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{label} ({count})</button>
        ))}
      </div>

      {loading ? <p className="text-gray-500">Loading…</p> : (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="divide-y divide-gray-50">
            {tab === 'memberships' && memberships.map((m) => (
              <div key={m._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{m.organization}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{[m.role, m.membershipId, m.year].filter(Boolean).join(' · ')}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFM(m); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => del(routes.memberships, m._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {tab === 'affiliations' && affiliations.map((a) => (
              <div key={a._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{a.role}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.organization} {a.period && `· ${a.period}`}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFA(a); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => del(routes.affiliations, a._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {tab === 'grants' && grants.map((g) => (
              <div key={g._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{g.source}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{g.purpose} · {g.year}</p>
                  <p className="text-sm font-semibold text-green-600 mt-1">{g.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFG(g); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => del(routes.grants, g._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {((tab === 'memberships' && !memberships.length) || (tab === 'affiliations' && !affiliations.length) || (tab === 'grants' && !grants.length)) && (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">No items yet.</p>
            )}
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-semibold text-gray-900 capitalize">{tab === 'memberships' ? 'Membership' : tab === 'affiliations' ? 'Affiliation' : 'Grant'}</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {tab === 'memberships' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Organization</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fM.organization} onChange={(e) => setFM((m) => ({ ...m, organization: e.target.value }))} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Role / Designation</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fM.role ?? ''} onChange={(e) => setFM((m) => ({ ...m, role: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Membership ID</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fM.membershipId ?? ''} onChange={(e) => setFM((m) => ({ ...m, membershipId: e.target.value }))} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Year / Since</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fM.year ?? ''} onChange={(e) => setFM((m) => ({ ...m, year: e.target.value }))} /></div>
                  </div>
                </>
              )}
              {tab === 'affiliations' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Role</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fA.role} onChange={(e) => setFA((a) => ({ ...a, role: e.target.value }))} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Organization</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fA.organization} onChange={(e) => setFA((a) => ({ ...a, organization: e.target.value }))} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Period</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="e.g. 2020 – Present" value={fA.period ?? ''} onChange={(e) => setFA((a) => ({ ...a, period: e.target.value }))} /></div>
                </>
              )}
              {tab === 'grants' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Source / Organization</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fG.source} onChange={(e) => setFG((g) => ({ ...g, source: e.target.value }))} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label><textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fG.purpose} onChange={(e) => setFG((g) => ({ ...g, purpose: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fG.amount} onChange={(e) => setFG((g) => ({ ...g, amount: e.target.value }))} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Year</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={fG.year} onChange={(e) => setFG((g) => ({ ...g, year: e.target.value }))} /></div>
                  </div>
                </>
              )}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
