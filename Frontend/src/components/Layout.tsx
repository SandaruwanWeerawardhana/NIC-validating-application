import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, CreditCard, LogOut, Menu, X, PlusCircle } from 'lucide-react';
import { Button } from './Button';

export const Layout = () => {
    const logout = useAuthStore((state) => state.logout);
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/validate', label: 'Validate NIC', icon: CreditCard },
        { path: '/add', label: 'Add NIC Data', icon: PlusCircle }, 
    ];

    return (
        <div className="min-h-screen flex flex-col md:flex-row animate-enter bg-[#0f172a]">
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-30">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">NIC Validator</h1>
                <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="p-2">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            <aside className="w-72 bg-slate-900/30 backdrop-blur-xl border-r border-white/5 hidden md:flex flex-col sticky top-0 h-screen z-10">
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

                <div className="p-6 border-t border-red-500/80 bg-black/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <button 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default" 
                        onClick={toggleMobileMenu}
                        aria-label="Close menu"
                    />

                    <aside className="absolute top-0 left-0 w-3/4 max-w-sm h-full bg-slate-900/90 backdrop-blur-xl border-r border-white/10 flex flex-col animate-enter slide-right shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h1 className="text-xl font-bold text-white">Menu</h1>
                            <button onClick={toggleMobileMenu} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex-1 p-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={toggleMobileMenu}
                                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isActive
                                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <Icon size={22} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="p-4 border-t border-white/5">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            <main className="flex-1 p-4 md:p-8 overflow-auto h-[calc(100vh-64px)] md:h-screen w-full scroll-smooth">
                <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-enter stagger-1 pb-20 md:pb-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
