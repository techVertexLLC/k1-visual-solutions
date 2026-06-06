# ☕ Coffee Time #2 — K1 網頁設計深化討論
**日期**：2026-06-07
**地點**：LED-Startup 群
**參與者**：Steve (UI)、Cora (PM)、Iris (BD)
**主題**：K1 Visual Solutions 網頁架構、設計風格、差異化策略

## 討論紀錄

### Steve（前端 UI）
**R1：**
- 深色底 + 電光藍/青色 accent，大面積透明 LED 展示圖
- 差異化做互動式產品規格查詢（依場景篩選），Milestrong 和 Reefilm 都沒做好

**R2：**
- 產業入口 + 場景篩選合併成 Filter Hub，用戶選產業後規格表和案例同步過濾
- ROI 計算工具做 Step-by-step wizard（安裝面積→亮度→預算→結果+留資），轉換阻力最低
- Spec sheet 依篩選結果動態生成 PDF，讓每份 lead 帶走的資料都跟他的場景匹配

### Cora（PM）
**R1：**
- B2B 決策三大資訊節點：① 產品規格比較表（可按場景篩選）、② ROI 計算工具（競品都缺的殺手功能）、③ 案例實績頁（安裝照 + 客戶證言）
- 每頁 CTA 導向 "Request a Quote" 或下載 spec sheet，把流量轉成可追蹤的 lead

**R2：**
- 動態 PDF 要嵌 lead 追蹤碼（UTM + lead ID），追蹤 spec sheet 在客戶組織內的擴散路徑
- 砍掉 About Us 獨立頁，併入 Home 的一個 section 就好
- 五頁收斂為：Home / Products (含 Filter Hub) / ROI Calculator / Case Studies / Contact

### Iris（BD）
**R2：**
- Contact 頁表單加「如何找到我們」下拉（Google/展覽/轉介紹/社群），配合動態 PDF lead ID
- 線上線下接觸點串起來，避免漏掉展會口碑進來的高品質 lead

## 收斂共識
| 項目 | 共識 |
|------|------|
| 設計風格 | 深色底 + 電光藍/LED 光暈 CSS |
| 雙語 | URL-based (`/en/` `/es/`) + hreflang + 母語者校對西語 |
| 五頁架構 | Home / Products (Filter Hub) / ROI Calculator / Case Studies / Contact |
| 殺手功能 | 互動式 Filter Hub + ROI 計算 wizard + 動態生成 PDF spec sheet |
| CTA | Sticky 詢價 bar + 每頁 CTA |
| 案例策略 | 有真實 case 放 outcome 數據，沒有就用「裝機數+產業」社會證明 |
| Lead 追蹤 | PDF 嵌追蹤碼 + 表單加來源下拉 |
