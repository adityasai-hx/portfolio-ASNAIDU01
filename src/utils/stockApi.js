const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const YAHOO_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart/';

export async function fetchStockData(symbol) {
  try {
    const url = `${CORS_PROXY}${encodeURIComponent(`${YAHOO_BASE}${symbol}`)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    const contents = JSON.parse(data.contents);
    
    if (!contents.chart?.result?.[0]) return null;
    
    const meta = contents.chart.result[0].meta;
    const price = meta.regularMarketPrice;
    const prevClose = meta.previousClose;
    const change = price - prevClose;
    const changePercent = (change / prevClose) * 100;
    
    return {
      symbol: meta.symbol,
      price: price.toFixed(2),
      currency: meta.currency,
      trend: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
      up: changePercent >= 0
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

export async function fetchMultipleStocks(symbols) {
  const results = await Promise.all(symbols.map(s => fetchStockData(s)));
  return results.filter(r => r !== null);
}
