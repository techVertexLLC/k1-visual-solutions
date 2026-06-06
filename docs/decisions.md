# 📋 K1 Visual Solutions — 決策紀錄
**專案**：K1trends Global Inc. 官方網站
**建立日期**：2026-06-07

---

## DEC-001：網站技術棧
**日期**：2026-06-07
**決策者**：Woody
**決策**：Next.js 14 (App Router) + Tailwind CSS + Framer Motion
**來源**：Gemini 開發文件建議，Coffee Time #1 確認

## DEC-002：設計風格
**日期**：2026-06-07
**決策者**：Woody + 團隊共識
**決策**：深色背景 + 藍紫漸層（對齊 Logo）+ LED 光暈 CSS 動效，極簡未來科技感
**來源**：Coffee Time #1 & #2

## DEC-003：網站架構
**日期**：2026-06-07
**決策者**：Woody + Cora (PM)
**決策**：四頁架構 — Home / Products (含 Filter Hub) / Case Studies / Contact。About Us 併入 Home 底部 section。
**理由**：B2B 買家不會花時間讀獨立品牌故事頁，信任訊號放首頁即可
**來源**：Coffee Time #2 & #3

## DEC-004：雙語策略
**日期**：2026-06-07
**決策者**：Woody
**決策**：英文 + 西班牙文，URL-based i18n routing（`/en/`、`/es/`），搭 hreflang 標記。西語版 copy 需母語者校對，不可機翻。
**來源**：Woody 需求 + Coffee Time #1 Iris 建議

## DEC-005：CTA 策略
**日期**：2026-06-07
**決策者**：Cora (PM)，Woody 核准
**決策**：主 CTA = Request a Quote，次 CTA = Book a Demo。Sticky 詢價 bar 全頁跟隨。Spec sheet 不做前端下載，改為 follow-up email 附件。
**來源**：Coffee Time #3

## DEC-006：開發優先級
**日期**：2026-06-07
**決策者**：Woody
**決策**：先做 Landing Page（一頁式），再展開完整四頁網站
**來源**：Woody 直接指示

## DEC-007：GitHub 組織
**日期**：2026-06-07
**決策者**：Woody
**決策**：Repo 建在 techVertexLLC 組織下（private），Token 權限對應該組織
**來源**：實際操作確認
