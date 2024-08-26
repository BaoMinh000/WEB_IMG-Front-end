import React from 'react';
import './Loading.css'; // Import CSS cho component

const Loading = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    );
};

export default Loading;
