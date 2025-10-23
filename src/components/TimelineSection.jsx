import React, { useState } from 'react';
import LocationInfo from './LocationInfo';

const TimelineSection = ({ timelineItems, images = [], imageNames = [] }) => {
  // 为每个时间线项目维护独立的图片索引
  const [imageIndices, setImageIndices] = useState({});

  // 图片轮播组件
  const ImageCarousel = ({ images, imageNames, itemIndex, itemType, hideImage }) => {
    // 智能图片显示逻辑
    const shouldShowImages = () => {
      // 1. 如果明确设置隐藏图片，则不显示
      if (hideImage) return false;
      
      // 2. 如果有图片数据，显示图片
      if (images && images.length > 0) return true;
      
      // 3. 根据活动类型决定是否显示图片
      const imageWorthyTypes = ['flight', 'sightseeing', 'attraction', 'special', 'temple'];
      return imageWorthyTypes.includes(itemType);
    };

    if (!shouldShowImages()) return null;

    const currentImageIndex = imageIndices[itemIndex] || 0;

    const nextImage = () => {
      setImageIndices(prev => ({
        ...prev,
        [itemIndex]: (currentImageIndex + 1) % images.length
      }));
    };

    const prevImage = () => {
      setImageIndices(prev => ({
        ...prev,
        [itemIndex]: (currentImageIndex - 1 + images.length) % images.length
      }));
    };

    return (
      <div className="mt-4 sm:mt-6 relative">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
          <img
            src={images[currentImageIndex]}
            alt={imageNames[currentImageIndex] || `圖片 ${currentImageIndex + 1}`}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] object-contain bg-gray-100 transition-all duration-500"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+PC9wPgo8L3N2Zz4K';
            }}
          />
          
          {/* 图片名称标签 - 移动端优化 */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
            <span className="text-gray-900 font-bold text-xs sm:text-sm">
              {imageNames[currentImageIndex] || `圖片 ${currentImageIndex + 1}`}
            </span>
          </div>

          {/* 导航按钮 - 移动端优化 */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="上一张图片"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="下一张图片"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* 图片指示器 - 移动端优化 */}
          {images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImageIndices(prev => ({
                    ...prev,
                    [itemIndex]: index
                  }))}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`查看图片 ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
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

  const getColorClass = (type) => {
    // 简化颜色系统 - 统一使用深灰色，更易读
    return 'text-gray-700';
  };

  const getItemType = (item) => {
    if (item.includes('航班') || item.includes('搭乘') || item.includes('機')) return 'flight';
    if (item.includes('轉機') || item.includes('時間')) return 'transfer';
    if (item.includes('抵達') && item.includes('機場')) return 'airport';
    if (item.includes('租車') || item.includes('還車')) return 'car';
    if (item.includes('遊覽船') || item.includes('海岸') || item.includes('觀光')) return 'sightseeing';
    if (item.includes('咖啡') || item.includes('Starbucks') || item.includes('美食')) return 'food';
    if (item.includes('溫泉') || item.includes('旅館') || item.includes('住宿')) return 'hotel';
    if (item.includes('纜車') || item.includes('老街') || item.includes('景點')) return 'attraction';
    if (item.includes('點燈') || item.includes('白川鄉')) return 'special';
    if (item.includes('神宮') || item.includes('神社')) return 'temple';
    if (item.includes('自由活動') || item.includes('購物')) return 'free';
    return 'general';
  };

  return (
    <div className="space-y-4 sm:space-y-8">
      {timelineItems.map((item, index) => {
        const itemType = getItemType(item.content);
        const icon = getIcon(itemType);
        const colorClass = getColorClass(itemType);
        
        return (
          <div key={index} className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 group">
            {/* 移动端：时间点显示在上方 */}
            <div className="sm:hidden flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm">{icon}</span>
              </div>
              <span className="text-lg font-bold text-teal-600 bg-gradient-to-r from-teal-50 to-teal-100 px-3 py-1 rounded-lg shadow-md border border-teal-200">{item.time}</span>
            </div>
            
            {/* 桌面端：时间点显示在左侧 */}
            <div className="hidden sm:block flex-shrink-0">
              <div className="w-28 text-right">
                <span className="text-2xl font-bold text-teal-600 bg-gradient-to-r from-teal-50 to-teal-100 px-4 py-2 rounded-xl shadow-lg border border-teal-200 group-hover:shadow-xl transition-all duration-300">{item.time}</span>
              </div>
            </div>
            
            {/* 时间线连接线 - 仅桌面端显示 */}
            <div className="hidden sm:block flex-shrink-0 flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white group-hover:scale-110 transition-all duration-300 group-hover:shadow-3xl">
                <span className="text-white text-xl">{icon}</span>
              </div>
              {index < timelineItems.length - 1 && (
                <div className="w-1 h-28 bg-gradient-to-b from-teal-400 via-teal-300 to-teal-200 mt-5 rounded-full shadow-lg"></div>
              )}
            </div>
            
            {/* 内容 */}
            <div className="flex-1 pb-4 sm:pb-10">
              <div className="bg-gradient-to-r from-white via-teal-50/30 to-teal-50/50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-10 border-l-4 sm:border-l-6 border-teal-500 hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] group-hover:border-teal-600">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-500 rounded-full animate-pulse"></div>
                  <h4 className="text-lg sm:text-3xl font-bold text-gray-900 group-hover:text-teal-800 transition-colors duration-300">{item.title}</h4>
                </div>
                <p className={`${colorClass} text-base sm:text-xl leading-relaxed mb-4 sm:mb-8 font-semibold`}>
                  {item.content}
                </p>
                {item.details && (
                  <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-5">
                    {item.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-3 sm:space-x-5 bg-gradient-to-r from-gray-50 to-teal-50/50 p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:scale-[1.005] sm:hover:scale-[1.01] border border-gray-100">
                        <div className="w-2 h-2 sm:w-4 sm:h-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 shadow-md"></div>
                        <span className="text-gray-700 text-sm sm:text-lg leading-relaxed font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 添加图片轮播 */}
                <ImageCarousel 
                  images={item.images || images} 
                  imageNames={item.imageNames || imageNames} 
                  itemIndex={index}
                  itemType={itemType}
                  hideImage={item.hideImage}
                />
                
                {/* 添加位置信息 */}
                <LocationInfo location={item.location} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineSection;
