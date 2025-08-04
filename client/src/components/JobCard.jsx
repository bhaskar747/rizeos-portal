import React, { useState, useEffect } from 'react';
import { DollarSign, BrainCircuit, MapPin, Briefcase } from 'lucide-react';
import api from '@/api/index.js';
import { useAuth } from '@/context/AuthContext';

const JobCard = ({ job }) => {
  const { user } = useAuth();
  const [matchScore, setMatchScore] = useState(0);

  useEffect(() => {
    const getScore = async () => {
      if (user && user.skills && user.skills.length > 0) {
        try {
          const { data } = await api.post('/ai/match-score', { jobSkills: job.skills });
          setMatchScore(data.matchScore);
        } catch (error) {
          console.error("Failed to get match score", error);
        }
      }
    };
    getScore();
  }, [user, job.skills]);

  const scoreColor = matchScore > 75 ? 'bg-teal-400' : matchScore > 50 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500 transition-all duration-300 flex flex-col p-6 space-y-5 group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{job.title}</h3>
          <p className="text-sm text-gray-400 flex items-center mt-1">
            <Briefcase size={14} className="mr-2" />
            {job.postedBy?.name || 'RizeOS Employer'}
          </p>
          <p className="text-sm text-gray-400 flex items-center mt-1">
            <MapPin size={14} className="mr-2" />
            {job.location}
          </p>
        </div>
        <div className="text-xl font-bold text-teal-300">
          ${job.budget}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {job.skills.slice(0, 3).map(skill => (
          <span key={skill} className="bg-gray-700 text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
            <span className="bg-indigo-900/50 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed flex-grow">
        {job.description.substring(0, 100)}...
      </p>

      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center"><BrainCircuit size={14} className="mr-2"/> Match Score</h4>
          <span className={`text-sm font-bold ${matchScore > 75 ? 'text-teal-300' : 'text-white'}`}>{matchScore}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full ${scoreColor} transition-all duration-500`}
            style={{ width: `${matchScore}%` }}
          ></div>
        </div>
      </div>
      
      <button className="w-full mt-2 bg-indigo-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-2">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
