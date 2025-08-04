import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import api from '@/api/index.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateName = (name) => {
    // This validation prevents email-like strings in the name field.
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(name)) {
      return 'Name can only contain letters and spaces.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const nameError = validateName(name);
    if (nameError) {
      setError(nameError);
      return;
    }

    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to register. The user may already exist.');
    }
  };

  const inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              type="password"
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
            Create Account
          </button>
           <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
