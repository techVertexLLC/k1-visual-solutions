# 💰 K1 Visual Solutions — 成本追蹤紀錄

## 累計總成本
| 日期 | API 花費 | Claude Code | Codex Review | 合計 | 備註 |
|------|---------|-------------|--------------|------|------|
| 2026-06-07 | $12.29 | $0 (訂閱) | $0 | $12.29 | 專案啟動日 |
| **累計** | **$12.29** | **$0** | **$0** | **$12.29 ≈ NT$387** | |

---

## 2026-06-07 — 專案啟動日

### 明細
| 項目 | 執行者 | 模型 | 成本 | 說明 |
|------|--------|------|------|------|
| 競品網站研究 (3 站) | Meli | Opus (delegate_task) | ~$3.50 | Milestrong + Reefilm x2 |
| 主對話 (規劃/部署/管理) | Meli | Opus | ~$8.47 | 含 session 搜索、Caddy 設定 |
| Coffee Time #1 (HIVE) | Steve/Cora/Iris | Opus | ~$0.11 | 誤發到 HIVE |
| Coffee Time #2 (LED-Startup) | Steve/Cora/Iris | Opus | ~$0.11 | 網頁架構討論 |
| Coffee Time #3 (LED-Startup) | Cora | Opus | ~$0.10 | PM 1-on-1 Landing Page |
| Landing Page 開發 | Steve (Claude Code) | Sonnet | $0 | Max 訂閱，不燒 API |
| **日計** | | | **$12.29** | **≈ NT$387** |

### 產出
- ✅ 競品研究報告（Milestrong + Reefilm）
- ✅ 3 次 Coffee Time 會議紀錄
- ✅ 7 項決策紀錄
- ✅ Landing Page v1 上線（8 區塊、響應式）
- ✅ GitHub repo 建立 + push
- ✅ Caddy 部署（http://3.229.179.144/k1）

### 省錢筆記
- 研究類任務用 delegate_task 燒了 ~$3.50，以後改用 `claude -p` 走訂閱
- 前端開發全走 Claude Code = $0
- Coffee Time 每場 ~$0.10，成本極低

---

## 成本控制原則
1. **開發寫 code** → Claude Code（Max 訂閱，$0）
2. **Code review** → Codex（每次幾分錢）
3. **研究/查資料** → Claude Code `claude -p`（訂閱，$0）
4. **管理對話** → Meli API（主要花費，儘量精簡）
5. **Coffee Time** → 每場 ~$0.10，控制在必要時才開
6. **每個任務完成後** → 記錄成本到此檔案
