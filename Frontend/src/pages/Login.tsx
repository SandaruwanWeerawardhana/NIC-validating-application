import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Fingerprint } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }
        await new Promise(r => setTimeout(r, 800)); // Fake loading
        const success = await login(username, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md glass-card p-8 animate-enter relative overflow-hidden">
                {/* Decorative background glow inside card */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center mb-6 text-blue-400 shadow-inner">
                            <Fingerprint size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-400">Sign in to validate identities</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="bg-black/20"
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="bg-black/20"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20 animate-enter">{error}</p>}
                        <Button type="submit" className="w-full h-12 text-lg shadow-blue-900/20" size="lg">
                            Sign In
                        </Button>
                    </form>
                    <div className="mt-8 text-center text-xs text-slate-500">
                        <p>Protected System • Authorized Personnel This Only</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
