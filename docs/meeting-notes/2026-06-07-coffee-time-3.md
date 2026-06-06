# ☕ Coffee Time #3 — Cora PM 1-on-1 Landing Page 規劃
**日期**：2026-06-07
**地點**：LED-Startup 群
**參與者**：Cora (PM)
**主題**：K1trends Landing Page 區塊優先級、架構收斂

## 討論紀錄

### Cora（PM）
**R1：**
- Landing page 區塊優先級：Hero（產品視覺衝擊）> 雙產品線卡片（Series F / T 分流）> 社會證明（案例或合作夥伴 logo）> CTA 表單
- About Us 直接併入 Home 底部精簡段落，B2B 客戶不會特地點 About 頁
- 但首頁需要看到「加拿大在地、北美服務」的信任訊號
- 雙語用 Next.js i18n routing（`/en`、`/es`）搭語言切換器，不做同頁雙語並排
- CTA 主按鈕：Request a Quote / Solicitar Cotización（不要模糊的 Contact Us）
- 次 CTA：Download Spec Sheet 來收 leads

**R2：**
- Gemini 四頁 vs Coffee Time 五頁，差異就是 About Us —— About 併入 Home 後四頁 cover 五頁內容
- Products 頁 Series F 跟 Series T 必須有獨立 sub-section 或子頁，因為 TA 決策邏輯不同：建築師看可撓性+透光率，零售看尺寸+亮度
- CTA 再加一層：「Request a Quote」旁放「Book a Demo」比 Download Spec Sheet 更有轉換力
- Spec sheet 當 follow-up email 附件發，先把人約進來再說

## 決策結論
- ✅ About Us 併入 Home（不做獨立頁）
- ✅ 先做 Landing Page（一頁式），再展開完整網站
- ✅ 主 CTA：Request a Quote，次 CTA：Book a Demo
- ✅ 架構收斂為四頁（Home / Products / Case Studies / Contact）
