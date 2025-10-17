# 日本冬季之旅 2026 網站

一個使用 React + Vite + Tailwind CSS 建立的單頁面旅行行程網站，展示 2026 年日本冬季之旅的詳細行程。

## 🚀 功能特色

- **響應式設計**：完美適配手機和桌面設備
- **平滑滾動**：點擊導航菜單平滑滾動到對應日期
- **淡入動畫**：每個日期區塊在滾動到視窗時淡入顯示
- **天氣圖標**：行程中包含 "wether！" 的項目會顯示天氣影響圖標
- **住宿彈窗**：點擊 "🏨 住宿詳情" 查看詳細住宿資訊
- **現代設計**：使用 Tailwind CSS 打造簡潔現代的視覺效果

## 🛠️ 技術棧

- **React 19** - 前端框架
- **Vite** - 建構工具
- **Tailwind CSS** - CSS 框架
- **GitHub Pages** - 部署平台

## 📁 專案結構

```
japan-trip-2026/
├── public/
│   ├── images/          # 行程圖片
│   └── route-map.png    # 路線圖
├── src/
│   ├── components/      # React 組件
│   │   ├── Header.jsx
│   │   ├── DaySection.jsx
│   │   ├── WeatherIcon.jsx
│   │   └── HotelPopup.jsx
│   ├── data/
│   │   └── itinerary.js # 行程數據
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── package.json
```

## 🎨 設計風格

- **配色方案**：淺灰/白色背景 (#F9FAFB)，青綠色重點 (#00ADB5)
- **字體**：Inter 和 Noto Sans TC
- **風格**：簡潔現代，具有旅行明信片的感覺
- **動畫**：平滑的滾動和淡入效果

## 📱 響應式設計

- **桌面版**：水平導航菜單，兩欄布局
- **手機版**：漢堡菜單，垂直堆疊布局
- **平板版**：自適應中間尺寸

## 🚀 部署

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

### GitHub Pages 部署

1. 將代碼推送到 GitHub 倉庫
2. 在 GitHub 倉庫設置中啟用 Pages
3. 選擇 "GitHub Actions" 作為部署源
4. 推送代碼到 main 分支會自動觸發部署

### 手動部署

```bash
# 建構專案
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 📸 圖片要求

請將以下圖片放入 `/public/images/` 資料夾：

- `泉天空の湯.jpg` - 泉天空の湯溫泉設施
- `庄川遊覽船.jpeg` - 庄川遊覽船體驗
- `雨晴海岸.jpeg` - 雨晴海岸風景
- `河邊Starbucks.jpg` - 河邊Starbucks咖啡店
- `route-map.png` - 整個行程的路線圖

## 🎯 行程概覽

**11 天行程**：香港 → 東京 → 富山 → 高山 → 札幌 → 函館 → 東京 → 香港

**主要景點**：
- 新穗高空中纜車
- 飛驒高山老街
- 白川鄉點燈
- 北海道神宮
- 函館山夜景
- 五稜郭公園

## 📝 自定義

要修改行程內容，請編輯 `src/data/itinerary.js` 文件。每個日期包含：

- `date`: 日期
- `title`: 標題
- `details`: 行程詳情陣列
- `images`: 圖片路徑陣列
- `hotelDetail`: 住宿詳情（可選）

## 🔧 系統要求

- Node.js 18+ (建議 20+)
- npm 或 yarn

## 📄 授權

此專案僅供個人使用。