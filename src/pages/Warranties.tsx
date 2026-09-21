import { motion } from 'framer-motion';
import { Shield, Clock, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { warranties } from '../lib/mockData';

export function WarrantiesPage() {
  const activeWarranties = warranties.filter(w => w.status === 'ACTIVE');
  const expiringSoon = activeWarranties.filter(w => w.daysLeft <= 60);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Warranties</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Track item warranties and set expiration reminders
        </p>
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
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
