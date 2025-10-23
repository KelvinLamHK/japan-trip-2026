import React, { useState } from 'react';

const LocationInfo = ({ location }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!location) return null;

  const handleLocationClick = () => {
    window.open(location.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-blue-100 rounded-lg p-2 -m-2 transition-colors duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h5 className="text-lg sm:text-xl font-bold text-blue-800">位置資訊</h5>
        </div>
        <div className="flex-shrink-0">
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 transition-transform duration-200"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="space-y-3 mt-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm sm:text-base text-gray-600 mb-1">地點名稱</p>
              <p className="text-base sm:text-lg font-semibold text-gray-800">{location.name}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm sm:text-base text-gray-600 mb-1">Mapcode</p>
              <p className="text-base sm:text-lg text-gray-700 font-mono">{location.mapcode}</p>
            </div>
          </div>
          
          <button
            onClick={handleLocationClick}
            className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-sm sm:text-base">在Google地圖中查看</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationInfo;
