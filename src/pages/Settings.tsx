import { motion } from 'framer-motion';
import { Sun, Moon, User, Bell, Palette, Shield, Database, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../lib/store';

export function SettingsPage() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Manage your preferences and account settings
        </p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
            style={{ background: 'var(--accent-gradient)' }}>
            JD
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>John Doe</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>john@example.com</p>
            <span className="badge bg-primary-500/10 text-primary-500 mt-1">Super Admin</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Full Name</label>
            <input type="text" className="input-base" defaultValue="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
            <input type="email" className="input-base" defaultValue="john@example.com" />
          </div>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Appearance</h3>
        </div>
        
        {/* Theme Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-3">
            {isDark ? <Moon className="w-5 h-5 text-primary-400" /> : <Sun className="w-5 h-5 text-yellow-500" />}
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Dark Mode</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Toggle between light and dark themes</div>
            </div>
          </div>
          <motion.button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-primary-500' : 'bg-gray-300'}`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
              animate={{ x: isDark ? 26 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        {/* Accent Color */}
        <div className="mt-4">
          <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Accent Color</div>
          <div className="flex gap-2">
            {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'].map((color) => (
              <motion.button
                key={color}
                className="w-8 h-8 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Budget Alerts', desc: 'Get notified when approaching budget limits', enabled: true },
            { label: 'Warranty Expirations', desc: 'Reminders for expiring warranties', enabled: true },
            { label: 'Price Drops', desc: 'Alerts when tracked items drop in price', enabled: false },
            { label: 'Weekly Summary', desc: 'Receive weekly expense summary emails', enabled: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
              </div>
              <div className={`w-10 h-5 rounded-full ${item.enabled ? 'bg-primary-500' : 'bg-gray-300'} relative cursor-pointer`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Security</h3>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Change Password', icon: ChevronRight },
            { label: 'Two-Factor Authentication', icon: ChevronRight },
            { label: 'Active Sessions', icon: ChevronRight },
          ].map((item) => (
            <motion.button
              key={item.label}
              className="w-full flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-opacity-50"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              whileHover={{ x: 4 }}
            >
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
              <item.icon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Data & Storage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Data & Storage</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: 'var(--text-secondary)' }}>Storage Used</span>
              <span style={{ color: 'var(--text-primary)' }}>1.2 GB / 5 GB</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div className="h-full rounded-full w-1/4" style={{ background: 'var(--accent-gradient)' }} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <motion.button
              className="px-4 py-2 rounded-xl text-sm font-medium border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Export Data
            </motion.button>
            <motion.button
              className="px-4 py-2 rounded-xl text-sm font-medium text-red-500 border border-red-500/20 bg-red-500/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Clear Cache
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
