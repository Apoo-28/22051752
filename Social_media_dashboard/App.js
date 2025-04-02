import React from 'react';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';

const App = () => {
    return (
        <div className="app-container">
            <h1>Social Media Analytics Dashboard</h1>
            <TopUsers />
            <TrendingPosts />
            <Feed />
        </div>
    );
};

export default App;