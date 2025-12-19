import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, CreditCard, FileText, LogOut } from 'lucide-react';

export const Layout = () => {
    const { logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/validate', label: 'Validate NIC', icon: CreditCard },
        { path: '/reports', label: 'Reports', icon: FileText },
    ];

    return (
        <div className="min-h-screen flex animate-enter">
            {/* Glass Sidebar */}
            <aside className="w-72 bg-slate-900/30 backdrop-blur-xl border-r border-white/5 hidden md:flex flex-col z-10">
                <div className="p-8 border-b border-white/5">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">NIC Validator</h1>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10 border border-blue-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                                    }`}
                            >
                                <Icon size={22} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/5 bg-black/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto h-screen scroll-smooth">
                <div className="max-w-6xl mx-auto space-y-8 animate-enter stagger-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
