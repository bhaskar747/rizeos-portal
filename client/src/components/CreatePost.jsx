import React, { useState } from 'react';
import api from '@/api/index.js';

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        try {
            const { data } = await api.post('/posts', { content });
            onPostCreated(data); 
            setContent(''); 
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return (
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full bg-gray-700 text-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    rows="3"
                    placeholder="Share some career advice or an update..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="text-right mt-2">
                    <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
