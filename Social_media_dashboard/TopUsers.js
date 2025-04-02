import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const getTopUsers = async () => {
            const data = await fetchData();
            const userPostCounts = {};

            data.forEach(post => {
                userPostCounts[post.userId] = (userPostCounts[post.userId] || 0) + 1;
            });

            const sortedUsers = Object.entries(userPostCounts).sort((a,b) => b[1] - a[1]).slice(0,5).map(([userId, postCount]) => ({ userId, postCount}));
            setTopUsers(sortedUsers);
            
        };

        getTopUsers();
    }, []);

    return (
        <div className="top-users">
            <h2>Top Users</h2>
            <ul>
                {topUsers.map(user => (
                    <li key={user.userId}>
                        User ID: {user.userId}, Posts: {user.postCount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;