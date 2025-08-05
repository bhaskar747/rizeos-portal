

import React from 'react';
import { ThumbsUp } from 'lucide-react';
import api from '@/api/index.js';

const PostCard = ({ post, onLike }) => {
   
    if (!post || !post.author) {
        return null; 
    }

    const handleLike = async () => {
        try {
            
            const { data } = await api.put(`/posts/${post._id}/like`);
            onLike(data); 
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    };

    
    const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric'
    });

    
    const authorName = post.author?.name || 'Anonymous';
    const authorInitial = authorName.charAt(0);

    return (
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-3">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-white">
                    {/* We now use the safe variables */}
                    {authorInitial}
                </div>
                <div>
                    <p className="font-semibold text-white">{authorName}</p>
                    <p className="text-xs text-gray-400">{postDate}</p>
                </div>
            </div>
            <p className="text-gray-300 text-sm">{post.content}</p>
            <div className="flex items-center space-x-2 pt-2">
                <button onClick={handleLike} className="flex items-center space-x-1.5 text-gray-400 hover:text-indigo-400">
                    <ThumbsUp size={16} />
                    {/* The likes array will always exist, so .length is safe here */}
                    <span className="text-sm">{post.likes.length}</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
