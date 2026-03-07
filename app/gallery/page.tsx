'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface GalleryImageData {
  _id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

interface GalleryVideoData {
  _id: string;
  url: string;
  title: string;
  description: string;
  order: number;
}

function getEmbedUrl(url: string): string {
  // YouTube: watch?v= or youtu.be/
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  // Return as-is for other embed-compatible URLs
  return url;
}

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  return null;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImageData[]>([]);
  const [videos, setVideos] = useState<GalleryVideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/gallery/images').then((r) => r.json()),
      fetch('/api/gallery/videos').then((r) => r.json()),
    ]).then(([imgs, vids]) => {
      setImages(Array.isArray(imgs) ? imgs : []);
      setVideos(Array.isArray(vids) ? vids : []);
      setLoading(false);
    });
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightboxIndex(null); setPlayingVideo(null); }
      if (e.key === 'ArrowRight' && lightboxIndex !== null) setLightboxIndex((p) => Math.min((p ?? 0) + 1, filteredImages.length - 1));
      if (e.key === 'ArrowLeft' && lightboxIndex !== null) setLightboxIndex((p) => Math.max((p ?? 0) - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  const categories = ['all', ...Array.from(new Set(images.map((i) => i.category).filter(Boolean)))];
  const filteredImages = activeCategory === 'all' ? images : images.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-50 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Photo &amp; Video <span className="text-cyan-600">Gallery</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Moments from research, conferences, and academic milestones
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Image Gallery ─────────────────────────── */}
      <section className="container mx-auto px-6 pb-20">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
            {/* Category filter pills */}
            <div className="flex gap-2 flex-wrap justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="break-inside-avoid rounded-2xl bg-gray-200 animate-pulse" style={{ height: `${200 + (i % 3) * 80}px` }} />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No images yet.</div>
        ) : (
          /* Masonry columns */
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="break-inside-avoid mb-4 group relative cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <Image
                    src={img.url}
                    alt={img.title || 'Gallery image'}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        {img.title && <p className="text-white font-semibold text-sm leading-tight">{img.title}</p>}
                        {img.description && <p className="text-gray-300 text-xs mt-1 line-clamp-2">{img.description}</p>}
                      </div>
                      <ZoomIn size={20} className="text-cyan-400 flex-shrink-0 ml-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ─── Video Gallery ─────────────────────────── */}
      {!loading && videos.length > 0 && (
        <section className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-6 py-20">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-gray-900 mb-10">Videos</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid, i) => {
                const thumb = getYoutubeThumbnail(vid.url);
                const isPlaying = playingVideo === vid._id;
                return (
                  <motion.div
                    key={vid._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    {/* Video embed area */}
                    <div className="relative aspect-video bg-black">
                      {isPlaying ? (
                        <iframe
                          src={getEmbedUrl(vid.url) + '&autoplay=1'}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      ) : (
                        <button
                          onClick={() => setPlayingVideo(vid._id)}
                          className="absolute inset-0 w-full h-full flex items-center justify-center"
                        >
                          {thumb ? (
                            <Image src={thumb} alt={vid.title} fill className="object-cover" unoptimized />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-slate-100" />
                          )}
                          <div className="relative z-10 w-16 h-16 rounded-full bg-cyan-500/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-cyan-500/40 group-hover:scale-110 transition-transform duration-300">
                            <Play size={24} fill="white" className="text-white ml-1" />
                          </div>
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                        </button>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-gray-900 font-semibold text-base leading-snug mb-2">{vid.title}</h3>
                      {vid.description && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{vid.description}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── Lightbox ───────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next */}
            {lightboxIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[85vh] mx-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex].url}
                alt={filteredImages[lightboxIndex].title || ''}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto object-contain rounded-xl"
                unoptimized
              />
              {(filteredImages[lightboxIndex].title || filteredImages[lightboxIndex].description) && (
                <div className="mt-4 text-center">
                  {filteredImages[lightboxIndex].title && (
                    <p className="text-white font-semibold text-lg">{filteredImages[lightboxIndex].title}</p>
                  )}
                  {filteredImages[lightboxIndex].description && (
                    <p className="text-gray-400 text-sm mt-1">{filteredImages[lightboxIndex].description}</p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
