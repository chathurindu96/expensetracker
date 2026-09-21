import { motion } from 'framer-motion';
import { Folder, File, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  children?: TreeNode[];
}

const fileStructure: TreeNode = {
  name: 'expensetrack-pro/',
  type: 'folder',
  children: [
    {
      name: 'app/',
      type: 'folder',
      description: 'Next.js App Router',
      children: [
        { name: 'layout.tsx', type: 'file', description: 'Root layout with providers' },
        { name: 'page.tsx', type: 'file', description: 'Landing / Dashboard redirect' },
        { name: 'loading.tsx', type: 'file', description: 'Global loading skeleton' },
        { name: 'error.tsx', type: 'file', description: 'Global error boundary' },
        {
          name: '(auth)/',
          type: 'folder',
          children: [
            { name: 'login/page.tsx', type: 'file', description: 'Login page' },
            { name: 'register/page.tsx', type: 'file', description: 'Registration page' },
          ],
        },
        {
          name: '(dashboard)/',
          type: 'folder',
          description: 'Protected routes group',
          children: [
            { name: 'layout.tsx', type: 'file', description: 'Dashboard layout with sidebar' },
            { name: 'page.tsx', type: 'file', description: 'Main dashboard' },
            { name: 'shops/page.tsx', type: 'file', description: 'Shop management' },
            { name: 'shops/[id]/page.tsx', type: 'file', description: 'Shop details & bills' },
            { name: 'bills/page.tsx', type: 'file', description: 'Bill listing & upload' },
            { name: 'bills/upload/page.tsx', type: 'file', description: 'CSV upload wizard' },
            { name: 'analytics/page.tsx', type: 'file', description: 'Analytics & comparison' },
            { name: 'analytics/price-track/page.tsx', type: 'file', description: 'Item price tracking' },
            { name: 'budgets/page.tsx', type: 'file', description: 'Budget management' },
            { name: 'warranties/page.tsx', type: 'file', description: 'Warranty tracker' },
            { name: 'gallery/page.tsx', type: 'file', description: 'Unified media gallery' },
            { name: 'settings/page.tsx', type: 'file', description: 'User settings' },
          ],
        },
        {
          name: 'admin/',
          type: 'folder',
          children: [
            { name: 'layout.tsx', type: 'file', description: 'Admin layout' },
            { name: 'page.tsx', type: 'file', description: 'Admin dashboard' },
            { name: 'users/page.tsx', type: 'file', description: 'User management' },
            { name: 'permissions/page.tsx', type: 'file', description: 'RBAC config' },
          ],
        },
        {
          name: 'api/',
          type: 'folder',
          description: 'API routes',
          children: [
            { name: 'auth/[...nextauth]/route.ts', type: 'file' },
            { name: 'shops/route.ts', type: 'file' },
            { name: 'shops/[id]/route.ts', type: 'file' },
            { name: 'bills/route.ts', type: 'file' },
            { name: 'bills/upload/route.ts', type: 'file' },
            { name: 'prices/compare/route.ts', type: 'file' },
            { name: 'prices/history/[itemId]/route.ts', type: 'file' },
            { name: 'analytics/dashboard/route.ts', type: 'file' },
            { name: 'budgets/route.ts', type: 'file' },
            { name: 'warranties/route.ts', type: 'file' },
            { name: 'images/route.ts', type: 'file' },
            { name: 'images/upload/route.ts', type: 'file' },
          ],
        },
      ],
    },
    {
      name: 'components/',
      type: 'folder',
      description: 'Shared components',
      children: [
        {
          name: 'ui/',
          type: 'folder',
          description: 'Primitive UI components (shadcn)',
          children: [
            { name: 'button.tsx', type: 'file' },
            { name: 'card.tsx', type: 'file' },
            { name: 'dialog.tsx', type: 'file' },
            { name: 'dropdown-menu.tsx', type: 'file' },
            { name: 'input.tsx', type: 'file' },
            { name: 'select.tsx', type: 'file' },
            { name: 'table.tsx', type: 'file' },
            { name: 'tooltip.tsx', type: 'file' },
            { name: 'toast.tsx', type: 'file' },
            { name: 'skeleton.tsx', type: 'file' },
          ],
        },
        {
          name: 'layout/',
          type: 'folder',
          children: [
            { name: 'Sidebar.tsx', type: 'file', description: 'Collapsible desktop sidebar' },
            { name: 'BottomNav.tsx', type: 'file', description: 'Mobile bottom navigation' },
            { name: 'Header.tsx', type: 'file', description: 'Top header bar' },
            { name: 'Breadcrumb.tsx', type: 'file' },
          ],
        },
        {
          name: 'dashboard/',
          type: 'folder',
          children: [
            { name: 'KPICards.tsx', type: 'file', description: 'Financial KPI display' },
            { name: 'ExpenseChart.tsx', type: 'file', description: 'Spending trends chart' },
            { name: 'ShopComparison.tsx', type: 'file', description: 'Shop comparison widget' },
            { name: 'RecentBills.tsx', type: 'file', description: 'Recent transactions' },
            { name: 'BudgetProgress.tsx', type: 'file', description: 'Budget utilization' },
          ],
        },
        {
          name: 'shops/',
          type: 'folder',
          children: [
            { name: 'ShopCard.tsx', type: 'file' },
            { name: 'ShopForm.tsx', type: 'file' },
            { name: 'ShopGrid.tsx', type: 'file' },
            { name: 'TagManager.tsx', type: 'file', description: 'Tag CRUD modal' },
          ],
        },
        {
          name: 'bills/',
          type: 'folder',
          children: [
            { name: 'CSVUploader.tsx', type: 'file', description: 'Drag & drop CSV upload' },
            { name: 'BillTable.tsx', type: 'file' },
            { name: 'BillDetail.tsx', type: 'file' },
            { name: 'CSVValidator.tsx', type: 'file', description: 'Real-time parse validation' },
          ],
        },
        {
          name: 'analytics/',
          type: 'folder',
          children: [
            { name: 'PriceChart.tsx', type: 'file', description: 'Time-series price chart' },
            { name: 'ShopRanking.tsx', type: 'file', description: 'Best shop ranking' },
            { name: 'CategoryBreakdown.tsx', type: 'file' },
            { name: 'ConvenienceScore.tsx', type: 'file', description: 'Price+distance+availability' },
          ],
        },
        {
          name: 'gallery/',
          type: 'folder',
          children: [
            { name: 'MasonryGrid.tsx', type: 'file', description: 'Masonry image layout' },
            { name: 'Lightbox.tsx', type: 'file', description: 'Full-screen image preview' },
            { name: 'ImageUpload.tsx', type: 'file' },
          ],
        },
      ],
    },
    {
      name: 'lib/',
      type: 'folder',
      description: 'Utilities & configs',
      children: [
        { name: 'prisma.ts', type: 'file', description: 'Prisma client singleton' },
        { name: 'auth.ts', type: 'file', description: 'Auth utilities & helpers' },
        { name: 'csv-parser.ts', type: 'file', description: 'CSV parsing & validation' },
        { name: 'utils.ts', type: 'file', description: 'General utilities' },
        { name: 'validators.ts', type: 'file', description: 'Zod schemas' },
      ],
    },
    {
      name: 'stores/',
      type: 'folder',
      description: 'Zustand stores',
      children: [
        { name: 'useThemeStore.ts', type: 'file' },
        { name: 'useUIStore.ts', type: 'file' },
        { name: 'useBudgetStore.ts', type: 'file' },
      ],
    },
    {
      name: 'hooks/',
      type: 'folder',
      description: 'Custom React hooks',
      children: [
        { name: 'useShops.ts', type: 'file', description: 'TanStack Query hooks' },
        { name: 'useBills.ts', type: 'file' },
        { name: 'useAnalytics.ts', type: 'file' },
        { name: 'useBudgets.ts', type: 'file' },
        { name: 'useWarranties.ts', type: 'file' },
        { name: 'useMedia.ts', type: 'file' },
      ],
    },
    {
      name: 'types/',
      type: 'folder',
      children: [
        { name: 'index.ts', type: 'file', description: 'Shared TypeScript types' },
        { name: 'api.ts', type: 'file', description: 'API response types' },
      ],
    },
    { name: 'prisma/', type: 'folder', children: [
      { name: 'schema.prisma', type: 'file', description: 'Database schema' },
      { name: 'seed.ts', type: 'file', description: 'Seed data' },
    ]},
    { name: 'public/', type: 'folder', children: [
      { name: 'images/', type: 'folder' },
      { name: 'icons/', type: 'folder' },
    ]},
    { name: 'middleware.ts', type: 'file', description: 'Next.js middleware (auth)' },
    { name: 'tailwind.config.ts', type: 'file' },
    { name: 'next.config.ts', type: 'file' },
    { name: 'tsconfig.json', type: 'file' },
  ],
};

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);

  return (
    <div>
      <motion.div
        className="flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-opacity-50 transition-colors"
        style={{ 
          paddingLeft: `${depth * 20 + 8}px`,
          color: 'var(--text-primary)'
        }}
        onClick={() => node.type === 'folder' && setIsOpen(!isOpen)}
        whileHover={{ x: 2 }}
      >
        {node.type === 'folder' ? (
          <>
            <ChevronRight 
              className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
              style={{ color: 'var(--text-muted)' }}
            />
            <Folder className="w-4 h-4 text-yellow-500" />
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <File className="w-4 h-4 text-blue-400" />
          </>
        )}
        <span className="text-sm font-mono">{node.name}</span>
        {node.description && (
          <span className="text-xs ml-2 hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
            — {node.description}
          </span>
        )}
      </motion.div>
      {node.type === 'folder' && isOpen && node.children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {node.children.map((child) => (
            <TreeItem key={child.name} node={child} depth={depth + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function ComponentTree() {
  const componentHierarchy = [
    {
      name: 'Root Layout',
      children: [
        { name: 'ThemeProvider', children: ['QueryClientProvider', 'ToastProvider'] },
        { name: 'AuthProvider', children: ['SessionGuard', 'RBACGuard'] },
      ],
    },
    {
      name: 'Dashboard Layout',
      children: [
        { name: 'Sidebar / BottomNav' },
        { name: 'Header (search, notifications, profile)' },
        { name: 'Main Content Area', children: [
          { name: 'KPICards' },
          { name: 'ExpenseChart (Recharts)' },
          { name: 'ShopComparison' },
          { name: 'RecentBills' },
          { name: 'BudgetProgress' },
        ]},
      ],
    },
    {
      name: 'Shop Manager',
      children: [
        { name: 'ShopGrid', children: ['ShopCard[]'] },
        { name: 'ShopForm (Modal)', children: ['TagManager'] },
        { name: 'ShopDetail', children: ['BillTable', 'ShopImages'] },
      ],
    },
    {
      name: 'Bill Upload Flow',
      children: [
        { name: 'CSVUploader (drag-drop)' },
        { name: 'CSVValidator (real-time)' },
        { name: 'ShopSelector' },
        { name: 'PreviewTable' },
        { name: 'ConfirmUpload' },
      ],
    },
    {
      name: 'Unified Gallery',
      children: [
        { name: 'MasonryGrid' },
        { name: 'ImageUpload (multi)' },
        { name: 'Lightbox (fullscreen)' },
        { name: 'ImageFilter (type, date)' },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
          🌳 Component Tree & Folder Structure
        </h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Modular, feature-based architecture with clear separation between UI primitives, features, and business logic
        </p>
      </div>

      {/* File Tree */}
      <div className="rounded-2xl border p-4 sm:p-6 overflow-hidden" 
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Folder className="w-5 h-5 text-yellow-500" />
          Project File Structure
        </h3>
        <div className="max-h-[600px] overflow-y-auto pr-2">
          <TreeItem node={fileStructure} />
        </div>
      </div>

      {/* Component Hierarchy */}
      <div className="rounded-2xl border p-4 sm:p-6" 
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-lg mb-6" style={{ color: 'var(--text-primary)' }}>
          🧩 Component Hierarchy (Major Views)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentHierarchy.map((section, i) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="w-2 h-2 rounded-full bg-primary-500" />
                {section.name}
              </h4>
              <ComponentNode nodes={section.children || []} depth={0} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>📐 Design Patterns Used</h3>
          <ul className="space-y-2">
            {[
              'Compound Components (Dialog + Form)',
              'Render Props (DataGrid columns)',
              'Custom Hooks (useShops, useBills)',
              'Provider Pattern (Theme, Auth, Query)',
              'Container/Presentational split',
              'Optimistic Updates (TanStack Query)',
            ].map((pattern) => (
              <li key={pattern} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                {pattern}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>⚡ Performance Optimizations</h3>
          <ul className="space-y-2">
            {[
              'React.lazy() for route-level code splitting',
              'Dynamic imports for heavy charts',
              'Virtual scrolling for large tables',
              'Image optimization (next/image)',
              'Memoization (React.memo, useMemo)',
              'Debounced search inputs (300ms)',
            ].map((opt) => (
              <li key={opt} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {opt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ComponentNode({ nodes, depth }: { nodes: any[]; depth: number }) {
  return (
    <div className="space-y-1">
      {nodes.map((node) => {
        if (typeof node === 'string') {
          return (
            <div key={node} className="flex items-center gap-2 text-xs py-0.5" style={{ paddingLeft: `${depth * 12}px`, color: 'var(--text-secondary)' }}>
              <span className="w-1 h-1 rounded-full bg-primary-400" />
              <span className="font-mono">{node}</span>
            </div>
          );
        }
        return (
          <div key={node.name}>
            <div className="flex items-center gap-2 text-xs py-0.5" style={{ paddingLeft: `${depth * 12}px`, color: 'var(--text-primary)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              <span className="font-mono font-medium">{node.name}</span>
            </div>
            {node.children && <ComponentNode nodes={node.children} depth={depth + 1} />}
          </div>
        );
      })}
    </div>
  );
}
