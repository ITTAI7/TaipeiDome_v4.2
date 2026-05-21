# Project Guidelines: Modular Scraper Architecture

## 1. 獨立的爬蟲模組 (Team-Specific Independence)
雖然中信兄弟 (Brothers)、富邦悍將 (Fubon) 和味全龍 (WeiChuan) 皆使用相同的售票系統(宏碁資訊)，但其網頁結構、防爬蟲機制 (WAF)、以及特殊球區 (如輪椅席、活動席) 的設定可能會有些微差異。另外，**台鋼雄鷹 (TSG)** 使用的是完全不同的售票系統 (新零售平台)，採用不同的 API 結構。
- **不要假設各隊完全一樣**：當在某一隊的系統中發現問題並修復時，不要自動假設其他隊伍也需要完全相同的修復方式。特別是台鋼雄鷹，其系統架構與其他三隊截然不同。
- **隔離修改 (Isolated Modifications)**：當處理特定隊伍的 Bug 或功能調整時，請**嚴格限制**修改範圍在該隊伍專屬的爬蟲模組內 (例如 `src/services/scrapers/WeiChuanScraper.ts` 或 `src/services/scrapers/TsgScraper.ts`)，避免互相干擾。

## 2. 爬蟲邏輯的獨立性
- 各隊伍的爬蟲雖然繼承或實作相同的介面，但各自保有獨立的 `getGames()` 與 `getTickets()` 實作。
- 各球隊若有特定的 Headers (`referer`) 要求、不同的正則表達式解析規則，或是座位圖 (Image Map) 的特殊行為，都請寫在各自的模組中，落實「模組化切割」。台鋼雄鷹則有自己專屬的 API headers (如 `x-company-code`)。

## 3. 開發及測試流程
- 當正在針對特定球隊 (例如台鋼雄鷹或味全龍) 進行測試與開發時，請專注於該隊的特殊情境，利用該隊的測試檔 (如 `test_tsg.ts` 或 `test_weichuan.ts`) 進行驗證。遇到阻礙時，以該隊伍的解決方案優先。

## 4. 台鋼雄鷹 (TSG) 專屬開發提示
- **總票數動態設定**：由於台鋼的比賽場地較為多樣，在前端介面處理時，必須根據「場地名稱」來動態給予合理的「全場預設總票數」，以確保「已售出人數」及資源配置計算準確。若使用者沒有手動修改，請依照以下預設值帶入：
  - **澄清湖棒球場**：預設為 20,000
  - **嘉義市立棒球場**：預設為 10,000
  - **臺北大巨蛋**：預設為 37,000
  - **其它球場**：預設為 37,000
- **獨立售票 API 架構**：台鋼使用新零售平台，所以爬蟲不需要使用 cheerio 分析 HTML，而是直接介接 JSON API (如 `spotlight`、`seat-availability`)。且必須在 Header 加入特定參數 (如 `x-company-code: tsghawks`) 才能正常發送請求。