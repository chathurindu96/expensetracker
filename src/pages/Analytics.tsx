import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Award, MapPin, Package } from 'lucide-react';
import { priceHistory, shops } from '../lib/mockData';

export function AnalyticsPage() {
  // Transform price history for chart
  const chartData = priceHistory.reduce((acc: any[], item) => {
    const existing = acc.find(d => d.date === item.date);
    if (existing) {
      existing[item.shop] = item.price;
    } else {
      acc.push({ date: item.date, [item.shop]: item.price });
    }
    return acc;
  }, []);

  // Shop rankings
  const shopRankings = shops
    .filter(s => !s.isArchived)
    .map(shop => ({
      ...shop,
      avgPrice: (shop.totalSpent / shop.totalBills).toFixed(2),
      convenienceScore: Math.round(shop.rating * 20 + (1000 / (shop.totalBills + 1))),
    }))
    .sort((a, b) => b.convenienceScore - a.convenienceScore);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Compare prices, track trends, and find the best shops
        </p>
      </div>

      {/* Price Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Price Tracking — Organic Milk</h3>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={11} />
            <YAxis stroke="var(--text-muted)" fontSize={11} domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="FreshMart" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="MegaStore" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="LocalGreens" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="QuickShop" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="ValueMart" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Shop Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Shop Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Shop Rankings</h3>
          </div>
          <div className="space-y-3">
            {shopRankings.slice(0, 5).map((shop, i) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
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
                  <div className="text-xs flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span>Avg: ${shop.avgPrice}</span>
                    <span>•</span>
                    <span>Score: {shop.convenienceScore}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Rating</div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{shop.rating}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Convenience Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Expense by Shop</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={shopRankings.slice(0, 5).map(s => ({ name: s.name, spent: s.totalSpent }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px'
                }}
              />
              <Bar dataKey="spent" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Convenience Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Convenience Score Factors</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { factor: 'Price Competitiveness', weight: '40%', desc: 'Average item prices compared to market', color: '#3b82f6' },
            { factor: 'Location & Distance', weight: '30%', desc: 'Proximity to home/work locations', color: '#10b981' },
            { factor: 'Item Availability', weight: '30%', desc: 'Range of items in stock consistently', color: '#8b5cf6' },
          ].map((item, i) => (
            <div key={item.factor} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.factor}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  {item.weight}
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
