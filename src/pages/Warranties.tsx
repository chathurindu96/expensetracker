import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, AlertTriangle, CheckCircle, Bell, Plus, Upload, Eye, Calendar, FileText } from 'lucide-react';
import { warranties } from '../lib/mockData';
import { useToastStore } from '../lib/store';
import { Modal } from '../components/ui/Modal';

export function WarrantiesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null);
  const { addToast } = useToastStore();

  const activeWarranties = warranties.filter(w => w.status === 'ACTIVE');
  const expiringSoon = activeWarranties.filter(w => w.daysLeft <= 60);

  const selectedWarrantyData = warranties.find(w => w.id === selectedWarranty);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Warranties</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Track item warranties and set expiration reminders
          </p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg shadow-primary-500/25"
          style={{ background: 'var(--accent-gradient)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Add Warranty
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500/10">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{activeWarranties.length}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Active Warranties</div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{expiringSoon.length}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Expiring Soon</div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10">
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{activeWarranties.length}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Reminders Set</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Warranty List */}
      <div className="space-y-3">
        {warranties.map((warranty, i) => {
          const isExpiringSoon = warranty.daysLeft > 0 && warranty.daysLeft <= 60;
          const isExpired = warranty.status === 'EXPIRED';
          
          return (
            <motion.div
              key={warranty.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isExpired ? 'bg-red-500/10' : isExpiringSoon ? 'bg-yellow-500/10' : 'bg-green-500/10'
                  }`}>
                    {isExpired ? <AlertTriangle className="w-6 h-6 text-red-500" /> : 
                     isExpiringSoon ? <Clock className="w-6 h-6 text-yellow-500" /> :
                     <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{warranty.itemName}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Provider: {warranty.provider} • Purchased: {warranty.purchaseDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Expires</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{warranty.expiryDate}</div>
                  </div>
                  <div className={`badge ${
                    isExpired ? 'bg-red-500/10 text-red-600' : 
                    isExpiringSoon ? 'bg-yellow-500/10 text-yellow-600' : 
                    'bg-green-500/10 text-green-600'
                  }`}>
                    {isExpired ? 'Expired' : `${warranty.daysLeft} days left`}
                  </div>
                  <motion.button
                    onClick={() => setSelectedWarranty(warranty.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-105"
                    style={{ 
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create Warranty Modal */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        title="Add New Warranty"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Item Name</label>
            <input type="text" className="input-base" placeholder="e.g., Kitchen Blender" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Provider/Manufacturer</label>
            <input type="text" className="input-base" placeholder="e.g., BlendTech" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Purchase Date</label>
              <input type="date" className="input-base" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Expiry Date</label>
              <input type="date" className="input-base" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Contact Information</label>
            <input type="text" className="input-base" placeholder="Phone or email for warranty claims" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Warranty Terms</label>
            <textarea 
              className="input-base" 
              rows={3}
              placeholder="Details about warranty coverage, conditions, etc."
            />
          </div>
          
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
              Upload Warranty Document
            </label>
            <div className="border-2 border-dashed rounded-xl p-6 text-center transition-all hover:border-primary-500"
              style={{ borderColor: 'var(--border-color)' }}>
              <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Drop your warranty document here
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                PDF, JPG, PNG up to 10MB
              </p>
              <input type="file" className="hidden" id="warranty-upload" accept=".pdf,.jpg,.jpeg,.png" />
              <label
                htmlFor="warranty-upload"
                className="inline-block mt-3 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border"
                style={{ 
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)'
                }}
              >
                Browse Files
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <input type="checkbox" id="reminder" className="w-4 h-4 rounded" defaultChecked />
            <label htmlFor="reminder" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Set expiration reminder (30 days before)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              onClick={() => {
                setShowCreateModal(false);
                addToast({ type: 'success', title: 'Warranty added!', message: 'New warranty has been tracked' });
              }}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ background: 'var(--accent-gradient)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Warranty
            </motion.button>
            <motion.button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Warranty Detail Modal */}
      <Modal 
        isOpen={!!selectedWarranty} 
        onClose={() => setSelectedWarranty(null)} 
        title="Warranty Details"
        size="xl"
      >
        {selectedWarrantyData && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  selectedWarrantyData.status === 'EXPIRED' ? 'bg-red-500/10' : 
                  selectedWarrantyData.daysLeft <= 60 ? 'bg-yellow-500/10' : 'bg-green-500/10'
                }`}>
                  {selectedWarrantyData.status === 'EXPIRED' ? <AlertTriangle className="w-7 h-7 text-red-500" /> : 
                   selectedWarrantyData.daysLeft <= 60 ? <Clock className="w-7 h-7 text-yellow-500" /> :
                   <Shield className="w-7 h-7 text-green-500" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {selectedWarrantyData.itemName}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Provider: {selectedWarrantyData.provider}
                  </p>
                </div>
              </div>
              <div className={`badge ${
                selectedWarrantyData.status === 'EXPIRED' ? 'bg-red-500/10 text-red-600' : 
                selectedWarrantyData.daysLeft <= 60 ? 'bg-yellow-500/10 text-yellow-600' : 
                'bg-green-500/10 text-green-600'
              }`}>
                {selectedWarrantyData.status === 'EXPIRED' ? 'Expired' : `${selectedWarrantyData.daysLeft} days left`}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Purchase Date</span>
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {selectedWarrantyData.purchaseDate}
                </div>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Expiry Date</span>
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {selectedWarrantyData.expiryDate}
                </div>
              </div>
            </div>

            {/* Warranty Terms */}
            <div>
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Warranty Terms</h4>
              <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                <p>This warranty covers manufacturing defects and malfunctions under normal use conditions. 
                The warranty does not cover damage caused by misuse, accidents, or unauthorized modifications. 
                For warranty claims, please contact the provider with proof of purchase.</p>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Uploaded Documents
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Warranty_Certificate.pdf
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>2.4 MB • Uploaded on {selectedWarrantyData.purchaseDate}</div>
                  </div>
                  <motion.button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View
                  </motion.button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <FileText className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Purchase_Receipt.jpg
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>1.1 MB • Uploaded on {selectedWarrantyData.purchaseDate}</div>
                  </div>
                  <motion.button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <motion.button
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Edit Warranty
              </motion.button>
              <motion.button
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 border border-red-500/20 bg-red-500/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Delete Warranty
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
