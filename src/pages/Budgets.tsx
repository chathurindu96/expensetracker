import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Plus, CheckCircle, AlertTriangle, X, TrendingUp } from 'lucide-react';
import { budgets } from '../lib/mockData';
import { useToastStore, useBudgetStore } from '../lib/store';

export function BudgetsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { activeBudgetId, setActiveBudget } = useBudgetStore();
  const { addToast } = useToastStore();

  const statusColors = {
    ACTIVE: { bg: 'bg-green-500/10', text: 'text-green-600', icon: CheckCircle },
    EXCEEDED: { bg: 'bg-red-500/10', text: 'text-red-600', icon: AlertTriangle },
    COMPLETED: { bg: 'bg-blue-500/10', text: 'text-blue-600', icon: CheckCircle },
    INACTIVE: { bg: 'bg-gray-500/10', text: 'text-gray-600', icon: Wallet },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Budgets</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Track and manage your spending budgets
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
          New Budget
        </motion.button>
      </div>

      {/* Active Budget Highlight */}
      {activeBudgetId && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5 border-2"
          style={{ borderColor: 'var(--color-primary-500)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Active Budget</span>
          </div>
          {(() => {
            const budget = budgets.find(b => b.id === activeBudgetId);
            if (!budget) return null;
            const progress = (budget.spent / budget.amount) * 100;
            return (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{budget.name}</span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    ${budget.spent.toFixed(0)} / ${budget.amount.toFixed(0)}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    className="h-full rounded-full"
                    style={{ background: progress > 90 ? '#ef4444' : 'var(--accent-gradient)' }}
                  />
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((budget, i) => {
          const progress = (budget.spent / budget.amount) * 100;
          const statusStyle = statusColors[budget.status];
          const StatusIcon = statusStyle.icon;
          const isActive = activeBudgetId === budget.id;

          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`card p-5 cursor-pointer ${isActive ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => setActiveBudget(isActive ? null : budget.id)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{budget.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {budget.startDate} — {budget.endDate}
                  </p>
                </div>
                <span className={`badge ${statusStyle.bg} ${statusStyle.text}`}>
                  <StatusIcon className="w-3 h-3" />
                  {budget.status}
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  ${budget.spent.toFixed(0)}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  of ${budget.amount.toFixed(0)}
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="h-full rounded-full"
                  style={{ 
                    background: progress > 100 ? '#ef4444' : progress > 80 ? '#f59e0b' : 'var(--accent-gradient)'
                  }}
                />
              </div>

              <div className="flex items-center justify-between mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{progress.toFixed(0)}% used</span>
                <span>${(budget.amount - budget.spent).toFixed(0)} remaining</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create Budget Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
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
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Create Budget</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-1.5 rounded-lg" style={{ color: 'var(--text-muted)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Budget Name</label>
                  <input type="text" className="input-base" placeholder="e.g., Monthly Groceries" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Amount</label>
                    <input type="number" className="input-base" placeholder="500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Currency</label>
                    <select className="input-base">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Start Date</label>
                    <input type="date" className="input-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>End Date</label>
                    <input type="date" className="input-base" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <motion.button
                    onClick={() => {
                      setShowCreateModal(false);
                      addToast({ type: 'success', title: 'Budget created!', message: 'New budget has been added' });
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ background: 'var(--accent-gradient)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Budget
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
