import React, { useEffect, useRef, useState } from 'react';
import WeatherIcon from './WeatherIcon';
import HotelPopup from './HotelPopup';

const DaySection = ({ day, index }) => {
  const sectionRef = useRef(null);
  const [collapsedSections, setCollapsedSections] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // 获取项目类型和图标
  const getItemType = (detail) => {
    if (detail.includes('航班資訊') || detail.includes('第一段') || detail.includes('第二段')) return 'flight';
    if (detail.includes('轉機時間')) return 'transfer';
    if (detail.includes('當日行程')) return 'schedule';
    if (detail.includes('抵達') && detail.includes('機場')) return 'airport';
    if (detail.includes('搭乘') && detail.includes('機')) return 'flight';
    if (detail.includes('租車')) return 'car';
    if (detail.includes('遊覽船') || detail.includes('海岸')) return 'sightseeing';
    if (detail.includes('咖啡') || detail.includes('Starbucks')) return 'food';
    if (detail.includes('溫泉') || detail.includes('旅館')) return 'hotel';
    if (detail.includes('纜車') || detail.includes('老街')) return 'attraction';
    if (detail.includes('點燈') || detail.includes('白川鄉')) return 'special';
    if (detail.includes('還車')) return 'car';
    if (detail.includes('神宮') || detail.includes('神社')) return 'temple';
    if (detail.includes('夜景') || detail.includes('公園')) return 'sightseeing';
    if (detail.includes('自由活動') || detail.includes('購物')) return 'free';
    return 'general';
  };

  const getIcon = (type) => {
    const icons = {
      flight: '✈️',
      transfer: '⏰',
      schedule: '🗓️',
      airport: '🏢',
      car: '🚗',
      sightseeing: '🌊',
      food: '☕',
      hotel: '🏨',
      attraction: '🎡',
      special: '✨',
      temple: '⛩️',
      free: '🛍️',
      general: '📍'
    };
    return icons[type] || '📍';
  };

  const getColorClass = (type, isMainCategory = false) => {
    if (isMainCategory) {
      return 'text-teal-700 font-bold text-lg';
    }
    
    const colors = {
      flight: 'text-blue-700',
      transfer: 'text-orange-700',
      schedule: 'text-purple-700',
      airport: 'text-gray-700',
      car: 'text-green-700',
      sightseeing: 'text-cyan-700',
      food: 'text-yellow-700',
      hotel: 'text-red-700',
      attraction: 'text-pink-700',
      special: 'text-indigo-700',
      temple: 'text-amber-700',
      free: 'text-emerald-700',
      general: 'text-gray-600'
    };
    return colors[type] || 'text-gray-600';
  };

  // 将行程分组
  const groupDetails = (details) => {
    const groups = [];
    let currentGroup = null;
    
    details.forEach((detail, index) => {
      const cleanDetail = detail.replace('wether！', '');
      const isMainCategory = cleanDetail.match(/^[✈️⏰🗓️🌊🏖️☕🏨🎡✨⛩️🛍️📍]/) && 
                            (cleanDetail.includes('資訊') || cleanDetail.includes('時間') || cleanDetail.includes('行程'));
      
      if (isMainCategory) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          title: cleanDetail,
          items: [],
          collapsed: collapsedSections[cleanDetail] || false
        };
      } else if (currentGroup && cleanDetail.trim() !== '') {
        currentGroup.items.push({ detail, index });
      } else if (!currentGroup && cleanDetail.trim() !== '') {
        // 没有分组的项目
        if (groups.length === 0 || groups[groups.length - 1].title !== '其他') {
          groups.push({
            title: '其他',
            items: [],
            collapsed: collapsedSections['其他'] || false
          });
        }
        groups[groups.length - 1].items.push({ detail, index });
      }
    });
    
    if (currentGroup) {
      groups.push(currentGroup);
    }
    
    return groups;
  };

  const toggleSection = (sectionTitle) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const renderDetail = (detail, detailIndex) => {
    const hasWeather = detail.includes('wether！');
    const cleanDetail = detail.replace('wether！', '');
    
    const itemType = getItemType(cleanDetail);
    const icon = getIcon(itemType);
    const colorClass = getColorClass(itemType);
    
    
    return (
      <div key={`${detail}-${detailIndex}`} className="flex items-start py-2">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex-1">
          <span className={`${colorClass} text-base leading-relaxed`}>
            {cleanDetail}
          </span>
          {hasWeather && <WeatherIcon />}
        </div>
      </div>
    );
  };

  const renderGroup = (group) => {
    
    return (
      <div key={group.title} className="mb-6">
        <button
          onClick={() => toggleSection(group.title)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-expanded={!group.collapsed}
          aria-label={`${group.collapsed ? '展开' : '折叠'} ${group.title}`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-3">
              <span className="text-lg">{getIcon(getItemType(group.title))}</span>
            </div>
            <span className="text-teal-700 font-bold text-lg">{group.title}</span>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${group.collapsed ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {!group.collapsed && (
          <div className="mt-4 pl-4 border-l-2 border-teal-200">
            <div className="space-y-2">
              {group.items.map(item => renderDetail(item.detail, item.index))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id={`day-${index + 1}`}
      className={`fade-in-section min-h-screen py-16 sm:py-20 px-0 sm:px-4 lg:px-8 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* 日期標題 - 簡化布局 */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">{index + 1}</span>
            </div>
            <div>
              <p className="text-lg sm:text-xl text-teal-600 font-semibold">{day.date}</p>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold leading-tight">
            {day.title}
          </h3>
        </div>

        {/* 內容區域 - 不对称网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* 左側：行程詳情 - 占据更多空间 */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl lg:text-3xl font-bold text-gray-900">行程安排</h4>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-teal-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-teal-100 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                {groupDetails(day.details).map(renderGroup)}
              </div>
              
            </div>

            {/* 住宿詳情 */}
            {day.hotelDetail && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl lg:text-3xl font-bold text-gray-900">住宿資訊</h4>
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🏨</span>
                  </div>
                </div>
                <HotelPopup hotelDetail={day.hotelDetail} />
              </div>
            )}
          </div>

          {/* 右側：圖片 - 占据较少空间但更突出 */}
          <div className="lg:col-span-5 space-y-6">
            {day.images.map((image, imgIndex) => (
              <div key={imgIndex} className="relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={image}
                    alt={`${day.title} - ${day.imageNames && day.imageNames[imgIndex] ? day.imageNames[imgIndex] : `圖片 ${imgIndex + 1}`}`}
                    className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+PC9wPgo8L3N2Zz4K';
                    }}
                    role="img"
                    aria-describedby={`image-description-${index}-${imgIndex}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* 景点名称指示器 */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span 
                      id={`image-description-${index}-${imgIndex}`}
                      className="text-gray-900 font-bold text-xs whitespace-nowrap"
                    >
                      {day.imageNames && day.imageNames[imgIndex] ? day.imageNames[imgIndex] : `圖片 ${imgIndex + 1}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaySection;
