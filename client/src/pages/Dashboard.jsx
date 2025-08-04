import React, { useState, useEffect } from 'react';
import api from '@/api/index.js';
import JobCard from '@/components/JobCard';
import PostJobModal from '@/components/PostJobModal';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import { PlusCircle, Search, MapPin, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    
    // State for filter values
    const [locationFilter, setLocationFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Build the params object for the API request
                const params = {
                    location: locationFilter,
                    q: searchQuery,
                };

                const [jobsRes, postsRes] = await Promise.all([
                    api.get('/jobs', { params }), // Pass filters to the API call
                    api.get('/posts')
                ]);
                setJobs(jobsRes.data);
                setPosts(postsRes.data);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
        };
        fetchDashboardData();
    }, [locationFilter, searchQuery]); // Re-fetch when filters change

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handlePostLiked = (updatedPost) => {
        setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
    };

    const handleJobPosted = (newJob) => {
        setJobs([newJob, ...jobs]);
    };

    const locations = ["Remote", "New York", "London", "San Francisco", "Berlin", "Tokyo"];

    return (
        <div className="w-full container mx-auto px-4 py-8">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Welcome, {user?.name || 'Developer'}!</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Content: Job Listings (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                            <input 
                                type="text" 
                                placeholder="Search by title, skill..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div className="relative w-full md:w-auto md:min-w-[200px]">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                            <select 
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-10 text-white focus:ring-2 focus:ring-indigo-500 appearance-none"
                            >
                                <option value="">All Locations</option>
                                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20}/>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-lg"
                        >
                            <PlusCircle size={20} />
                            <span className="font-semibold">Post Job</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jobs.length > 0 ? (
                            jobs.map(job => <JobCard key={job._id} job={job} />)
                        ) : (
                            <p className="md:col-span-2 text-center text-gray-400 py-10">No jobs found for the selected filters.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar: Community Feed (1/3 width) */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-2xl font-bold text-white">Community Feed</h2>
                    <CreatePost onPostCreated={handlePostCreated} />
                    <div className="space-y-4">
                        {posts.map(post => <PostCard key={post._id} post={post} onLike={handlePostLiked} />)}
                    </div>
                </div>
            </div>

            {isModalOpen && <PostJobModal onClose={() => setIsModalOpen(false)} onJobPosted={handleJobPosted} />}
        </div>
    );
};

export default Dashboard;
