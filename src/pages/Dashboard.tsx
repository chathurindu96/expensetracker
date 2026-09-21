import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Store, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { monthlyExpenses, categoryBreakdown, bills, shops } from '../lib/mockData';

export function Dashboard() {
  const totalSpent = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const avgPerBill = totalSpent / bills.length;
  const totalShops = shops.filter(s => !s.isArchived).length;

  const kpis = [
    { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, change: '+12%', trend: 'up', icon: DollarSign, color: '#3b82f6' },
    { label: 'Avg per Bill', value: `$${avgPerBill.toFixed(2)}`, change: '-5%', trend: 'down', icon: ShoppingCart, color: '#10b981' },
    { label: 'Active Shops', value: totalShops.toString(), change: '+2', trend: 'up', icon: Store, color: '#8b5cf6' },
    { label: 'Budget Alert', value: '68%', change: 'Active', trend: 'neutral', icon: AlertCircle, color: '#f59e0b' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Welcome back! Here's your expense overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-green-500' : kpi.trend === 'down' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : kpi.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{kpi.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 lg:col-span-2"
        >
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Monthly Expenses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  boxShadow: 'var(--card-shadow-hover)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="url(#gradient)" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryBreakdown.slice(0, 4).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                </div>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Bills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Bills</h3>
        <div className="space-y-3">
          {bills.slice(0, 5).map((bill) => (
            <div key={bill.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-opacity-50 transition-colors"
              style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'var(--accent-gradient)' }}>
                  {bill.shopName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{bill.shopName}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{bill.date} • {bill.itemCount} items</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>${bill.totalAmount.toFixed(2)}</div>
                {bill.discount > 0 && (
                  <div className="text-xs text-green-500">-${bill.discount.toFixed(2)} saved</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
