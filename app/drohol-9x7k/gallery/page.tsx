'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Eye, EyeOff, Images, Video, X, Loader2, Play } from 'lucide-react';

interface GalleryImageData {
  _id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  active: boolean;
  order: number;
}

interface GalleryVideoData {
  _id: string;
  url: string;
  title: string;
  description: string;
  active: boolean;
  order: number;
}

const EMPTY_IMAGE: Omit<GalleryImageData, '_id'> = { url: '', title: '', description: '', category: 'general', active: true, order: 0 };
const EMPTY_VIDEO: Omit<GalleryVideoData, '_id'> = { url: '', title: '', description: '', active: true, order: 0 };

function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return null;
}

export default function AdminGalleryPage() {
  const [tab, setTab] = useState<'images' | 'videos'>('images');

  // ── Images state ──────────────────────────────────────────
  const [images, setImages] = useState<GalleryImageData[]>([]);
  const [imgLoading, setImgLoading] = useState(true);
  const [imgModal, setImgModal] = useState(false);
  const [imgEditing, setImgEditing] = useState<GalleryImageData | null>(null);
  const [imgForm, setImgForm] = useState<Omit<GalleryImageData, '_id'>>(EMPTY_IMAGE);
  const [imgSaving, setImgSaving] = useState(false);

  // ── Videos state ──────────────────────────────────────────
  const [videos, setVideos] = useState<GalleryVideoData[]>([]);
  const [vidLoading, setVidLoading] = useState(true);
  const [vidModal, setVidModal] = useState(false);
  const [vidEditing, setVidEditing] = useState<GalleryVideoData | null>(null);
  const [vidForm, setVidForm] = useState<Omit<GalleryVideoData, '_id'>>(EMPTY_VIDEO);
  const [vidSaving, setVidSaving] = useState(false);

  // ── Fetch ──────────────────────────────────────────────────
  const fetchImages = async () => {
    setImgLoading(true);
    const data = await fetch('/api/gallery/images').then((r) => r.json());
    setImages(Array.isArray(data) ? data : []);
    setImgLoading(false);
  };
  const fetchVideos = async () => {
    setVidLoading(true);
    const data = await fetch('/api/gallery/videos').then((r) => r.json());
    setVideos(Array.isArray(data) ? data : []);
    setVidLoading(false);
  };

  useEffect(() => { fetchImages(); fetchVideos(); }, []);

  // ── Image CRUD ─────────────────────────────────────────────
  const openAddImage = () => { setImgEditing(null); setImgForm(EMPTY_IMAGE); setImgModal(true); };
  const openEditImage = (img: GalleryImageData) => { setImgEditing(img); setImgForm({ url: img.url, title: img.title, description: img.description, category: img.category, active: img.active, order: img.order }); setImgModal(true); };

  const saveImage = async () => {
    setImgSaving(true);
    if (imgEditing) {
      await fetch(`/api/gallery/images/${imgEditing._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(imgForm) });
    } else {
      await fetch('/api/gallery/images', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(imgForm) });
    }
    setImgSaving(false);
    setImgModal(false);
    fetchImages();
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/gallery/images/${id}`, { method: 'DELETE' });
    fetchImages();
  };

  const toggleImage = async (img: GalleryImageData) => {
    await fetch(`/api/gallery/images/${img._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !img.active }) });
    fetchImages();
  };

  // ── Video CRUD ─────────────────────────────────────────────
  const openAddVideo = () => { setVidEditing(null); setVidForm(EMPTY_VIDEO); setVidModal(true); };
  const openEditVideo = (vid: GalleryVideoData) => { setVidEditing(vid); setVidForm({ url: vid.url, title: vid.title, description: vid.description, active: vid.active, order: vid.order }); setVidModal(true); };

  const saveVideo = async () => {
    setVidSaving(true);
    if (vidEditing) {
      await fetch(`/api/gallery/videos/${vidEditing._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vidForm) });
    } else {
      await fetch('/api/gallery/videos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vidForm) });
    }
    setVidSaving(false);
    setVidModal(false);
    fetchVideos();
  };

  const deleteVideo = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    await fetch(`/api/gallery/videos/${id}`, { method: 'DELETE' });
    fetchVideos();
  };

  const toggleVideo = async (vid: GalleryVideoData) => {
    await fetch(`/api/gallery/videos/${vid._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !vid.active }) });
    fetchVideos();
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">Manage photos and videos displayed on the gallery page</p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setTab('images')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === 'images' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Images size={16} /> Photos
          <span className="ml-1 bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">{images.length}</span>
        </button>
        <button
          onClick={() => setTab('videos')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === 'videos' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Video size={16} /> Videos
          <span className="ml-1 bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">{videos.length}</span>
        </button>
      </div>

      {/* ─── IMAGES TAB ─────────────────────────────── */}
      {tab === 'images' && (
        <>
          <div className="flex justify-end mb-4">
            <button onClick={openAddImage} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus size={16} /> Add Photo
            </button>
          </div>

          {imgLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-400" size={28} /></div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No photos yet. Click &quot;Add Photo&quot; to start.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <motion.div key={img._id} layout className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-square">
                    <Image src={img.url} alt={img.title || 'Gallery'} fill className="object-cover" unoptimized />
                    {!img.active && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">Hidden</span></div>}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 truncate">{img.title || <span className="text-gray-400 italic">No title</span>}</p>
                    {img.category && <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full capitalize">{img.category}</span>}
                  </div>
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => toggleImage(img)} title={img.active ? 'Hide' : 'Show'} className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors">
                      {img.active ? <Eye size={13} className="text-gray-600" /> : <EyeOff size={13} className="text-gray-600" />}
                    </button>
                    <button onClick={() => openEditImage(img)} className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors">
                      <Pencil size={13} className="text-gray-600" />
                    </button>
                    <button onClick={() => deleteImage(img._id)} className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-red-50 transition-colors">
                      <Trash2 size={13} className="text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ─── VIDEOS TAB ─────────────────────────────── */}
      {tab === 'videos' && (
        <>
          <div className="flex justify-end mb-4">
            <button onClick={openAddVideo} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus size={16} /> Add Video
            </button>
          </div>

          {vidLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-400" size={28} /></div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No videos yet. Click &quot;Add Video&quot; to start.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {videos.map((vid) => {
                const thumb = getYoutubeThumbnail(vid.url);
                return (
                  <div key={vid._id} className="flex gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                    {/* Thumbnail */}
                    <div className="w-36 flex-shrink-0 relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      {thumb ? (
                        <Image src={thumb} alt={vid.title} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-50 to-slate-100">
                          <Play size={24} className="text-cyan-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{vid.title}</h3>
                          {vid.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{vid.description}</p>}
                          <p className="text-cyan-600 text-xs mt-2 truncate max-w-xs">{vid.url}</p>
                        </div>
                        {!vid.active && <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full flex-shrink-0">Hidden</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <button onClick={() => toggleVideo(vid)} title={vid.active ? 'Hide' : 'Show'} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        {vid.active ? <Eye size={14} className="text-gray-500" /> : <EyeOff size={14} className="text-gray-500" />}
                      </button>
                      <button onClick={() => openEditVideo(vid)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Pencil size={14} className="text-gray-500" />
                      </button>
                      <button onClick={() => deleteVideo(vid._id)} className="w-8 h-8 rounded-lg border border-red-100 flex items-center justify-center hover:bg-red-50 transition-colors">
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ─── IMAGE MODAL ────────────────────────────── */}
      <AnimatePresence>
        {imgModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{imgEditing ? 'Edit Photo' : 'Add Photo'}</h2>
                <button onClick={() => setImgModal(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"><X size={18} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-red-500">*</span></label>
                  <input value={imgForm.url} onChange={(e) => setImgForm({ ...imgForm, url: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                  {imgForm.url && (
                    <div className="mt-2 relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <Image src={imgForm.url} alt="Preview" fill className="object-cover" unoptimized onError={() => {}} />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input value={imgForm.title} onChange={(e) => setImgForm({ ...imgForm, title: e.target.value })} placeholder="Photo title" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={imgForm.description} onChange={(e) => setImgForm({ ...imgForm, description: e.target.value })} rows={3} placeholder="Short description..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input value={imgForm.category} onChange={(e) => setImgForm({ ...imgForm, category: e.target.value })} placeholder="e.g. conference, lab" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input type="number" value={imgForm.order} onChange={(e) => setImgForm({ ...imgForm, order: parseInt(e.target.value) || 0 })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={imgForm.active} onChange={(e) => setImgForm({ ...imgForm, active: e.target.checked })} className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                  <span className="text-sm text-gray-700">Show on public gallery</span>
                </label>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-100">
                <button onClick={() => setImgModal(false)} className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={saveImage} disabled={!imgForm.url || imgSaving} className="flex-1 bg-cyan-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                  {imgSaving && <Loader2 size={14} className="animate-spin" />}
                  {imgEditing ? 'Save Changes' : 'Add Photo'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── VIDEO MODAL ────────────────────────────── */}
      <AnimatePresence>
        {vidModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{vidEditing ? 'Edit Video' : 'Add Video'}</h2>
                <button onClick={() => setVidModal(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"><X size={18} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video URL <span className="text-red-500">*</span></label>
                  <input value={vidForm.url} onChange={(e) => setVidForm({ ...vidForm, url: e.target.value })} placeholder="https://youtu.be/... or https://vimeo.com/..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                  <p className="text-xs text-gray-400 mt-1">Supports YouTube, Vimeo, and direct embed URLs</p>
                  {vidForm.url && getEmbedUrl(vidForm.url) !== vidForm.url && (
                    <div className="mt-2 relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <iframe src={getEmbedUrl(vidForm.url)} className="absolute inset-0 w-full h-full" allowFullScreen />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                  <input value={vidForm.title} onChange={(e) => setVidForm({ ...vidForm, title: e.target.value })} placeholder="Video title" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={vidForm.description} onChange={(e) => setVidForm({ ...vidForm, description: e.target.value })} rows={3} placeholder="What is this video about?" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" value={vidForm.order} onChange={(e) => setVidForm({ ...vidForm, order: parseInt(e.target.value) || 0 })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={vidForm.active} onChange={(e) => setVidForm({ ...vidForm, active: e.target.checked })} className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                  <span className="text-sm text-gray-700">Show on public gallery</span>
                </label>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-100">
                <button onClick={() => setVidModal(false)} className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={saveVideo} disabled={!vidForm.url || !vidForm.title || vidSaving} className="flex-1 bg-cyan-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                  {vidSaving && <Loader2 size={14} className="animate-spin" />}
                  {vidEditing ? 'Save Changes' : 'Add Video'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
