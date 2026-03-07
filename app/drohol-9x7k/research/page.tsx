'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type Tab = 'projects' | 'phd' | 'patents';

interface ResearchProject { _id?: string; title: string; fundingAgency: string; amount: string; startDate: string; endDate?: string; status: 'Completed' | 'Ongoing'; location?: string; }
interface PhDStudent { _id?: string; title: string; scholar: string; university: string; awardDate?: string; fellowship?: string; status: 'Completed' | 'In Progress'; }
interface Patent { _id?: string; title: string; applicationNumber: string; applicationDate: string; number?: string; letterNumber?: string; grantDate?: string; status: 'Awarded' | 'Filed'; }

const emptyProject: ResearchProject = { title: '', fundingAgency: '', amount: '', startDate: '', status: 'Completed' };
const emptyPhd: PhDStudent = { title: '', scholar: '', university: '', status: 'In Progress' };
const emptyPatent: Patent = { title: '', applicationNumber: '', applicationDate: '', status: 'Filed' };

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export default function ResearchAdmin() {
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [phd, setPhd] = useState<PhDStudent[]>([]);
  const [patents, setPatents] = useState<Patent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [formP, setFormP] = useState<ResearchProject>(emptyProject);
  const [formPhd, setFormPhd] = useState<PhDStudent>(emptyPhd);
  const [formPat, setFormPat] = useState<Patent>(emptyPatent);
  const [saving, setSaving] = useState(false);

  async function load() {
    const [p, d, t] = await Promise.all([
      fetch('/api/research/projects').then((r) => r.json()),
      fetch('/api/research/phd').then((r) => r.json()),
      fetch('/api/research/patents').then((r) => r.json()),
    ]);
    setProjects(p); setPhd(d); setPatents(t);
  }
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  function openAdd() {
    if (tab === 'projects') setFormP(emptyProject);
    if (tab === 'phd') setFormPhd(emptyPhd);
    if (tab === 'patents') setFormPat(emptyPatent);
    setModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const routes: Record<Tab, string> = { projects: '/api/research/projects', phd: '/api/research/phd', patents: '/api/research/patents' };
    const form = tab === 'projects' ? formP : tab === 'phd' ? formPhd : formPat;
    const isEdit = !!form._id;
    await fetch(isEdit ? `${routes[tab]}/${form._id}` : routes[tab], {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setModal(false);
    load();
  }

  async function handleDelete(route: string, id: string, label: string) {
    if (!confirm(`Delete this ${label}?`)) return;
    await fetch(`${route}/${id}`, { method: 'DELETE' });
    load();
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'projects', label: 'Projects', count: projects.length },
    { key: 'phd', label: 'PhD Students', count: phd.length },
    { key: 'patents', label: 'Patents', count: patents.length },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Research</h1>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map(({ key, label, count }) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === key ? 'bg-cyan-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {label} ({count})
          </button>
        ))}
      </div>

      {loading ? <p className="text-gray-500">Loading…</p> : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {tab === 'projects' && projects.map((p) => (
              <div key={p._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{p.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{p.fundingAgency} · {p.amount}</p>
                  <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${p.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{p.status}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFormP(p); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete('/api/research/projects', p._id!, 'project')} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {tab === 'phd' && phd.map((d) => (
              <div key={d._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{d.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Scholar: {d.scholar} · {d.university}</p>
                  <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${d.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{d.status}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFormPhd(d); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete('/api/research/phd', d._id!, 'PhD student')} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {tab === 'patents' && patents.map((t) => (
              <div key={t._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{t.title}</p>
                  <p className="text-xs text-gray-500 mt-1">App No: {t.applicationNumber} · {t.applicationDate}</p>
                  <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${t.status === 'Awarded' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>{t.status}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFormPat(t); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete('/api/research/patents', t._id!, 'patent')} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {((tab === 'projects' && projects.length === 0) || (tab === 'phd' && phd.length === 0) || (tab === 'patents' && patents.length === 0)) && (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">No items yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="font-semibold text-gray-900">{tab === 'projects' ? 'Research Project' : tab === 'phd' ? 'PhD Student' : 'Patent'}</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {tab === 'projects' && (
                <>
                  <Field label="Title" value={formP.title} onChange={(v) => setFormP((p) => ({ ...p, title: v }))} textarea />
                  <Field label="Funding Agency" value={formP.fundingAgency} onChange={(v) => setFormP((p) => ({ ...p, fundingAgency: v }))} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Amount" value={formP.amount} onChange={(v) => setFormP((p) => ({ ...p, amount: v }))} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formP.status} onChange={(e) => setFormP((p) => ({ ...p, status: e.target.value as 'Completed' | 'Ongoing' }))}>
                        <option value="Completed">Completed</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Start Date" value={formP.startDate} onChange={(v) => setFormP((p) => ({ ...p, startDate: v }))} />
                    <Field label="End Date" value={formP.endDate ?? ''} onChange={(v) => setFormP((p) => ({ ...p, endDate: v }))} />
                  </div>
                  <Field label="Location (if abroad)" value={formP.location ?? ''} onChange={(v) => setFormP((p) => ({ ...p, location: v }))} />
                </>
              )}
              {tab === 'phd' && (
                <>
                  <Field label="Thesis Title" value={formPhd.title} onChange={(v) => setFormPhd((p) => ({ ...p, title: v }))} textarea />
                  <Field label="Scholar Name" value={formPhd.scholar} onChange={(v) => setFormPhd((p) => ({ ...p, scholar: v }))} />
                  <Field label="University" value={formPhd.university} onChange={(v) => setFormPhd((p) => ({ ...p, university: v }))} />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formPhd.status} onChange={(e) => setFormPhd((p) => ({ ...p, status: e.target.value as 'Completed' | 'In Progress' }))}>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </div>
                    <Field label="Award Date" value={formPhd.awardDate ?? ''} onChange={(v) => setFormPhd((p) => ({ ...p, awardDate: v }))} />
                  </div>
                  <Field label="Fellowship (if any)" value={formPhd.fellowship ?? ''} onChange={(v) => setFormPhd((p) => ({ ...p, fellowship: v }))} />
                </>
              )}
              {tab === 'patents' && (
                <>
                  <Field label="Title" value={formPat.title} onChange={(v) => setFormPat((p) => ({ ...p, title: v }))} textarea />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Application Number" value={formPat.applicationNumber} onChange={(v) => setFormPat((p) => ({ ...p, applicationNumber: v }))} />
                    <Field label="Application Date" value={formPat.applicationDate} onChange={(v) => setFormPat((p) => ({ ...p, applicationDate: v }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formPat.status} onChange={(e) => setFormPat((p) => ({ ...p, status: e.target.value as 'Awarded' | 'Filed' }))}>
                      <option value="Filed">Filed</option>
                      <option value="Awarded">Awarded</option>
                    </select>
                  </div>
                  {formPat.status === 'Awarded' && (
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Patent Number" value={formPat.number ?? ''} onChange={(v) => setFormPat((p) => ({ ...p, number: v }))} />
                      <Field label="Grant Date" value={formPat.grantDate ?? ''} onChange={(v) => setFormPat((p) => ({ ...p, grantDate: v }))} />
                    </div>
                  )}
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
