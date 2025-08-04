import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import api from '@/api/index.js';
import { Briefcase, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  // FINAL FIX: Added text-gray-900 to ensure input text is visible
  const inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="relative flex w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-indigo-600 text-white p-12 text-center">
            <Briefcase size={60} />
            <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
            <p className="mt-2 opacity-80">Log in to access your dashboard and connect with the future of work.</p>
        </div>
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</p>}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      required
                      className={inputStyle}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password" // FINAL FIX: Ensures password is masked
                      required
                      className={inputStyle}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
                >
                    Sign in
                </button>
                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:underline">
                    Register here
                    </Link>
                </p>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
