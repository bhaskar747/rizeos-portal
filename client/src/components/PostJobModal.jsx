// src/components/PostJobModal.jsx

import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import api from '@/api/index.js';


const ADMIN_WALLET_ADDRESS = import.meta.env.VITE_ADMIN_WALLET_ADDRESS;
const PLATFORM_FEE_SOL = 0.01;


const PostJobModal = ({ onClose, onJobPosted }) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected } = useWallet();
    
    // State for all form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('Remote');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const handlePostJob = async (e) => {
        e.preventDefault();
        setError('');
        if (!connected || !publicKey) {
            setError('Please ensure your Solana wallet is connected before posting!');
            return;
        }

        // --- DEBUGGING STEP 1: Log all critical variables ---
        console.log("--- DEBUGGING TRANSACTION ---");
        console.log("Is Wallet Connected:", connected);
        console.log("User's Public Key:", publicKey?.toBase58());
        console.log("Admin Wallet Address from .env:", ADMIN_WALLET_ADDRESS);
        console.log("Platform Fee (SOL):", PLATFORM_FEE_SOL);
        console.log("----------------------------");

        // --- DEFENSIVE CHECK for the Admin Wallet ---
        if (!ADMIN_WALLET_ADDRESS) {
            setError("Configuration error: Admin wallet address is not set. Please contact support.");
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(ADMIN_WALLET_ADDRESS),
                    lamports: PLATFORM_FEE_SOL * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');

            const jobData = {
                title,
                description,
                skills: skills.split(',').map(s => s.trim()).filter(Boolean),
                budget: Number(budget),
                location,
                transactionSignature: signature
            };
            
            const response = await api.post('/jobs/create', jobData);
            onJobPosted(response.data);
            onClose();
            
        } catch (err) {
            console.error('Job posting failed:', err);
            if (err.name === 'WalletSignTransactionError') {
                setError('Wallet transaction was rejected. Please try again.');
            } else {
                // Display the specific error message for easier debugging
                setError(`An unexpected error occurred: ${err.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };


    const inputStyle = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500";


    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Post a New Job</h2>
                <form onSubmit={handlePostJob} className="space-y-5">
                    {/* Your form inputs remain unchanged */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputStyle} placeholder="e.g., Senior React Developer" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className={inputStyle} rows="4" placeholder="Describe the job responsibilities..." required></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                        <input type="text" value={skills} onChange={e => setSkills(e.target.value)} className={inputStyle} placeholder="e.g., React, Node.js, Solana" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" value={location} onChange={e => setLocation(e.target.value)} className={inputStyle} placeholder="e.g., Remote, New York, London" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
                        <input type="number" value={budget} onChange={e => setBudget(e.target.value)} className={inputStyle} placeholder="e.g., 5000" required />
                    </div>

                    <p className="text-sm text-center text-gray-500 pt-2">A platform fee of <strong>{PLATFORM_FEE_SOL} SOL</strong> will be charged to post this job.</p>
                    
                    {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center text-sm">{error}</p>}
                    
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading || !connected} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-md hover:bg-indigo-700 transition-colors">
                            {isLoading ? 'Processing...' : `Pay & Post`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJobModal;

