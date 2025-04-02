import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

const TrendingPosts = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const getTrendingPosts = async () => {
            const data = await fetchData();

            const sortedPosts = data.sort((a,b) => b.comments.length - a.comments.length);
            const maxComments = sortedPosts[0].comments.length;

            setTrendingPosts(sortedPosts.filter(post => post.comments.length === maxComments));
        };

        getTrendingPosts();
    }, []);

    return (
        <div className="trending-posts">
            <h2>Trending Posts</h2>
            <ul>
                {trendingPosts.map(post => (
                    <li key={post.id}>
                        Post ID: {post.id}, Comments: {post.comments.length}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingPosts;