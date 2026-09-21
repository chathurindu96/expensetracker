import { motion } from 'framer-motion';
import { Server, Globe, Database, Shield, Cloud, ArrowRight, ArrowDown } from 'lucide-react';

export function SystemArchitecture() {
  const layers = [
    {
      name: 'Presentation Layer',
      color: '#3b82f6',
      icon: <Globe className="w-5 h-5" />,
      items: ['Next.js 14 App Router', 'React Server Components', 'Client Components (interactive)', 'Tailwind CSS + Framer Motion'],
    },
    {
      name: 'API / Route Layer',
      color: '#8b5cf6',
      icon: <Server className="w-5 h-5" />,
      items: ['REST API Routes', 'tRPC (optional)', 'Input validation (Zod)', 'Rate limiting & CORS'],
    },
    {
      name: 'Business Logic Layer',
      color: '#06b6d4',
      icon: <Shield className="w-5 h-5" />,
      items: ['Service classes', 'Auth middleware', 'RBAC enforcement', 'CSV parsing engine'],
    },
    {
      name: 'Data Access Layer',
      color: '#10b981',
      icon: <Database className="w-5 h-5" />,
      items: ['Prisma ORM', 'Query optimization', 'Transaction management', 'Connection pooling'],
    },
    {
      name: 'Infrastructure',
      color: '#f59e0b',
      icon: <Cloud className="w-5 h-5" />,
      items: ['PostgreSQL 15+', 'Redis (caching/sessions)', 'S3-compatible storage', 'Cron jobs (reminders)'],
    },
  ];

  const apiRoutes = [
    { method: 'GET', path: '/api/auth/session', desc: 'Get current session' },
    { method: 'POST', path: '/api/auth/login', desc: 'Authenticate user' },
    { method: 'POST', path: '/api/auth/register', desc: 'Register new user' },
    { method: 'GET', path: '/api/shops', desc: 'List user shops' },
    { method: 'POST', path: '/api/shops', desc: 'Create new shop' },
    { method: 'PATCH', path: '/api/shops/:id', desc: 'Update shop' },
    { method: 'DELETE', path: '/api/shops/:id', desc: 'Archive shop' },
    { method: 'POST', path: '/api/bills/upload', desc: 'Upload CSV bill data' },
    { method: 'GET', path: '/api/bills', desc: 'List bills with filters' },
    { method: 'GET', path: '/api/bills/:id', desc: 'Get bill details' },
    { method: 'GET', path: '/api/prices/compare', desc: 'Compare prices across shops' },
    { method: 'GET', path: '/api/prices/history/:itemId', desc: 'Price history for item' },
    { method: 'GET', path: '/api/analytics/dashboard', desc: 'Dashboard KPIs' },
    { method: 'GET', path: '/api/analytics/best-shop', desc: 'Find best shop by category' },
    { method: 'GET/POST/PATCH', path: '/api/budgets', desc: 'Budget CRUD' },
    { method: 'POST', path: '/api/budgets/:id/activate', desc: 'Activate budget' },
    { method: 'GET', path: '/api/warranties', desc: 'List warranties' },
    { method: 'POST', path: '/api/warranties', desc: 'Create warranty' },
    { method: 'GET', path: '/api/images', desc: 'List gallery images' },
    { method: 'POST', path: '/api/images/upload', desc: 'Upload image' },
    { method: 'GET', path: '/api/admin/users', desc: 'Admin: list users' },
    { method: 'PATCH', path: '/api/admin/users/:id/role', desc: 'Admin: change role' },
  ];

  const methodColors: Record<string, string> = {
    GET: 'bg-green-500/10 text-green-600 dark:text-green-400',
    POST: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    PATCH: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    DELETE: 'bg-red-500/10 text-red-600 dark:text-red-400',
    'GET/POST/PATCH': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
          <Server className="w-6 h-6" />
          System Architecture
        </h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Layered architecture with clear separation of concerns, designed for scalability and maintainability
        </p>
      </div>

      {/* Architecture Layers Diagram */}
      <div className="space-y-3">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="p-5 rounded-2xl border relative overflow-hidden"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: layer.color }} />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                    style={{ backgroundColor: `${layer.color}15`, color: layer.color }}>
                    {layer.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{layer.name}</h4>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Layer {i + 1}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data Flow */}
      <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
          📡 Data Flow
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 overflow-x-auto pb-2">
          {['Client Request', 'Next.js Middleware', 'API Route Handler', 'Service Layer', 'Prisma Client', 'PostgreSQL'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap border"
                style={{ 
                  backgroundColor: i === 0 || i === 5 ? 'var(--bg-tertiary)' : 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}>
                {step}
              </div>
              {i < 5 && <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Auth Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
            🔐 Authentication Strategy
          </h3>
          <ul className="space-y-3">
            {[
              'JWT-based sessions with httpOnly cookies',
              'Refresh token rotation for security',
              'Session stored in Redis for fast lookup',
              'Password hashing with bcrypt (12 rounds)',
              'Rate limiting on auth endpoints (5/min)',
              'Optional OAuth2 (Google, GitHub)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
            🛡️ RBAC & Permissions
          </h3>
          <div className="space-y-3">
            {[
              { role: 'SUPER_ADMIN', perms: 'Full system access, user management', color: '#ef4444' },
              { role: 'ADMIN', perms: 'Manage shops, budgets, view analytics', color: '#f59e0b' },
              { role: 'USER', perms: 'Own data CRUD, view own analytics', color: '#3b82f6' },
            ].map((r) => (
              <div key={r.role} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="font-mono text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{r.role}</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.perms}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Routes */}
      <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
          🌐 API Route Structure
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2">
          {apiRoutes.map((route, i) => (
            <motion.div
              key={`${route.method}-${route.path}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${methodColors[route.method] || methodColors.GET}`}>
                {route.method}
              </span>
              <span className="font-mono truncate" style={{ color: 'var(--text-primary)' }}>{route.path}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
