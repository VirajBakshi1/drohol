'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type Tab = 'projects' | 'achievements' | 'competitions';

interface StudentProject { _id?: string; title: string; student: string; year: string; degree: string; type?: string; }
interface Achievement { _id?: string; achievement: string; students: string; year: string; prize: string; }
interface Competition { _id?: string; competition: string; years: string; role: string; location?: string; achievements?: string[]; }

const emptyProj: StudentProject = { title: '', student: '', year: '', degree: 'MTech' };
const emptyAch: Achievement = { achievement: '', students: '', year: '', prize: '' };
const emptyComp: Competition = { competition: '', years: '', role: '', achievements: [] };

export default function StudentsAdmin() {
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [formProj, setFormProj] = useState<StudentProject>(emptyProj);
  const [formAch, setFormAch] = useState<Achievement>(emptyAch);
  const [formComp, setFormComp] = useState<Competition>(emptyComp);
  const [saving, setSaving] = useState(false);

  async function load() {
    const [p, a, c] = await Promise.all([
      fetch('/api/students/projects').then((r) => r.json()),
      fetch('/api/students/achievements').then((r) => r.json()),
      fetch('/api/students/competitions').then((r) => r.json()),
    ]);
    setProjects(p); setAchievements(a); setCompetitions(c);
  }
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  function openAdd() {
    if (tab === 'projects') setFormProj(emptyProj);
    if (tab === 'achievements') setFormAch(emptyAch);
    if (tab === 'competitions') setFormComp(emptyComp);
    setModal(true);
  }

  const routes: Record<Tab, string> = { projects: '/api/students/projects', achievements: '/api/students/achievements', competitions: '/api/students/competitions' };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const form = tab === 'projects' ? formProj : tab === 'achievements' ? formAch : formComp;
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students & Guidance</h1>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700"><Plus size={16} /> Add</button>
      </div>

      <div className="flex gap-2 mb-6">
        {([['projects', 'Projects', projects.length], ['achievements', 'Achievements', achievements.length], ['competitions', 'Competitions', competitions.length]] as const).map(([k, l, c]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === k ? 'bg-cyan-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{l} ({c})</button>
        ))}
      </div>

      {loading ? <p className="text-gray-500">Loading…</p> : (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="divide-y divide-gray-50">
            {tab === 'projects' && projects.map((p) => (
              <div key={p._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{p.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{p.student} · {p.degree} · {p.year}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFormProj(p); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => del(routes.projects, p._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {tab === 'achievements' && achievements.map((a) => (
              <div key={a._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{a.achievement}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.students} · {a.year}</p>
                  {a.prize && <p className="text-xs text-amber-600 mt-0.5">{a.prize}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFormAch(a); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => del(routes.achievements, a._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {tab === 'competitions' && competitions.map((c) => (
              <div key={c._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{c.competition}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.years} · {c.role}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setFormComp(c); setModal(true); }} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => del(routes.competitions, c._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {((tab === 'projects' && !projects.length) || (tab === 'achievements' && !achievements.length) || (tab === 'competitions' && !competitions.length)) && (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">No items yet.</p>
            )}
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="font-semibold text-gray-900 capitalize">{tab === 'projects' ? 'Student Project' : tab === 'achievements' ? 'Achievement' : 'Competition'}</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {tab === 'projects' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label><textarea required rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formProj.title} onChange={(e) => setFormProj((p) => ({ ...p, title: e.target.value }))} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formProj.student} onChange={(e) => setFormProj((p) => ({ ...p, student: e.target.value }))} /></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Degree</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formProj.degree} onChange={(e) => setFormProj((p) => ({ ...p, degree: e.target.value }))} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Year</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formProj.year} onChange={(e) => setFormProj((p) => ({ ...p, year: e.target.value }))} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="e.g. Thesis" value={formProj.type ?? ''} onChange={(e) => setFormProj((p) => ({ ...p, type: e.target.value }))} /></div>
                  </div>
                </>
              )}
              {tab === 'achievements' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Achievement</label><textarea required rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formAch.achievement} onChange={(e) => setFormAch((a) => ({ ...a, achievement: e.target.value }))} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Students</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formAch.students} onChange={(e) => setFormAch((a) => ({ ...a, students: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Year</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formAch.year} onChange={(e) => setFormAch((a) => ({ ...a, year: e.target.value }))} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Prize / Rank</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formAch.prize} onChange={(e) => setFormAch((a) => ({ ...a, prize: e.target.value }))} /></div>
                  </div>
                </>
              )}
              {tab === 'competitions' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Competition Name</label><input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formComp.competition} onChange={(e) => setFormComp((c) => ({ ...c, competition: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Years</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formComp.years} onChange={(e) => setFormComp((c) => ({ ...c, years: e.target.value }))} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Role</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formComp.role} onChange={(e) => setFormComp((c) => ({ ...c, role: e.target.value }))} /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={formComp.location ?? ''} onChange={(e) => setFormComp((c) => ({ ...c, location: e.target.value }))} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Achievements <span className="text-gray-400">(one per line)</span></label><textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={(formComp.achievements ?? []).join('\n')} onChange={(e) => setFormComp((c) => ({ ...c, achievements: e.target.value.split('\n').filter(Boolean) }))} /></div>
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
