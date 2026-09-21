import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DatabaseSchema } from './components/DatabaseSchema';
import { SystemArchitecture } from './components/SystemArchitecture';
import { ComponentTree } from './components/ComponentTree';
import { StateManagement } from './components/StateManagement';
import { ApprovalCTA } from './components/ApprovalCTA';

type Section = 'overview' | 'database' | 'architecture' | 'components' | 'state';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const sections: { id: Section; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '🏗️' },
    { id: 'database', label: 'Database Schema', icon: '🗄️' },
    { id: 'architecture', label: 'System Architecture', icon: '⚙️' },
    { id: 'components', label: 'Component Tree', icon: '🌳' },
    { id: 'state', label: 'State Management', icon: '🔄' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Toaster position="top-right" theme={isDark ? 'dark' : 'light'} />
      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <HeroSection />

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl border-b" style={{ 
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: 'var(--border-color)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'hover:bg-primary-500/10'
                }`}
                style={{ color: activeSection === section.id ? '#fff' : 'var(--text-secondary)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activeSection === 'overview' && <OverviewSection />}
            {activeSection === 'database' && <DatabaseSchema />}
            {activeSection === 'architecture' && <SystemArchitecture />}
            {activeSection === 'components' && <ComponentTree />}
            {activeSection === 'state' && <StateManagement />}
          </motion.div>
        </AnimatePresence>
      </main>

      <ApprovalCTA />
      <footer className="text-center py-8 text-sm" style={{ color: 'var(--text-muted)' }}>
        <p>ExpenseTrack Pro — Architecture Document v1.0</p>
        <p className="mt-1">Step 1 of 4 • Awaiting approval to proceed to Design System & Layout</p>
      </footer>
    </div>
  );
}

function OverviewSection() {
  const features = [
    { icon: '🏪', title: 'Shop & Tag Management', desc: 'CRUD operations for shops with tag-based categorization' },
    { icon: '📊', title: 'Billing & Data Ingestion', desc: 'CSV upload with drag-and-drop and real-time validation' },
    { icon: '💰', title: 'Price Comparison', desc: 'Track prices across shops with time-series analysis' },
    { icon: '📈', title: 'Dashboards & Analytics', desc: 'KPIs, financial figures, and visual trend analysis' },
    { icon: '💳', title: 'Budget & Categories', desc: 'Budget CRUD with activation and food category management' },
    { icon: '🛡️', title: 'Warranty Manager', desc: 'Track warranties with automated expiration reminders' },
    { icon: '🖼️', title: 'Media Gallery', desc: 'Unified masonry gallery for bills and shop images' },
    { icon: '🔐', title: 'Auth & Admin', desc: 'RBAC, permissions, admin dashboard, and settings' },
  ];

  const techStack = [
    { name: 'Next.js 14+', role: 'Framework', color: '#000000' },
    { name: 'TypeScript', role: 'Language', color: '#3178c6' },
    { name: 'Tailwind CSS', role: 'Styling', color: '#06b6d4' },
    { name: 'Framer Motion', role: 'Animations', color: '#ff0088' },
    { name: 'Zustand', role: 'UI State', color: '#453837' },
    { name: 'TanStack Query', role: 'Server State', color: '#ff4154' },
    { name: 'Prisma', role: 'ORM', color: '#2d3748' },
    { name: 'PostgreSQL', role: 'Database', color: '#336791' },
    { name: 'Radix UI', role: 'Primitives', color: '#1a1a1a' },
    { name: 'Recharts', role: 'Charts', color: '#232426' },
    { name: 'Lucide React', role: 'Icons', color: '#f56565' },
    { name: 'Sonner', role: 'Toasts', color: '#1a1a1a' },
  ];

  return (
    <div className="space-y-12">
      {/* Project Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-6 gradient-text">Project Overview</h2>
        <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          ExpenseTrack Pro is a comprehensive expense and grocery tracking application designed to help users 
          manage their shopping expenses, compare prices across stores, track budgets, and maintain warranties. 
          The application features a modern, responsive UI with buttery-smooth animations and a highly 
          optimized, normalized database schema.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              <span className="text-3xl mb-3 block">{feature.icon}</span>
              <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-bold mb-6 gradient-text">Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex flex-col items-center p-4 rounded-xl border transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: tech.color }} />
              <span className="text-xs font-semibold text-center" style={{ color: 'var(--text-primary)' }}>{tech.name}</span>
              <span className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{tech.role}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section>
        <h2 className="text-2xl font-bold mb-6 gradient-text">Design Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Performance First', items: ['Optimistic UI updates', 'Skeleton loaders', 'Lazy loading & code splitting', 'IndexedDB for offline support'] },
            { title: 'Accessibility', items: ['WCAG 2.1 AA compliance', 'Keyboard navigation', 'Screen reader support', 'Focus management'] },
            { title: 'Responsive Design', items: ['Mobile-first approach', 'Touch-friendly targets (44px+)', 'Adaptive layouts', 'Swipe gestures'] },
            { title: 'Developer Experience', items: ['Type-safe end-to-end', 'Modular component architecture', 'Hot module replacement', 'Comprehensive error handling'] },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
