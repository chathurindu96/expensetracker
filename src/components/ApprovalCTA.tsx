import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export function ApprovalCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 border"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--accent-gradient)' }} />
        
        <div className="relative flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-500/10">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Step 1 Complete
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Architecture, Database & Component Design
                </p>
              </div>
            </div>
            
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              The complete system architecture has been designed including:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                '✅ 14 Prisma models with 43+ indexes',
                '✅ Complete API route structure (22+ endpoints)',
                '✅ Layered system architecture (5 layers)',
                '✅ Component hierarchy & folder structure',
                '✅ State management (Zustand + TanStack Query)',
                '✅ Auth strategy with RBAC (3 roles)',
                '✅ Data flow documentation',
                '✅ Performance optimization patterns',
              ].map((item) => (
                <div key={item} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white shadow-lg shadow-primary-500/25 cursor-pointer"
                style={{ background: 'var(--accent-gradient)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Approve & Continue to Step 2
                <ArrowRight className="w-4 h-4" />
              </motion.div>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)'
                }}>
                Next: Design System & Layout
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Progress</span>
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient)" strokeWidth="8"
                  strokeDasharray="251.2" strokeDashoffset="188.4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text">25%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Phase 1 of 4</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Architecture ✓</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
