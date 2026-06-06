# K1trends Global Inc. — Landing Page 開發 Brief

## 專案資訊
- **公司名稱**：K1trends Global Inc.
- **品牌名**：K1 Visual Solutions
- **總部**：Markham, Ontario, Canada
- **業務**：進階 LED 硬體解決方案經銷商（B2B）
- **目標客群**：建築設計師、高端零售品牌、系統集成商、跨國採購商
- **Logo**：`public/assets/images/k1-logo.jpg`
- **Tagline**：LED DISPLAYS · DIGITAL SIGNS · ENDLESS POSSIBILITIES

## 技術棧
- **Next.js** (App Router)
- **Tailwind CSS**
- **Framer Motion**（微動態效果）
- 先做英文版，i18n routing (`/en`, `/es`) 架構先預留

## 設計風格
- **深色背景**（黑/深藍）襯托 LED 產品發光感
- **品牌色系**：深藍 → 紫色漸層（對齊 Logo），電光藍/青色 accent
- **LED 光暈 CSS animation**，讓產品發光感成為設計語言核心
- 極簡未來感（Premium & Futuristic Tech）
- 參考競品風格：Reefilm LED (reefilm-led.com)、Milestrong (milestrongled.com)

## Landing Page 區塊（由上到下）

### 1. Sticky 導航列
- Logo（左）
- 導航連結：Products / About / Contact（錨點滾動）
- 語言切換器（EN/ES，先放 UI 占位）
- CTA 按鈕：「Request a Quote」

### 2. Hero Section
- 滿版深色背景，預留影片播放位（先用漸層 + 動態光效佔位）
- 標語：**"Redefining Spaces with Invisible Displays."**
- 副標語：Next-Gen Flexible & Transparent LED Solutions
- 雙 CTA：「Explore Products」/「Request a Quote」

### 3. Core Technology Highlights（四大技術優勢）
- Ultra Transparency (70%-95%)
- Flexible & Bendable（最小彎曲半徑 6cm）
- Self-Adhesive & Light Weight（4mm 厚、免支架）
- Dual-Drive Breakpoint Continuation（單點故障不影響顯示）
- 用帶科技感微動態圖標的卡片展示

### 4. 雙產品線卡片（Series F / Series T）
- **Series F (Flexible Transparent Film)**：可撓式透明貼膜屏，自粘免支架
  - Pixel Pitch: P6.25 / P8 / P10 / P20
  - Transparency: 80%-95%
  - Thickness: ~4mm, 3-6 kg/m²
- **Series T (Rigid Transparent Screen / Poster)**：透明海報屏，懸掛/落地
  - Pixel Pitch: P2.8-5.6mm / P3.9-7.8mm
  - Transparency: 70%-85%
  - Weight: ~32kg/unit
- 每張卡片先用 placeholder 產品圖
- Hover 效果預留（靜態→動態切換）

### 5. Application Scenarios（應用場景網格）
- 高端零售櫥窗 (Retail Windows)
- 建築幕牆 (Architectural Facades)
- 室內展廳 (Exhibitions)
- 商場自動扶梯 (Escalators)
- 用 4 格 Grid，圖片先用 placeholder

### 6. About / Trust Section
- 精簡一段：加拿大在地、北美服務、STEM 背景、跨國供應鏈
- 不做獨立頁，併入首頁底部

### 7. CTA / Contact Section
- 主 CTA：**Request a Quote**
- 次 CTA：**Book a Demo**
- B2B 表單：姓名、公司、郵箱、電話、應用場景、預計面積/數量、留言
- 聯絡資訊 + Markham 地址（靜態地圖佔位）

### 8. Footer
- Logo + 公司名
- 導航連結
- 聯絡郵箱 / 電話
- © 2025 K1trends Global Inc.

## 技術規範
- 響應式：Mobile / Tablet / Desktop
- 語義化 HTML（Header, Main, Section, Footer, H1-H3）
- SEO：Title + Meta Tags 動態注入關鍵詞
- 圖片：Next.js Image 組件，loading="lazy"
- 影片預留：muted, loop, playsinline, autoplay, preload="metadata"
- 素材路徑：`public/assets/images/products/`, `public/assets/videos/`
- 所有文件建完後 chmod 644

## 交付標準
- `npm run dev` 能跑起來
- 響應式三端都正常
- Lighthouse Performance > 90
- 先用 placeholder，後續替換真實素材
