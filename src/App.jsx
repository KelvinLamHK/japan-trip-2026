import React from 'react';
import Header from './components/Header';
import DaySection from './components/DaySection';
import { itinerary } from './data/itinerary';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header itinerary={itinerary} />
      
      {/* Hero Section - 移动端优化 */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-2 sm:px-4 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight">
              日本冬季之旅
              <span className="block text-teal-400">2026</span>
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
              <div className="h-1 w-16 sm:w-20 bg-teal-500 mx-auto sm:mx-0"></div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium">
                東京 → 北陸 → 北海道 → 東京
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Route Map - 移动端优化 */}
      <section className="py-8 sm:py-12 px-2 sm:px-4 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-0">行程路線圖</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-300 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-100 rounded-full"></div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/route-map.png"
                alt="日本冬季之旅路線圖"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-[28rem] object-cover object-[center_20%] rounded-lg sm:rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden bg-gray-100 rounded-lg sm:rounded-xl h-48 sm:h-64 md:h-80 lg:h-[28rem] flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-gray-500 text-base sm:text-lg">路線圖將在此顯示</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Sections */}
      {itinerary.map((day, index) => (
        <DaySection key={index} day={day} index={index} />
      ))}

      {/* Footer - 不对称设计 */}
      <footer className="bg-black text-white py-16 px-0 sm:px-4 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">日本冬季之旅 2026</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl">
                一次難忘的冬季日本之旅，從東京到北海道的精彩體驗
              </p>
            </div>
            
            <div className="lg:w-1/3 flex justify-end">
              <div className="flex space-x-3">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">日</span>
                </div>
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">本</span>
                </div>
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">冬</span>
                </div>
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">季</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;