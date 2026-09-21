import { motion } from 'framer-motion';
import { Layers, Zap, Database, RefreshCw } from 'lucide-react';

export function StateManagement() {
  const globalStateStores = [
    {
      name: 'useThemeStore',
      library: 'Zustand',
      purpose: 'Dark/Light mode, accent color, font size',
      persistence: 'localStorage',
      fields: ['theme: "light" | "dark"', 'accentColor: string', 'fontSize: "sm" | "md" | "lg"'],
    },
    {
      name: 'useUIStore',
      library: 'Zustand',
      purpose: 'Sidebar state, modals, toasts, active budget',
      persistence: 'sessionStorage',
      fields: ['sidebarOpen: boolean', 'activeModal: string | null', 'activeBudgetId: string | null', 'searchQuery: string'],
    },
    {
      name: 'useBudgetStore',
      library: 'Zustand',
      purpose: 'Currently selected/activated budget',
      persistence: 'localStorage',
      fields: ['selectedBudgetId: string | null', 'budgetAlertDismissed: boolean'],
    },
  ];

  const serverStateHooks = [
    {
      name: 'useShops',
      queries: ['useQuery: getShops', 'useMutation: createShop', 'useMutation: updateShop', 'useMutation: archiveShop'],
      cacheTime: '5 min',
      staleTime: '1 min',
    },
    {
      name: 'useBills',
      queries: ['useQuery: getBills (paginated)', 'useQuery: getBillDetail', 'useMutation: uploadCSV'],
      cacheTime: '2 min',
      staleTime: '30 sec',
    },
    {
      name: 'useAnalytics',
      queries: ['useQuery: getDashboardKPIs', 'useQuery: getPriceHistory', 'useQuery: getShopComparison', 'useQuery: getBestShop'],
      cacheTime: '10 min',
      staleTime: '5 min',
    },
    {
      name: 'useBudgets',
      queries: ['useQuery: getBudgets', 'useMutation: createBudget', 'useMutation: activateBudget'],
      cacheTime: '5 min',
      staleTime: '1 min',
    },
    {
      name: 'useWarranties',
      queries: ['useQuery: getWarranties', 'useMutation: createWarranty', 'useMutation: setReminder'],
      cacheTime: '5 min',
      staleTime: '2 min',
    },
    {
      name: 'useMedia',
      queries: ['useQuery: getImages (paginated)', 'useMutation: uploadImage', 'useMutation: deleteImage'],
      cacheTime: '15 min',
      staleTime: '5 min',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
          <Layers className="w-6 h-6" />
          State Management Strategy
        </h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Dual-layer approach: Zustand for UI/client state, TanStack Query for server state with intelligent caching
        </p>
      </div>

      {/* Strategy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10">
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Client State (Zustand)</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>UI preferences, active selections, modals</p>
            </div>
          </div>
          <ul className="space-y-2">
            {[
              'Minimal, focused stores (3 total)',
              'Persisted to localStorage/sessionStorage',
              'No async logic — pure synchronous state',
              'Computed values via selectors',
              'DevTools integration enabled',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl border"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/10">
              <Database className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Server State (TanStack Query)</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>API data, caching, mutations, refetching</p>
            </div>
          </div>
          <ul className="space-y-2">
            {[
              'Automatic caching with stale-while-revalidate',
              'Optimistic updates for instant UI feedback',
              'Query invalidation on mutations',
              'Pagination & infinite scroll support',
              'Background refetching on window focus',
              'Retry logic with exponential backoff',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Zustand Stores */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Zap className="w-5 h-5 text-purple-500" />
          Zustand Stores (Client State)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {globalStateStores.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{store.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500">{store.library}</span>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{store.purpose}</p>
              <div className="text-xs px-2 py-1 rounded mb-3 inline-block" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                Persist: {store.persistence}
              </div>
              <div className="space-y-1">
                {store.fields.map((field) => (
                  <div key={field} className="text-xs font-mono py-1 px-2 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    {field}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TanStack Query Hooks */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <RefreshCw className="w-5 h-5 text-red-500" />
          TanStack Query Hooks (Server State)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serverStateHooks.map((hook, i) => (
            <motion.div
              key={hook.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{hook.name}()</h4>
              </div>
              <div className="flex gap-3 mb-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>Cache: {hook.cacheTime}</span>
                <span>Stale: {hook.staleTime}</span>
              </div>
              <div className="space-y-1.5">
                {hook.queries.map((query) => (
                  <div key={query} className="text-xs font-mono py-1 px-2 rounded flex items-center gap-1.5"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    <span className={`w-1.5 h-1.5 rounded-full ${query.includes('Mutation') ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    {query}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-6" style={{ color: 'var(--text-primary)' }}>
          🔄 State Update Flow
        </h3>
        <div className="flex flex-col items-center gap-3">
          {[
            { step: 'User Action', desc: 'Click, type, upload', color: '#3b82f6' },
            { step: 'Optimistic Update', desc: 'UI updates immediately (TanStack onMutate)', color: '#8b5cf6' },
            { step: 'API Request', desc: 'Mutation sent to server', color: '#06b6d4' },
            { step: 'Server Response', desc: 'Database updated, new data returned', color: '#10b981' },
            { step: 'Cache Invalidation', desc: 'Related queries refetched automatically', color: '#f59e0b' },
            { step: 'UI Reconciliation', desc: 'Optimistic data replaced with server truth', color: '#ef4444' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-full max-w-md"
            >
              <div className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: item.color }}>
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.step}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </div>
              {i < 5 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
