import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

const Feed = () => {
    const [feedPosts, setFeedPosts] = useState([]);

    useEffect(() => {
        const getFeedPosts = async () => {
            const data = await fetchData();
            setFeedPosts(data);
        };

        getFeedPosts();

        const intervalId = setInterval(getFeedPosts, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="feed">
            <h2>Feed</h2>
            <ul>
                {feedPosts.map(post => (
                    <li key={post.id}>
                        Post ID: {post.id}, Content: {post.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feed;