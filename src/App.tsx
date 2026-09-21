import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useThemeStore } from './lib/store';
import { Sidebar, BottomNav } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ShopsPage } from './pages/Shops';
import { BillsPage } from './pages/Bills';
import { AnalyticsPage } from './pages/Analytics';
import { BudgetsPage } from './pages/Budgets';
import { WarrantiesPage } from './pages/Warranties';
import { GalleryPage } from './pages/Gallery';
import { AdminPage } from './pages/Admin';
import { SettingsPage } from './pages/Settings';
import { ToastContainer } from './components/ui/Toast';

function App() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <Sidebar />
        <ToastContainer />
        
        <main className="lg:ml-[260px] min-h-screen pb-20 lg:pb-0 transition-all duration-300 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/shops" element={<PageWrapper><ShopsPage /></PageWrapper>} />
              <Route path="/bills" element={<PageWrapper><BillsPage /></PageWrapper>} />
              <Route path="/analytics" element={<PageWrapper><AnalyticsPage /></PageWrapper>} />
              <Route path="/budgets" element={<PageWrapper><BudgetsPage /></PageWrapper>} />
              <Route path="/warranties" element={<PageWrapper><WarrantiesPage /></PageWrapper>} />
              <Route path="/gallery" element={<PageWrapper><GalleryPage /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
