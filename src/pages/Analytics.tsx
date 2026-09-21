import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Award, MapPin, Package, Search, ShoppingBag } from 'lucide-react';
import { priceHistory, shops, billItems } from '../lib/mockData';

export function AnalyticsPage() {
  const [selectedItem, setSelectedItem] = useState<string>('Organic Milk');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique items from billItems
  const availableItems = Array.from(new Set(billItems.map(bi => bi.itemName)));
  
  // Filter items based on search
  const filteredItems = availableItems.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate price comparison data for selected item across shops
  const generatePriceComparison = (itemName: string) => {
    // Base prices for different categories
    const categoryPrices: Record<string, number[]> = {
      'Dairy': [4.50, 4.25, 4.75, 5.10, 3.99],
      'Fruits': [2.50, 2.20, 2.80, 3.00, 1.99],
      'Vegetables': [3.20, 2.95, 3.50, 3.80, 2.75],
      'Meat': [8.99, 8.50, 9.50, 10.20, 7.99],
      'Grains': [5.50, 5.25, 5.75, 6.10, 4.99],
      'Bakery': [3.99, 3.75, 4.25, 4.50, 3.50],
    };

    // Determine category from item name
    let category = 'Dairy'; // default
    if (itemName.toLowerCase().includes('milk') || itemName.toLowerCase().includes('cheese') || itemName.toLowerCase().includes('egg')) {
      category = 'Dairy';
    } else if (itemName.toLowerCase().includes('apple') || itemName.toLowerCase().includes('banana') || itemName.toLowerCase().includes('orange')) {
      category = 'Fruits';
    } else if (itemName.toLowerCase().includes('tomato') || itemName.toLowerCase().includes('carrot') || itemName.toLowerCase().includes('lettuce')) {
      category = 'Vegetables';
    } else if (itemName.toLowerCase().includes('chicken') || itemName.toLowerCase().includes('beef') || itemName.toLowerCase().includes('fish')) {
      category = 'Meat';
    } else if (itemName.toLowerCase().includes('rice') || itemName.toLowerCase().includes('pasta') || itemName.toLowerCase().includes('bread')) {
      category = 'Grains';
    }

    const basePrices = categoryPrices[category] || categoryPrices['Dairy'];
    
    // Add variation based on item name hash
    const hash = itemName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variation = (hash % 20 - 10) * 0.05; // -0.50 to +0.50 variation
    
    const shopPrices = [
      { shop: 'FreshMart', basePrice: basePrices[0] },
      { shop: 'MegaStore', basePrice: basePrices[1] },
      { shop: 'LocalGreens', basePrice: basePrices[2] },
      { shop: 'QuickShop', basePrice: basePrices[3] },
      { shop: 'ValueMart', basePrice: basePrices[4] },
    ];

    return shopPrices.map((sp, index) => ({
      shop: sp.shop,
      price: parseFloat((sp.basePrice + variation + (index * 0.1)).toFixed(2)),
      availability: index === 3 ? 'Low Stock' : 'In Stock',
      lastUpdated: `2024-01-${20 - index}`,
    })).sort((a, b) => a.price - b.price);
  };

  const priceComparison = generatePriceComparison(selectedItem);
  const cheapestShop = priceComparison[0];

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

      {/* Price Comparison Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Price Comparison</h3>
        </div>

        {/* Item Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Select Item to Compare
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-10 mb-2"
            />
          </div>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {filteredItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => setSelectedItem(item)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedItem === item ? 'text-white shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: selectedItem === item ? 'var(--color-primary-500)' : 'var(--bg-secondary)',
                  color: selectedItem === item ? '#fff' : 'var(--text-secondary)',
                  boxShadow: selectedItem === item ? '0 4px 12px rgba(59,130,246,0.3)' : 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Item Display */}
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Selected Item</div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{selectedItem}</div>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Best Price</div>
              <div className="text-lg font-bold text-green-500">${cheapestShop.price.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-yellow-500" />
            <span style={{ color: 'var(--text-secondary)' }}>
              Cheapest at <strong style={{ color: 'var(--text-primary)' }}>{cheapestShop.shop}</strong>
            </span>
          </div>
        </div>

        {/* Price Comparison Table */}
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Rank</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Shop</th>
                <th className="text-right px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Price</th>
                <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Availability</th>
                <th className="text-right px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {priceComparison.map((item, i) => (
                <motion.tr
                  key={item.shop}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={i === 0 ? 'bg-green-500/5' : ''}
                >
                  <td className="px-4 py-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                      i === 1 ? 'bg-gray-400/20 text-gray-500' :
                      i === 2 ? 'bg-orange-500/20 text-orange-600' :
                      'bg-primary-500/10 text-primary-500'
                    }`}>
                      #{i + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'var(--accent-gradient)' }}>
                        {item.shop.charAt(0)}
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.shop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-bold ${i === 0 ? 'text-green-500' : ''}`} style={{ color: i === 0 ? undefined : 'var(--text-primary)' }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`badge ${
                      item.availability === 'In Stock' ? 'bg-green-500/10 text-green-600' :
                      'bg-yellow-500/10 text-yellow-600'
                    }`}>
                      {item.availability}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs" style={{ color: 'var(--text-muted)' }}>
                    {item.lastUpdated}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Price History Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
          transition={{ delay: 0.3 }}
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

        {/* Expense by Shop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
        transition={{ delay: 0.5 }}
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
