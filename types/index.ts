export interface BitcoinPrice {
  usd: number;
  inr: number;
  usd_24h_change: number;
  inr_24h_change: number;
}

export interface TrendingCoinData {
  price_change_percentage_24h: {
    usd: number;
  };
  price: string;
  sparkline: string;
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data?: TrendingCoinData;
  };
}

export interface TrendingCoinsResponse {
  coins: TrendingCoin[];
}

export interface TrendingCoinListItem {
  name: string;
  thumb: string;
  symbol: string;
  price_btc: number;
  market_cap_rank: number;
}

export interface LikeCoinListItem {
  symbol: string;
  thumb: string;
  price_change: number;
  price: string;
  sparkline: string;
}
