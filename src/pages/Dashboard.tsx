import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Store, AlertCircle, Calendar, Target, Zap, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { monthlyExpenses, categoryBreakdown, bills, shops, budgets } from '../lib/mockData';

export function Dashboard() {
  const totalSpent = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const avgPerBill = totalSpent / bills.length;
  const totalShops = shops.filter(s => !s.isArchived).length;
  const totalSavings = bills.reduce((sum, bill) => sum + bill.discount, 0);
  const activeBudget = budgets.find(b => b.status === 'ACTIVE');
  const budgetProgress = activeBudget ? (activeBudget.spent / activeBudget.amount) * 100 : 0;

  const kpis = [
    { 
      label: 'Total Spent', 
      value: `$${totalSpent.toFixed(2)}`, 
      change: '+12.5%', 
      trend: 'up', 
      icon: DollarSign, 
      color: '#3b82f6',
      subtitle: 'This month'
    },
    { 
      label: 'Avg per Bill', 
      value: `$${avgPerBill.toFixed(2)}`, 
      change: '-5.2%', 
      trend: 'down', 
      icon: ShoppingCart, 
      color: '#10b981',
      subtitle: 'Per transaction'
    },
    { 
      label: 'Active Shops', 
      value: totalShops.toString(), 
      change: '+2', 
      trend: 'up', 
      icon: Store, 
      color: '#8b5cf6',
      subtitle: 'Tracked stores'
    },
    { 
      label: 'Total Savings', 
      value: `$${totalSavings.toFixed(2)}`, 
      change: '+18%', 
      trend: 'up', 
      icon: Target, 
      color: '#f59e0b',
      subtitle: 'From discounts'
    },
  ];

  const weeklyData = [
    { day: 'Mon', amount: 45 },
    { day: 'Tue', amount: 62 },
    { day: 'Wed', amount: 38 },
    { day: 'Thu', amount: 71 },
    { day: 'Fri', amount: 89 },
    { day: 'Sat', amount: 124 },
    { day: 'Sun', amount: 56 },
  ];

  const topShops = shops
    .filter(s => !s.isArchived)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  const recentActivity = [
    { type: 'bill', shop: 'FreshMart', amount: 85.50, time: '2 hours ago', icon: '🧾' },
    { type: 'shop', shop: 'LocalGreens', amount: null, time: '5 hours ago', icon: '🏪' },
    { type: 'budget', shop: 'Monthly Groceries', amount: 342.50, time: '1 day ago', icon: '💰' },
    { type: 'bill', shop: 'MegaStore', amount: 210.00, time: '2 days ago', icon: '🧾' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Welcome back! Here's your expense overview for January 2024.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <Calendar className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <span style={{ color: 'var(--text-secondary)' }}>January 2024</span>
        </div>
      </motion.div>

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
              className="card p-5 relative overflow-hidden group"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: kpi.color, transform: 'translate(30%, -30%)' }} />
              
              <div className="flex items-start justify-between mb-3 relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                  style={{ backgroundColor: `${kpi.color}15` }}>
                  <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  kpi.trend === 'up' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              
              <div className="relative">
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {kpi.value}
                </div>
                <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {kpi.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {kpi.subtitle}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Expenses Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Monthly Expenses</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Last 6 months trend</p>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent-gradient)' }} />
              <span>Spending</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyExpenses}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="url(#gradient)" 
                strokeWidth={3}
                fill="url(#colorAmount)"
                dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Category Breakdown</h3>
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
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                </div>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Spending Pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Weekly Pattern</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>This week's spending</p>
            </div>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px'
                }}
              />
              <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Budget Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Budget Status</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {activeBudget?.name || 'No active budget'}
              </p>
            </div>
            <Target className="w-5 h-5 text-primary-500" />
          </div>
          
          {activeBudget && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    ${activeBudget.spent.toFixed(0)}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    of ${activeBudget.amount.toFixed(0)} budget
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    budgetProgress > 90 ? 'text-red-500' : 
                    budgetProgress > 70 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`}>
                    {budgetProgress.toFixed(0)}%
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    ${(activeBudget.amount - activeBudget.spent).toFixed(0)} left
                  </div>
                </div>
              </div>
              
              <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(budgetProgress, 100)}%` }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ 
                    background: budgetProgress > 90 ? '#ef4444' : 
                               budgetProgress > 70 ? '#f59e0b' : 
                               'var(--accent-gradient)'
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-center">
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Daily Avg</div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    ${(activeBudget.spent / 19).toFixed(0)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Days Left</div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>12</div>
                </div>
                <div className="text-center">
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Status</div>
                  <div className={`text-sm font-bold ${
                    budgetProgress > 90 ? 'text-red-500' : 
                    budgetProgress > 70 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`}>
                    {budgetProgress > 90 ? 'Critical' : budgetProgress > 70 ? 'Warning' : 'Good'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Shops */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Top Shops</h3>
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {topShops.map((shop, i) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                  i === 1 ? 'bg-gray-400/20 text-gray-500' :
                  i === 2 ? 'bg-orange-500/20 text-orange-600' :
                  'bg-primary-500/10 text-primary-500'
                }`}>
                  #{i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{shop.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{shop.totalBills} bills</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    ${shop.totalSpent.toFixed(0)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Bills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card p-6"
        >
          <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Recent Bills</h3>
          <div className="space-y-3">
            {bills.slice(0, 5).map((bill, i) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-opacity-50 transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'var(--accent-gradient)' }}>
                  {bill.shopName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{bill.shopName}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {bill.date} • {bill.itemCount} items
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    ${bill.totalAmount.toFixed(2)}
                  </div>
                  {bill.discount > 0 && (
                    <div className="text-xs text-green-500">-${bill.discount.toFixed(2)}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="card p-6"
        >
          <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {activity.shop}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {activity.time}
                  </div>
                </div>
                {activity.amount && (
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    ${activity.amount.toFixed(2)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
