import { motion } from 'framer-motion';
import { Sun, Moon, Database, GitBranch } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({ isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: 'var(--border-color)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--accent-gradient)' }}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Database className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
                ExpenseTrack Pro
              </h1>
              <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                <GitBranch className="w-3 h-3" />
                Architecture & Design Document
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
              Step 1 — Awaiting Approval
            </div>
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border transition-colors"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
