import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Store, Receipt, BarChart3, Wallet, Shield,
  Image, Settings, Users, ChevronLeft, ChevronRight, X, Database
} from 'lucide-react';
import { useUIStore } from '../../lib/store';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/shops', icon: Store, label: 'Shops' },
  { path: '/bills', icon: Receipt, label: 'Bills' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/budgets', icon: Wallet, label: 'Budgets' },
  { path: '/warranties', icon: Shield, label: 'Warranties' },
  { path: '/gallery', icon: Image, label: 'Gallery' },
  { path: '/admin', icon: Users, label: 'Admin' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-[280px] z-50 lg:hidden flex flex-col border-r"
            style={{ 
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-color)'
            }}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                  <Database className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>ExpenseTrack</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'text-white shadow-lg' : ''
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--color-primary-500)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      boxShadow: isActive ? '0 4px 12px rgba(59,130,246,0.3)' : 'none',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Mobile User Section */}
            <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: 'var(--accent-gradient)' }}>
                  JD
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>John Doe</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Admin</div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 260 : 72,
          x: 0,
        }}
        className={`fixed top-0 left-0 h-full z-50 hidden lg:flex flex-col border-r transition-colors duration-300`}
        style={{ 
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border-color)'
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                  <Database className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>ExpenseTrack</span>
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <Database className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-opacity-10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'text-white shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--color-primary-500)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 4px 12px rgba(59,130,246,0.3)' : 'none',
                }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: 'var(--accent-gradient)' }}>
              JD
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>John Doe</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Admin</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const mobileNavItems = navItems.slice(0, 5); // Dashboard, Shops, Bills, Analytics, Budgets

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t"
      style={{ 
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-color)'
      }}>
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
              style={{ color: isActive ? 'var(--color-primary-500)' : 'var(--text-muted)' }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 w-8 h-0.5 rounded-full bg-primary-500"
                />
              )}
            </motion.button>
          );
        })}
        <motion.button
          onClick={() => navigate('/settings')}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
          style={{ color: 'var(--text-muted)' }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-medium">More</span>
        </motion.button>
      </div>
    </nav>
  );
}

export function MobileHeader() {
  const { setSidebarOpen } = useUIStore();

  return (
    <div className="lg:hidden flex items-center justify-between h-14 px-4 border-b"
      style={{ 
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-color)'
      }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
          <Database className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>ExpenseTrack</span>
      </div>
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded-lg"
        style={{ color: 'var(--text-secondary)' }}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
