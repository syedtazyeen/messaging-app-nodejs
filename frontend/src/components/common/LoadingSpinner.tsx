import React from 'react';

const LoadingSpinner: React.FC<{ color?: string }> = ({ color = 'white' }) => {
    return (
        <div className={`w-5 h-5 border-2 border-t-2 border-[#8b8b8b20] ${color === 'white' ? 'border-t-white' : 'border-t-black'} rounded-full animate-spin`}></div>
    );
};

export default LoadingSpinner;
