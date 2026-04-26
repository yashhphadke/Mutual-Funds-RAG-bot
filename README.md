# Facts-Only MF Assistant

A RAG-based chatbot that answers factual questions about mutual fund schemes using verified sources from AMC, SEBI, and AMFI websites. It provides concise, citation-backed responses while strictly avoiding any investment advice.

## Scope
- **Product Chosen:** Groww
- **AMC:** HDFC Mutual Funds
- **Schemes:** 
  - HDFC Nifty 50 Index Fund Direct Growth
  - HDFC Silver ETF FOF Direct Growth
  - HDFC Defence Fund Direct Growth
  - HDFC Equity Fund (Flexi Cap) Direct Growth
  - HDFC Small Cap Fund Direct Growth
  - HDFC Gold ETF FOF Direct Growth
  - HDFC Focused 30 Fund Direct Growth

## Setup Steps
1. Clone the repository and navigate to the project directory.
2. Install the required dependencies using `npm install` or `yarn install`.
3. Set up the environment variables (e.g., API keys for LLM, vector database credentials) in a `.env` file.
4. Run the data scraper/loader to ingest the specified URLs into the knowledge base.
5. Start the application backend and frontend servers using `npm start`.
6. Access the minimal UI at `https://mutual-funds-rag-bot.vercel.app/`.

## Known Limits
- **Information Scope:** The assistant can only answer questions based on the explicitly provided public URLs (AMC and Groww scheme pages).
- **No Real-Time NAV:** The bot does not fetch live real-time NAVs unless explicitly updated in the ingested factsheet.
- **Strictly Factual:** It will politely refuse any queries related to investment advice, portfolio reviews, or performance predictions.
- **No PII Handling:** The system is not designed to accept or process any personally identifiable information (PII) such as PAN, Aadhaar, or account numbers.

## Source List

| Source Name | URL |
| :--- | :--- |
| HDFC Mutual Funds AMC Page | [Link](https://groww.in/mutual-funds/amc/hdfc-mutual-funds) |
| HDFC Nifty 50 Index Fund | [Link](https://groww.in/mutual-funds/hdfc-nifty-50-index-fund-direct-growth) |
| HDFC Silver ETF FOF | [Link](https://groww.in/mutual-funds/hdfc-silver-etf-fof-direct-growth) |
| HDFC Defence Fund | [Link](https://groww.in/mutual-funds/hdfc-defence-fund-direct-growth) |
| HDFC Equity Fund | [Link](https://groww.in/mutual-funds/hdfc-equity-fund-direct-growth) |
| HDFC Small Cap Fund | [Link](https://groww.in/mutual-funds/hdfc-small-cap-fund-direct-growth) |
| Groww SID Document | [Link](https://groww.in/p/scheme-information-document) |
| HDFC Gold ETF FOF | [Link](https://groww.in/mutual-funds/hdfc-gold-etf-fund-of-fund-direct-plan-growth) |
| HDFC Focused Fund | [Link](https://groww.in/mutual-funds/hdfc-focused-fund-direct-growth) |
| HDFC Fund FAQs | [Link](https://www.hdfcfund.com/distributor-corner/faqs) |

## Sample Q&A

**Q: What is the exit load for the HDFC Small Cap Fund Direct Growth?**  
**A:** The exit load for HDFC Small Cap Fund Direct Growth is typically 1% if redeemed within 1 year. Last updated from sources: [Groww - HDFC Small Cap Fund](https://groww.in/mutual-funds/hdfc-small-cap-fund-direct-growth)

**Q: Does the HDFC Nifty 50 Index Fund have a lock-in period?**  
**A:** No, the HDFC Nifty 50 Index Fund is an open-ended index scheme and does not have a lock-in period. Last updated from sources: [Groww - HDFC Nifty 50 Index Fund](https://groww.in/mutual-funds/hdfc-nifty-50-index-fund-direct-growth)

**Q: Should I invest my money in the HDFC Defence Fund right now?**  
**A:** I can only provide factual information about mutual funds and cannot offer investment advice or recommendations. You may consult a registered financial advisor or review the [Scheme Information Document](https://groww.in/p/scheme-information-document) for detailed fund characteristics.

**Q: What is the minimum SIP amount for the HDFC Equity Fund?**  
**A:** The minimum SIP investment for the HDFC Equity Fund is ₹100. Last updated from sources: [Groww - HDFC Equity Fund](https://groww.in/mutual-funds/hdfc-equity-fund-direct-growth)

**Q: How can I download my capital gains statement?**  
**A:** You can download your capital gains statement directly from the official AMC portal or through your investment platform's tax/reports section. Last updated from sources: [HDFC Fund FAQs](https://www.hdfcfund.com/distributor-corner/faqs)

## Disclaimer Snippet
> **Facts-only. No investment advice.**  
> This assistant provides strictly factual details from official AMC/SEBI/AMFI public documents. It does not provide financial guidance, portfolio recommendations, or performance comparisons.
