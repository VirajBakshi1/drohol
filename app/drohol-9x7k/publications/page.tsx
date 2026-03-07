'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

interface Publication {
  _id?: string;
  title: string;
  authors: string;
  year: string;
  type: 'book' | 'bookChapter' | 'internationalJournal' | 'nationalJournal' | 'internationalConference' | 'nationalConference';
  journal?: string;
  conference?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  indexing?: string;
  award?: string;
  location?: string;
  date?: string;
  publisher?: string;
  edition?: string;
  chapter?: string;
  order?: number;
}

const empty: Publication = { title: '', authors: '', year: '', type: 'internationalJournal' };

const typeLabels: Record<Publication['type'], string> = {
  book: 'Books',
  bookChapter: 'Book Chapters',
  internationalJournal: 'International Journals',
  nationalJournal: 'National Journals',
  internationalConference: 'International Conferences',
  nationalConference: 'National Conferences',
};

const types = Object.keys(typeLabels) as Publication['type'][];

export default function PublicationsAdmin() {
  const [all, setAll] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<Publication['type']>('internationalJournal');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<Publication>(empty);
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await fetch('/api/publications').then((r) => r.json());
    setAll(data);
  }

  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  function openAdd() { setForm({ ...empty, type: activeType }); setModal(true); }
  function openEdit(p: Publication) { setForm(p); setModal(true); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!form._id;
    await fetch(isEdit ? `/api/publications/${form._id}` : '/api/publications', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setModal(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this publication?')) return;
    await fetch(`/api/publications/${id}`, { method: 'DELETE' });
    load();
  }

  function set(field: keyof Publication, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const list = all.filter((p) => p.type === activeType);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Publications</h1>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
          <Plus size={16} /> Add Publication
        </button>
      </div>

      {/* Type Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeType === t ? 'bg-cyan-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {typeLabels[t]} ({all.filter((p) => p.type === t).length})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {list.map((pub) => (
              <div key={pub._id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{pub.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{pub.authors} · {pub.year}</p>
                  {(pub.journal || pub.conference || pub.publisher) && (
                    <p className="text-xs text-gray-600 mt-0.5">{pub.journal ?? pub.conference ?? pub.publisher}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(pub)} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(pub._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {list.length === 0 && <p className="px-6 py-8 text-sm text-gray-400 text-center">No {typeLabels[activeType]} yet. Click "Add Publication" to add one.</p>}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="font-semibold text-gray-900">{form._id ? 'Edit' : 'Add'} Publication</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.type} onChange={(e) => set('type', e.target.value)}>
                  {types.map((t) => <option key={t} value={t}>{typeLabels[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <textarea required rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Authors</label>
                <input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.authors} onChange={(e) => set('authors', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.year} onChange={(e) => set('year', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Volume / Pages</label>
                  <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="e.g. Vol.12, pp.1-10" value={`${form.volume ?? ''} ${form.pages ?? ''}`.trim()} onChange={(e) => {
                    const [vol, ...rest] = e.target.value.split(',');
                    set('volume', vol.trim());
                    if (rest.length) set('pages', rest.join(',').trim());
                  }} />
                </div>
              </div>
              {(form.type === 'book' || form.type === 'bookChapter') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.publisher ?? ''} onChange={(e) => set('publisher', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Edition</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.edition ?? ''} onChange={(e) => set('edition', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.chapter ?? ''} onChange={(e) => set('chapter', e.target.value)} />
                    </div>
                  </div>
                </>
              )}
              {(form.type === 'internationalJournal' || form.type === 'nationalJournal') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Journal Name</label>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.journal ?? ''} onChange={(e) => set('journal', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.doi ?? ''} onChange={(e) => set('doi', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Indexing (e.g. SCI, Scopus)</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.indexing ?? ''} onChange={(e) => set('indexing', e.target.value)} />
                    </div>
                  </div>
                </>
              )}
              {(form.type === 'internationalConference' || form.type === 'nationalConference') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conference Name</label>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.conference ?? ''} onChange={(e) => set('conference', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.location ?? ''} onChange={(e) => set('location', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.date ?? ''} onChange={(e) => set('date', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Best Paper Award (if any)</label>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.award ?? ''} onChange={(e) => set('award', e.target.value)} />
                  </div>
                </>
              )}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
