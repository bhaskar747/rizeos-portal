import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import api from '@/api/index.js';

const Profile = () => {
    const { user, fetchUserProfile } = useAuth();
    const { publicKey } = useWallet();
    const [formData, setFormData] = useState({ name: '', email: '', bio: '', linkedinUrl: '', skills: [], walletAddress: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                linkedinUrl: user.linkedinUrl || '',
                skills: user.skills || [],
                walletAddress: user.walletAddress || ''
            });
        }
    }, [user]);

    useEffect(() => {
        if (publicKey && formData.walletAddress !== publicKey.toBase58()) {
            setFormData(prev => ({ ...prev, walletAddress: publicKey.toBase58() }));
        }
    }, [publicKey, formData.walletAddress]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillsChange = (e) => {
        setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) });
    };

    const handleExtractSkills = async () => {
        if (!formData.bio) {
            setMessage('Please enter a bio to extract skills from.');
            return;
        }
        try {
            const { data } = await api.post('/ai/extract-skills', { bio: formData.bio });
            const currentSkills = new Set(formData.skills);
            const newSkillsFound = data.skills.filter(skill => !currentSkills.has(skill));

            if (newSkillsFound.length > 0) {
                const allSkills = [...formData.skills, ...newSkillsFound];
                setFormData({ ...formData, skills: allSkills });
                setMessage(`Success! Added: ${newSkillsFound.join(', ')}`);
            } else {
                setMessage('No new skills were found in the bio.');
            }
        } catch (error) {
            setMessage('An error occurred while extracting skills.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/auth/profile', formData);
            await fetchUserProfile();
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Failed to update profile.');
        }
    };

    const inputStyle = "w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const disabledInputStyle = "w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-400 cursor-not-allowed";


    if (!user) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white">Your Profile</h2>
            {message && <p className="mb-4 p-3 bg-indigo-500/20 text-indigo-300 rounded-lg">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} disabled className={disabledInputStyle} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Wallet Address</label>
                    <input type="text" name="walletAddress" value={formData.walletAddress} disabled className={disabledInputStyle} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn URL</label>
                    <input type="text" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} className={inputStyle} rows="4"></textarea>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Skills (comma-separated)</label>
                    <input type="text" value={formData.skills.join(', ')} onChange={handleSkillsChange} className={inputStyle} />
                </div>
                <div className="flex items-center justify-between pt-4">
                    <button type="button" onClick={handleExtractSkills} className="bg-teal-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-600">
                        Extract Skills (AI)
                    </button>
                    <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700">
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
