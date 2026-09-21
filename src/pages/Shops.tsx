import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MapPin, Phone, Star, Archive, Tag, X } from 'lucide-react';
import { shops, tags } from '../lib/mockData';
import { useToastStore } from '../lib/store';

export function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const { addToast } = useToastStore();

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Shops</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Manage your grocery stores and shopping locations
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={() => setShowTagManager(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Tag className="w-4 h-4" />
            Tags
          </motion.button>
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg shadow-primary-500/25"
            style={{ background: 'var(--accent-gradient)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
            Add Shop
          </motion.button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search shops by name or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-base pl-11"
        />
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShops.map((shop, i) => (
          <motion.div
            key={shop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-5 cursor-pointer"
            onClick={() => setSelectedShop(shop.id)}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                  {shop.name}
                </h3>
                <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <MapPin className="w-3 h-3" />
                  {shop.address}
                </div>
              </div>
              {shop.isArchived && (
                <span className="badge bg-yellow-500/10 text-yellow-600">
                  <Archive className="w-3 h-3" />
                  Archived
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {shop.tags.map((tag) => {
                const tagData = tags.find(t => t.name === tag);
                return (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${tagData?.color || '#3b82f6'}15`,
                      color: tagData?.color || '#3b82f6'
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Bills</div>
                <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{shop.totalBills}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Spent</div>
                <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>${shop.totalSpent.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Rating</div>
                <div className="text-sm font-bold flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {shop.rating}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Shop Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)} title="Add New Shop">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Shop Name</label>
                <input type="text" className="input-base" placeholder="e.g., FreshMart" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Address</label>
                <input type="text" className="input-base" placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Phone</label>
                <input type="text" className="input-base" placeholder="555-0100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 5).map((tag) => (
                    <button
                      key={tag.id}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105"
                      style={{ 
                        borderColor: tag.color,
                        color: tag.color,
                        backgroundColor: `${tag.color}10`
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <motion.button
                  onClick={() => {
                    setShowCreateModal(false);
                    addToast({ type: 'success', title: 'Shop created!', message: 'New shop has been added successfully' });
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'var(--accent-gradient)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Shop
                </motion.button>
                <motion.button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border"
                  style={{ 
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Tag Manager Modal */}
      <AnimatePresence>
        {showTagManager && (
          <Modal onClose={() => setShowTagManager(false)} title="Manage Tags">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${tag.color}15`,
                      color: tag.color
                    }}
                  >
                    {tag.name}
                    <button className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Add New Tag</label>
                <div className="flex gap-2">
                  <input type="text" className="input-base flex-1" placeholder="Tag name" />
                  <input type="color" className="w-12 h-10 rounded-lg cursor-pointer" defaultValue="#3b82f6" />
                  <motion.button
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ background: 'var(--accent-gradient)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Shop Detail Modal */}
      <AnimatePresence>
        {selectedShop && (
          <Modal onClose={() => setSelectedShop(null)} title="Shop Details">
            {(() => {
              const shop = shops.find(s => s.id === selectedShop);
              if (!shop) return null;
              return (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{shop.name}</h3>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                        {shop.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                        {shop.phone}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                    <div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Bills</div>
                      <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{shop.totalBills}</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Spent</div>
                      <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>${shop.totalSpent.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md rounded-2xl border p-6 shadow-2xl"
        style={{ 
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border-color)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-opacity-10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
