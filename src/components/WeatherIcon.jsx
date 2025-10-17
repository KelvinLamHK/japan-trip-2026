import React from 'react';

const WeatherIcon = () => {
  return (
    <div className="inline-flex items-center ml-2">
      <svg 
        className="w-4 h-4 text-teal-500" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M10 2L12.5 7.5L18 10L12.5 12.5L10 18L7.5 12.5L2 10L7.5 7.5L10 2Z" />
      </svg>
      <span className="ml-1 text-xs text-teal-500 font-medium">天氣影響</span>
    </div>
  );
};

export default WeatherIcon;
