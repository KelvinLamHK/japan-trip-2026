import React, { useState } from 'react';

const HotelPopup = ({ hotelDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!hotelDetail) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-3 py-1 text-sm font-medium text-teal-600 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors duration-200"
      >
        🏨 住宿詳情
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">住宿詳情</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{hotelDetail}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelPopup;
