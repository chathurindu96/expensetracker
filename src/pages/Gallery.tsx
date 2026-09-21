import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Upload, X, Filter } from 'lucide-react';
import { galleryImages } from '../lib/mockData';

export function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'BILL' | 'SHOP' | 'RECEIPT'>('ALL');

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }
  }, [selectedImage]);

  const filteredImages = filter === 'ALL' 
    ? galleryImages 
    : galleryImages.filter(img => img.type === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Media Gallery</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Browse all your bill images and shop photos
          </p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg shadow-primary-500/25"
          style={{ background: 'var(--accent-gradient)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload className="w-4 h-4" />
          Upload Images
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        {(['ALL', 'BILL', 'SHOP', 'RECEIPT'] as const).map((type) => (
          <motion.button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === type ? 'text-white shadow-lg' : ''
            }`}
            style={{
              backgroundColor: filter === type ? 'var(--color-primary-500)' : 'var(--bg-secondary)',
              color: filter === type ? '#fff' : 'var(--text-secondary)',
              boxShadow: filter === type ? '0 4px 12px rgba(59,130,246,0.3)' : 'none',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {type === 'ALL' ? 'All Images' : type.charAt(0) + type.slice(1).toLowerCase() + 's'}
          </motion.button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredImages.map((image, i) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="break-inside-avoid card overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(image.id)}
            whileHover={{ y: -4 }}
          >
            <div className="relative overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <div className="text-white text-sm font-medium">{image.title}</div>
                <div className="text-white/70 text-xs">{image.date}</div>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`badge ${
                  image.type === 'BILL' ? 'bg-blue-500/80 text-white' :
                  image.type === 'SHOP' ? 'bg-green-500/80 text-white' :
                  'bg-purple-500/80 text-white'
                }`}>
                  {image.type}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox - Fixed positioning to prevent layout shift */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
              style={{ touchAction: 'none' }}
            />
            {/* Content */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors pointer-events-auto"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                src={galleryImages.find(img => img.id === selectedImage)?.url}
                alt=""
                className="max-w-full max-h-[80vh] rounded-xl object-contain pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
