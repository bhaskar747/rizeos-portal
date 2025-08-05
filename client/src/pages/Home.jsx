
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to the Future of Work</h1>
      <p className="text-xl text-gray-600 mb-8">
        The premier Job & Networking Portal powered by Web3 and AI.
      </p>
      <div className="space-x-4">
        <Link to="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700">
          Get Started
        </Link>
        <Link to="/login" className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-50">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
