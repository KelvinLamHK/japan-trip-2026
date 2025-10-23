import React, { useEffect, useRef, useState } from 'react';
import WeatherIcon from './WeatherIcon';
import HotelPopup from './HotelPopup';
import TimelineSection from './TimelineSection';

const DaySection = ({ day, index }) => {
  const sectionRef = useRef(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [showTimeline, setShowTimeline] = useState(true);

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
    
    // 简化颜色系统 - 统一使用深灰色，更易读
    return 'text-gray-700';
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
      <div key={`${detail}-${detailIndex}`} className="flex items-start py-3 px-3 sm:px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-0.5 shadow-sm border border-gray-200">
          <span className="text-sm sm:text-lg">{icon}</span>
        </div>
        <div className="flex-1">
          <span className={`${colorClass} text-sm sm:text-base leading-relaxed font-medium`}>
            {cleanDetail}
          </span>
          {hasWeather && <WeatherIcon />}
        </div>
      </div>
    );
  };

  const renderGroup = (group) => {
    
    return (
      <div key={group.title} className="mb-8">
        <button
          onClick={() => toggleSection(group.title)}
          className="w-full flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-blue-50 hover:from-teal-100 hover:to-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-teal-100"
          aria-expanded={!group.collapsed}
          aria-label={`${group.collapsed ? '展开' : '折叠'} ${group.title}`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-white text-base sm:text-lg">{getIcon(getItemType(group.title))}</span>
            </div>
            <span className="text-teal-800 font-bold text-lg sm:text-xl">{group.title}</span>
          </div>
          <svg 
            className={`w-5 h-5 sm:w-6 sm:h-6 text-teal-600 transition-transform duration-300 ${group.collapsed ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {!group.collapsed && (
          <div className="mt-4 sm:mt-6 ml-2 sm:ml-6 pl-4 sm:pl-6 border-l-4 border-teal-300 bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
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
      className={`fade-in-section min-h-screen py-12 sm:py-16 lg:py-20 px-2 sm:px-4 lg:px-8 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* 日期標題 - 移动端优化 */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-base lg:text-lg">{index + 1}</span>
            </div>
            <div>
              <p className="text-base sm:text-lg lg:text-xl text-teal-600 font-semibold">{day.date}</p>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-800 font-bold leading-tight">
            {day.title}
          </h3>
        </div>

        {/* 內容區域 - 移动端优化 */}
        <div className="w-full">
          {/* 行程詳情 - 移动端优化 */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">行程安排</h4>
              </div>
              
              {day.timeline ? (
                <TimelineSection 
                  timelineItems={day.timeline} 
                  images={day.images || []} 
                  imageNames={day.imageNames || []} 
                />
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <h5 className="text-lg font-semibold text-gray-700 mb-2">时间线数据准备中</h5>
                  <p className="text-gray-500">此日期的详细时间线正在整理中</p>
                </div>
              )}
              
            </div>

            {/* 住宿詳情 - 移动端优化 */}
            {day.hotelDetail && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-10">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">住宿資訊</h4>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">🏨</span>
                  </div>
                </div>
                <HotelPopup hotelDetail={day.hotelDetail} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaySection;
