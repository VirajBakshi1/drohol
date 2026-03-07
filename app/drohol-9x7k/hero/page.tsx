'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil, Trash2, Plus, X, GripVertical, Eye, EyeOff } from 'lucide-react';

interface HeroSlide {
  _id?: string;
  url: string;
  type: 'image' | 'video';
  alt: string;
  active: boolean;
  order: number;
}

const empty: HeroSlide = { url: '', type: 'image', alt: '', active: true, order: 0 };

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<HeroSlide>(empty);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState('');

  async function load() {
    const data = await fetch('/api/hero-slides').then((r) => r.json());
    setSlides(data);
  }

  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  function openAdd() {
    setForm({ ...empty, order: slides.length });
    setPreview('');
    setModal(true);
  }

  function openEdit(s: HeroSlide) {
    setForm(s);
    setPreview(s.url);
    setModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!form._id;
    await fetch(isEdit ? `/api/hero-slides/${form._id}` : '/api/hero-slides', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setModal(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this slide?')) return;
    await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' });
    load();
  }

  async function toggleActive(s: HeroSlide) {
    await fetch(`/api/hero-slides/${s._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !s.active }),
    });
    load();
  }

  function set(field: keyof HeroSlide, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Slides</h1>
          <p className="text-sm text-gray-500 mt-1">Images/videos shown in the background carousel on the homepage.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700">
          <Plus size={16} /> Add Slide
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((slide) => (
            <div key={slide._id} className={`bg-white rounded-xl border overflow-hidden ${slide.active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
              <div className="relative h-40 bg-gray-100">
                {slide.type === 'image' ? (
                  <Image src={slide.url} alt={slide.alt || 'Slide'} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    🎬 Video Slide
                    <br />
                    <span className="text-xs truncate px-2">{slide.url}</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded">#{slide.order + 1}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${slide.active ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'}`}>
                    {slide.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate mb-3">{slide.url}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(slide)} className="p-1.5 text-gray-400 hover:text-cyan-600" title={slide.active ? 'Hide slide' : 'Show slide'}>
                    {slide.active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => openEdit(slide)} className="p-1.5 text-gray-400 hover:text-cyan-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(slide._id!)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                  <GripVertical size={16} className="ml-auto text-gray-300" title="Drag to reorder (use Order field)" />
                </div>
              </div>
            </div>
          ))}
          {slides.length === 0 && (
            <p className="col-span-3 text-sm text-gray-400 text-center py-12">No slides yet. Click &ldquo;Add Slide&rdquo; to add one.</p>
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="font-semibold text-gray-900">{form._id ? 'Edit' : 'Add'} Slide</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.type} onChange={(e) => set('type', e.target.value)}>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {form.type === 'image' ? 'Image URL' : 'Video URL (mp4 / webm)'}
                </label>
                <input
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder={form.type === 'image' ? 'https://images.unsplash.com/…' : 'https://example.com/video.mp4'}
                  value={form.url}
                  onChange={(e) => { set('url', e.target.value); setPreview(e.target.value); }}
                />
              </div>
              {preview && form.type === 'image' && (
                <div className="relative h-40 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={preview} alt="Preview" fill className="object-cover" unoptimized onError={() => setPreview('')} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt text (optional)</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.alt} onChange={(e) => set('alt', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" min={0} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" checked={form.active} onChange={(e) => set('active', e.target.checked)} />
                    <span className="text-sm font-medium text-gray-700">Active (show in carousel)</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
