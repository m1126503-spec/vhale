import { TONAPI_BASE_URL, TONAPI_KEY } from "@/config";

export type Token = {
  symbol: string;
  name: string;
  icon: string;
  price: number;
  balance: string;
  decimals: number;
  address: string;
};

export const FALLBACK_TOKENS: Token[] = [
  {
    symbol: "TON",
    name: "Toncoin",
    icon: "₸",
    price: 7.8,
    balance: "12.45",
    decimals: 9,
    address: "EQD...TON",
  },
  {
    symbol: "USDT",
    name: "Tether USDt",
    icon: "$",
    price: 1,
    balance: "540.21",
    decimals: 6,
    address: "EQD...USDT",
  },
  {
    symbol: "jUSDT",
    name: "Jetton USDT",
    icon: "J",
    price: 0.998,
    balance: "420.14",
    decimals: 6,
    address: "EQD...jUSDT",
  },
  {
    symbol: "NOT",
    name: "Notcoin",
    icon: "N",
    price: 0.0032,
    balance: "5400.0",
    decimals: 9,
    address: "EQD...NOT",
  },
];

async function requestTonApi(path: string, init: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(TONAPI_KEY ? { Authorization: `Bearer ${TONAPI_KEY}` } : {}),
  };

  const response = await fetch(`${TONAPI_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...headers,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`TonAPI request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchMarketPrices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network,tether,notcoin&vs_currencies=usd",
      { headers: { Accept: "application/json" } },
    );

    if (!response.ok) throw new Error("CoinGecko unavailable");
    const data = await response.json();

    return {
      TON: data["the-open-network"]?.usd ?? 7.8,
      USDT: data.tether?.usd ?? 1,
      NOT: data.notcoin?.usd ?? 0.0032,
      jUSDT: 0.998,
    };
  } catch {
    return {
      TON: 7.8,
      USDT: 1,
      NOT: 0.0032,
      jUSDT: 0.998,
    };
  }
}

export async function fetchWalletInfo(address: string) {
  try {
    return await requestTonApi(`/v2/accounts/${address}`);
  } catch {
    return null;
  }
}

export async function fetchJettons(address: string) {
  try {
    const data = await requestTonApi(`/v2/accounts/${address}/jettons`);
    return Array.isArray(data?.jettons) ? data.jettons : [];
  } catch {
    return [];
  }
}
