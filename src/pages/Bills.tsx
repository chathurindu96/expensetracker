import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, X, Download } from 'lucide-react';
import { bills } from '../lib/mockData';
import { useToastStore } from '../lib/store';

export function BillsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { addToast } = useToastStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Bills</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Upload and manage your billing data
          </p>
        </div>
        <motion.button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg shadow-primary-500/25"
          style={{ background: 'var(--accent-gradient)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload className="w-4 h-4" />
          Upload CSV
        </motion.button>
      </div>

      {/* Bills Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Shop</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Items</th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Amount</th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Discount</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {bills.map((bill, i) => (
                <motion.tr
                  key={bill.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-opacity-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'var(--accent-gradient)' }}>
                        {bill.shopName.charAt(0)}
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{bill.shopName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{bill.date}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{bill.itemCount} items</td>
                  <td className="px-6 py-4 text-right text-sm font-bold" style={{ color: 'var(--text-primary)' }}>${bill.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-sm text-green-500">
                    {bill.discount > 0 ? `-$${bill.discount.toFixed(2)}` : '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl"
              style={{ 
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-color)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Upload Bill CSV</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1.5 rounded-lg hover:bg-opacity-10 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Shop Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Select Shop</label>
                <select className="input-base">
                  <option value="">Choose a shop...</option>
                  <option value="1">FreshMart</option>
                  <option value="2">MegaStore</option>
                  <option value="3">LocalGreens</option>
                </select>
              </div>

              {/* Drag & Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive ? 'border-primary-500 bg-primary-500/5' : ''
                }`}
                style={{ borderColor: dragActive ? undefined : 'var(--border-color)' }}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              >
                <Upload className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Drag & drop your CSV file here
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  or click to browse
                </p>
                <input type="file" accept=".csv" className="hidden" id="csv-upload" />
                <label
                  htmlFor="csv-upload"
                  className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border"
                  style={{ 
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Browse Files
                </label>
              </div>

              {/* Format Info */}
              <div className="mt-4 p-3 rounded-lg text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <strong>CSV Format:</strong> Item, Quantity, Price, Discount
                    <br />
                    <span style={{ color: 'var(--text-muted)' }}>Example: "Organic Milk, 2, 4.50, 0.50"</span>
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span style={{ color: 'var(--text-secondary)' }}>File format validated</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span style={{ color: 'var(--text-secondary)' }}>Shop selection required</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={() => {
                    setShowUploadModal(false);
                    addToast({ type: 'success', title: 'CSV uploaded!', message: 'Bill data has been processed' });
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'var(--accent-gradient)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Upload & Process
                </motion.button>
                <motion.button
                  onClick={() => setShowUploadModal(false)}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
