# 部署說明

## 快速開始

1. **克隆或下載專案**
   ```bash
   git clone <your-repo-url>
   cd japan-trip-2026
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **添加圖片**
   - 將您的行程圖片放入 `public/images/` 資料夾
   - 將路線圖命名為 `route-map.png` 並放入 `public/` 資料夾

4. **本地預覽**
   ```bash
   npm run dev
   ```
   在瀏覽器中打開 http://localhost:5173

## GitHub Pages 部署

### 方法一：使用 GitHub Actions（推薦）

1. 將代碼推送到 GitHub 倉庫
2. 在 GitHub 倉庫的 Settings > Pages 中：
   - Source: GitHub Actions
   - 選擇 "Deploy to GitHub Pages" workflow
3. 推送代碼到 main 分支會自動觸發部署

### 方法二：手動部署

1. **建構專案**
   ```bash
   npm run build
   ```

2. **部署到 GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **更新 package.json 中的 homepage**
   ```json
   {
     "homepage": "https://your-username.github.io/japan-trip-2026"
   }
   ```

## 自定義行程

編輯 `src/data/itinerary.js` 來修改行程內容：

```javascript
{
  date: "1月23日（五）",
  title: "您的標題",
  details: [
    "行程項目1",
    "行程項目2（wether！）", // 包含 "wether！" 會顯示天氣圖標
  ],
  images: [
    "/images/your-image.jpg",
  ],
  hotelDetail: "住宿詳情（可選）", // 會顯示住宿詳情按鈕
}
```

## 圖片建議

- **格式**：JPG 或 PNG
- **尺寸**：800x600 或 1200x800
- **檔案大小**：建議小於 500KB
- **命名**：使用有意義的英文名稱

## 故障排除

### Node.js 版本問題
如果遇到 Node.js 版本錯誤，請升級到 Node.js 18+：
```bash
# 使用 nvm 管理 Node.js 版本
nvm install 18
nvm use 18
```

### 建構失敗
如果建構失敗，請檢查：
1. 所有依賴是否正確安裝
2. 圖片路徑是否正確
3. 代碼語法是否正確

### 部署問題
如果 GitHub Pages 部署失敗：
1. 檢查倉庫設置中的 Pages 配置
2. 確認 workflow 文件正確
3. 檢查建構日誌中的錯誤信息
