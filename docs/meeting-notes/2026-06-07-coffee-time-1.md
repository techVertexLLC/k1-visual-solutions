# ☕ Coffee Time #1 — K1 網頁設計初步討論
**日期**：2026-06-07
**地點**：HIVE（誤發，應發 LED-Startup）
**參與者**：Steve (UI)、Cora (PM)、Iris (BD)
**主題**：K1 Visual Solutions 企業網頁設計方向

## 討論紀錄

### Steve（前端 UI）
**R1：**
- 主視覺用 dark background + LED 光暈 CSS animation，產品發光感成為設計語言核心，純 CSS 不需插件
- 雙語用 URL prefix（`/en/` vs `/es/`），SEO 最友善
- 五頁架構：首頁 Hero → 產品目錄 → 應用場景 → 技術規格/FAQ → 聯絡詢價
- CTA 每頁都要露出，B2B 轉換漏斗要短

**R2：**
- 西語排版要預留 buffer（西班牙文通常比英文長 20-30%）

### Cora（PM）
**R1：**
- 調整頁面順序：應用場景拉到第二頁、產品目錄放第三——B2B 買家先問「你能解決我什麼問題」，不是「你有哪些 SKU」
- 加 sticky quote request bar，滾到哪都能一鍵詢價
- 雙語記得做好 hreflang 標記，不然 Google 兩語版互打

**R2：**
- Spec sheet 做成可下載 PDF（英/西各一版），B2B 採購內部簽核需要帶走的資料
- 案例數據不能編，沒真實 case 就先放 typical use scenario

### Iris（BD）
**R1：**
- 應用場景頁按產業分類（Retail / Hospitality / Events），每 case 帶 outcome 數據
- 西語版 copy 不能機翻，Hispanic B2B 客群有自己的行話，要找母語者校對——競品沒做到的差異化

**R2：**
- 沒完整 case 時用「裝機地點 + 產業類型」做社會證明（如 "Deployed in 50+ U.S. retail locations"），比空白有說服力又不灌水
