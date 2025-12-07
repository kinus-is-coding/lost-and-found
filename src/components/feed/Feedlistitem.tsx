// components/feed/Feedlistitem.tsx

import React from 'react';
import Image from 'next/image';

// Define the interface for the data structure you expect from the backend
interface Post {
    id: number;
    author_username: string; // From the DRF serializer
    title: string;          // Post title
    location: string;
    image_url: string;      // Image URL
    created_at: string;     // Creation date
    // content is omitted as it's not displayed here
}

interface FeedlistitemProps {
    post: Post;
}

// 1. Accept the 'post' object via props and use TypeScript typing
const Feedlistitem: React.FC<FeedlistitemProps> = ({ post }) => {
    
    // Helper function to format the date string (optional but recommended)
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return 'Date N/A';
        }
    };

    return (
        <div className='cursor-pointer'>
            <div className=' relative overflow-hidden aspect-square rounded-xl'>
                <Image
                    fill
                    // 2. CHANGE: Use dynamic post.image_url
                    src={post.image_url || '/placeholder.png'} // Fallback to a placeholder image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    // 3. CHANGE: Use dynamic post.title for alt text
                    alt={post.title} 
                />
            </div>
            <div className='mt-2'>
                {/* 4. CHANGE: Use dynamic post.title */}
                <p className='text-lg font-bold'>{post.title}</p>
            </div>
            <div className='mt-2'>
                {/* 5. CHANGE: Use dynamic post.author_username and post.created_at */}
                <p className='text-sm text-gray-500'>
                    <strong>{post.location}</strong> · {formatDate(post.created_at)}
                </p>
            </div>
        </div>
    );
}

export default Feedlistitem