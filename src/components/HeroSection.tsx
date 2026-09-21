import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--accent-gradient)' }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-primary-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-primary-500 pulse-dot" />
            Phase 1 — Architecture & Database Design
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text">ExpenseTrack Pro</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>System Architecture</span>
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            A comprehensive, production-grade expense and grocery tracking application 
            featuring a highly normalized database schema, scalable API architecture, 
            and a modular component hierarchy designed for performance and maintainability.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white shadow-lg shadow-primary-500/25"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <span>📋</span> Complete Prisma Schema
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <span>🏗️</span> System Architecture
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <span>🌳</span> Component Hierarchy
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
        >
          {[
            { value: '14', label: 'DB Models' },
            { value: '8+', label: 'Core Modules' },
            { value: '12', label: 'Tech Stack' },
            { value: '4', label: 'Phases' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
