import React, { useState, useEffect } from 'react';

const Header = ({ itinerary }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDay = (dayIndex) => {
    const element = document.getElementById(`day-${dayIndex + 1}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      }`}
    >
      <div className="w-full px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - 移动端优化 */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg">日</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">日本冬季之旅</span>
              <div className="text-xs sm:text-sm font-semibold text-teal-600">2026</div>
            </div>
          </div>

          {/* 桌面導航 - 不对称设计 */}
          <nav className="hidden lg:flex items-center space-x-2">
            {itinerary.map((day, index) => (
              <button
                key={index}
                onClick={() => scrollToDay(index)}
                className="relative px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-300 group"
              >
                <span className="relative z-10">Day {index + 1}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            ))}
          </nav>

          {/* 漢堡菜單按鈕 - 移动端优化 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all duration-300"
          >
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <div className="hamburger-line w-6 h-0.5 sm:w-7 sm:h-0.5 bg-gray-700 mb-1 sm:mb-1.5"></div>
              <div className="hamburger-line w-6 h-0.5 sm:w-7 sm:h-0.5 bg-gray-700 mb-1 sm:mb-1.5"></div>
              <div className="hamburger-line w-6 h-0.5 sm:w-7 sm:h-0.5 bg-gray-700"></div>
            </div>
          </button>
        </div>

        {/* 移動端菜單 - 移动端优化 */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-200 shadow-2xl">
            <nav className="py-4 sm:py-6 space-y-2 sm:space-y-3">
              {itinerary.map((day, index) => (
                <button
                  key={index}
                  onClick={() => scrollToDay(index)}
                  className="block w-full text-left px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300 rounded-lg sm:rounded-xl mx-0 sm:mx-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">Day {index + 1}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{day.date}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
