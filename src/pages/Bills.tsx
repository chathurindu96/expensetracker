import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Eye, X } from 'lucide-react';
import { bills, billItems } from '../lib/mockData';
import { useToastStore } from '../lib/store';
import { Modal } from '../components/ui/Modal';

export function BillsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { addToast } = useToastStore();

  const selectedBillData = bills.find(b => b.id === selectedBill);
  const selectedBillItems = billItems.filter(bi => bi.billId === selectedBill);

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
                <th className="text-center px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {bills.map((bill, i) => (
                <motion.tr
                  key={bill.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-opacity-50 transition-colors"
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
                  <td className="px-6 py-4 text-center">
                    <motion.button
                      onClick={() => setSelectedBill(bill.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-105"
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
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Upload Modal */}
      <Modal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
        title="Upload Bill CSV"
        size="lg"
      >
        <div className="space-y-4">
          {/* Shop Selector */}
          <div>
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
          <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span style={{ color: 'var(--text-secondary)' }}>File format validated</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span style={{ color: 'var(--text-secondary)' }}>Shop selection required</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
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
        </div>
      </Modal>

      {/* Bill Detail Modal */}
      <Modal 
        isOpen={!!selectedBill} 
        onClose={() => setSelectedBill(null)} 
        title="Bill Details"
        size="xl"
      >
        {selectedBillData && (
          <div className="space-y-5">
            {/* Bill Header */}
            <div className="flex items-start justify-between pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold"
                    style={{ background: 'var(--accent-gradient)' }}>
                    {selectedBillData.shopName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {selectedBillData.shopName}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {selectedBillData.date}
                    </p>
                  </div>
                </div>
                {selectedBillData.notes && (
                  <p className="text-sm mt-2 px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    📝 {selectedBillData.notes}
                  </p>
                )}
              </div>
              <motion.button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </motion.button>
            </div>

            {/* Items Table */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Items ({selectedBillItems.length})
              </h4>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Item</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Category</th>
                      <th className="text-center px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Qty</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Unit Price</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Discount</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                    {selectedBillItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.itemName}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-right" style={{ color: 'var(--text-secondary)' }}>${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-right text-green-500">
                          {item.discount > 0 ? `-$${item.discount.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium" style={{ color: 'var(--text-primary)' }}>
                          ${item.totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-primary)' }}>
                  ${selectedBillItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Discount</span>
                <span className="text-green-500">-${selectedBillData.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Tax</span>
                <span style={{ color: 'var(--text-primary)' }}>${selectedBillData.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                <span>Total</span>
                <span>${selectedBillData.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
