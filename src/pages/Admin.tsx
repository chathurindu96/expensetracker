import { motion } from 'framer-motion';
import { Users, Shield, Activity, Database, UserCheck, UserX } from 'lucide-react';

export function AdminPage() {
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'SUPER_ADMIN', status: 'active', lastLogin: '2024-01-19' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'ADMIN', status: 'active', lastLogin: '2024-01-18' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'USER', status: 'active', lastLogin: '2024-01-17' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'USER', status: 'inactive', lastLogin: '2024-01-10' },
    { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'USER', status: 'active', lastLogin: '2024-01-19' },
  ];

  const roleColors = {
    SUPER_ADMIN: 'bg-red-500/10 text-red-600',
    ADMIN: 'bg-yellow-500/10 text-yellow-600',
    USER: 'bg-blue-500/10 text-blue-600',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Admin Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          System oversight and user management
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '156', icon: Users, color: '#3b82f6' },
          { label: 'Active Sessions', value: '42', icon: Activity, color: '#10b981' },
          { label: 'Admin Users', value: '8', icon: Shield, color: '#8b5cf6' },
          { label: 'DB Size', value: '2.4 GB', icon: Database, color: '#f59e0b' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card overflow-hidden"
      >
        <div className="p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>User Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>User</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Last Login</th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {users.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-opacity-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'var(--accent-gradient)' }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{user.name}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${roleColors[user.role as keyof typeof roleColors]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <UserCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <UserX className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm capitalize" style={{ color: 'var(--text-secondary)' }}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs px-3 py-1.5 rounded-lg font-medium border transition-all hover:scale-105"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      Edit
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
