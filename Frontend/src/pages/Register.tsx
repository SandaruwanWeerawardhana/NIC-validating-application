import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { UserPlus } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const registerViaApi = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.authLoading);
  const authError = useAuthStore((state) => state.authError);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!name || !email || !password) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    const success = await registerViaApi(name, email, password);
    if (success) {
      alert("Registration successful! Please log in.");  
      navigate("/login");
    } else {
      setLocalError(authError || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 animate-enter relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl border border-white/10 flex items-center justify-center mb-6 text-emerald-400 shadow-inner">
              <UserPlus size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-400">Join to start validating</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="bg-black/20"
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="bg-black/20"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-black/20"
            />

            {localError && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20 animate-enter">
                {localError}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-lg shadow-emerald-900/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
              size="lg"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
