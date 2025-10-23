import React, { useState, useEffect } from 'react';

const Header = ({ itinerary }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // 检测当前活跃的日期
      const sections = itinerary.map((_, index) => 
        document.getElementById(`day-${index + 1}`)
      );
      
      let current = 0;
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = index;
          }
        }
      });
      setActiveDay(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [itinerary]);

  const scrollToDay = (dayIndex) => {
    const element = document.getElementById(`day-${dayIndex + 1}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo - 简洁设计 */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">日</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">日本冬季之旅</h1>
              <p className="text-sm text-gray-600">2026</p>
            </div>
          </div>

          {/* 桌面導航 - 简洁设计 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {itinerary.map((day, index) => (
              <button
                key={index}
                onClick={() => scrollToDay(index)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeDay === index
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Day {index + 1}
              </button>
            ))}
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="py-4 space-y-2">
              {itinerary.map((day, index) => (
                <button
                  key={index}
                  onClick={() => scrollToDay(index)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeDay === index
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Day {index + 1}</span>
                    <span className="text-sm text-gray-500">{day.date}</span>
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
