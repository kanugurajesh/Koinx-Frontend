const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const fetchBitcoinPrice = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr%2Cusd&include_24hr_change=true",
      {
        headers: {
          "x-cg-demo-api-key": API_KEY as string,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data: data.bitcoin, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

export const fetchTrendingCoins = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        headers: {
          "x-cg-demo-api-key": API_KEY as string,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};
