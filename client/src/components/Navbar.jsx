import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current page's path

  // Determine if the user is on the login or register page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/70 backdrop-blur-lg border-b border-gray-700/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-3">
          <Briefcase className="text-indigo-400" size={26} />
          <span className="text-xl font-bold text-white">
            RizeOS Jobs
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          {user ? (
            // Displayed when the user is logged IN
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white font-medium transition-colors">Dashboard</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white font-medium transition-colors">Profile</Link>
              <WalletMultiButton style={{ backgroundColor: 'rgba(79, 70, 229, 0.2)', color: '#A5B4FC', fontWeight: '500', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.5)' }} />
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Logout
              </button>
            </>
          ) : (
            // Displayed when the user is logged OUT
            // The '!isAuthPage' condition hides the buttons on the login/register pages
            !isAuthPage && (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-300 hover:text-white font-semibold transition-colors px-4 py-2">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-shadow shadow-sm hover:shadow-lg font-semibold">
                  Register
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
