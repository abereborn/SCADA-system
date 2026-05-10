import { useState } from 'react';
import { Users, Shield, Server, Activity, Plus, Edit2, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

const MOCK_USERS = [
  { id: 'USR-001', name: 'Admin Manager', email: 'admin@scada.com', role: 'Master Admin', status: 'active', lastLogin: '2026-05-05 08:30' },
  { id: 'USR-002', name: 'John Engineer', email: 'john.e@scada.com', role: 'Operator', status: 'active', lastLogin: '2026-05-05 10:15' },
  { id: 'USR-003', name: 'Sarah Tech', email: 'sarah.t@scada.com', role: 'Technician', status: 'inactive', lastLogin: '2026-05-02 16:45' },
  { id: 'USR-004', name: 'Mike Observer', email: 'mike.o@scada.com', role: 'Viewer', status: 'active', lastLogin: '2026-05-05 09:00' },
];

export function AdminDashboardPage() {
  const [users] = useState(MOCK_USERS);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-8">
        <div className="flex items-center gap-3 text-rose-500">
          <ShieldAlert className="h-6 w-6" />
          <div>
            <h3 className="font-bold">Master Admin Area</h3>
            <p className="text-sm opacity-80">Restricted access zone. Changes here affect the entire system.</p>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+2 this week</span>
          </div>
          <h4 className="text-3xl font-bold text-foreground">24</h4>
          <p className="text-sm text-muted-foreground mt-1">Total Registered Users</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
          <h4 className="text-3xl font-bold text-foreground">18</h4>
          <p className="text-sm text-muted-foreground mt-1">Active Sessions</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Shield className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <h4 className="text-3xl font-bold text-foreground">4</h4>
          <p className="text-sm text-muted-foreground mt-1">Role Profiles</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Server className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Healthy
            </span>
          </div>
          <h4 className="text-3xl font-bold text-foreground">99.9%</h4>
          <p className="text-sm text-muted-foreground mt-1">System Health</p>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">User Management</h3>
            <p className="text-sm text-muted-foreground mt-1">Manage system access and roles</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
            <Plus className="h-4 w-4" /> Add User
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Login</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.role === 'Master Admin' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      user.role === 'Operator' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                      <span className="capitalize text-muted-foreground">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
