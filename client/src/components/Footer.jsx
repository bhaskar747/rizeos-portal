import React from 'react';
import { Briefcase, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // FINAL FIX: Using a dark background with light text for a professional look.
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Branding */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="text-indigo-400" size={28} />
              <span className="text-xl font-bold text-white">
                RizeOS Jobs
              </span>
            </div>
            <p className="text-sm text-gray-400">The future of work, powered by Web3 and AI.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-400 transition-colors">My Profile</Link></li>
              {/* This button could open the PostJobModal in the future */}
              <li><button className="hover:text-indigo-400 transition-colors text-left">Post a Job</button></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; 2025 RizeOS Portal. All Rights Reserved.</p>
          <p className="text-sm text-gray-500 mt-4 md:mt-0">Built for the Core Team Assessment</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
