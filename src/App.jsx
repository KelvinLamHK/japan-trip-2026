import React from 'react';
import Header from './components/Header';
import DaySection from './components/DaySection';
import { itinerary } from './data/itinerary';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header itinerary={itinerary} />
      
      {/* Hero Section - 简洁现代设计 */}
      <section className="relative pt-20 pb-16 px-4 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center">
            {/* 主标题区域 */}
            <div className="mb-16">
              {/* 图标 */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">日</span>
                </div>
              </div>
              
              {/* 主标题 */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                日本冬季之旅
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-8">2026</p>
              
              {/* 路线信息 */}
              <div className="inline-flex items-center space-x-4 bg-white rounded-2xl px-8 py-4 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">東京</span>
                </div>
                <div className="text-gray-400">→</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">北陸</span>
                </div>
                <div className="text-gray-400">→</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">北海道</span>
                </div>
                <div className="text-gray-400">→</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">東京</span>
                </div>
              </div>
            </div>
            
            {/* 装饰性图标 */}
            <div className="flex justify-center space-x-8 text-2xl opacity-60">
              <span>❄️</span>
              <span>🏔️</span>
              <span>🌸</span>
              <span>🍜</span>
              <span>🏮</span>
            </div>
            {/* 查看更多提示 */}
            <div className="mt-12 flex flex-col items-center">
              <div className="text-gray-600 text-lg font-medium mb-6">
                下方查看更多
              </div>
              <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Day Sections */}
      {itinerary.map((day, index) => (
        <DaySection key={index} day={day} index={index} />
      ))}



      {/* Footer - 简洁设计 */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-8 lg:mb-0">
              <p className="text-gray-600 max-w-2xl">
              </p>
            </div>
            
            <div className="flex flex-col items-center lg:items-end">
              <div className="flex space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">日</span>
                </div>
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">本</span>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">冬</span>
                </div>
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">季</span>
                </div>
              </div>
              
              <div className="flex space-x-4 text-xl opacity-60">
                <span>❄️</span>
                <span>🏔️</span>
                <span>🌸</span>
                <span>🍜</span>
                <span>🏮</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500">© 2026 冬旅</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;