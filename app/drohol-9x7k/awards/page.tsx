'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

interface Award {
  _id?: string;
  title: string;
  year: string;
  organization: string;
  description: string;
  category: 'international' | 'national' | 'institute';
  order: number;
}

const empty: Award = { title: '', year: '', organization: '', description: '', category: 'national', order: 0 };

export default function AwardsAdmin() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<Award>(empty);
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await fetch('/api/awards').then((r) => r.json());
    setAwards(data);
  }

  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  function openAdd() { setForm(empty); setModal(true); }
  function openEdit(a: Award) { setForm(a); setModal(true); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!form._id;
    await fetch(isEdit ? `/api/awards/${form._id}` : '/api/awards', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setModal(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this award?')) return;
    await fetch(`/api/awards/${id}`, { method: 'DELETE' });
    load();
  }

  function set(field: keyof Award, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const grouped = {
    international: awards.filter((a) => a.category === 'international'),
    national: awards.filter((a) => a.category === 'national'),
    institute: awards.filter((a) => a.category === 'institute'),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Awards</h1>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
          <Plus size={16} /> Add Award
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="space-y-8">
          {(['international', 'national', 'institute'] as const).map((cat) => (
            <div key={cat} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 capitalize">{cat} Awards ({grouped[cat].length})</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {grouped[cat].map((award) => (
                  <div key={award._id} className="px-6 py-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{award.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{award.organization} · {award.year}</p>
                      {award.description && <p className="text-xs text-gray-600 mt-1">{award.description}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openEdit(award)} className="p-1.5 text-gray-400 hover:text-cyan-600">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(award._id!)} className="p-1.5 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {grouped[cat].length === 0 && <p className="px-6 py-4 text-sm text-gray-400">No {cat} awards yet.</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-semibold text-gray-900">{form._id ? 'Edit Award' : 'Add Award'}</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.year} onChange={(e) => set('year', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.category} onChange={(e) => set('category', e.target.value)}>
                    <option value="international">International</option>
                    <option value="national">National</option>
                    <option value="institute">Institute</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.organization} onChange={(e) => set('organization', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.description} onChange={(e) => set('description', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
