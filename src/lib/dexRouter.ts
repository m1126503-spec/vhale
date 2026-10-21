export type Pool = {
  id: string;
  tokenA: string;
  tokenB: string;
  reserveA: number;
  reserveB: number;
  feeRate: number;
  addressA: string;
  addressB: string;
};

export const AMM_POOLS: Pool[] = [
  {
    id: "ton-usdt",
    tokenA: "TON",
    tokenB: "USDT",
    reserveA: 9200,
    reserveB: 116000,
    feeRate: 0.003,
    addressA: "EQD...TON_POOL_A",
    addressB: "EQD...USDT_POOL_B",
  },
  {
    id: "ton-jusdt",
    tokenA: "TON",
    tokenB: "jUSDT",
    reserveA: 3100,
    reserveB: 24500,
    feeRate: 0.003,
    addressA: "EQD...TON_JUSDT_A",
    addressB: "EQD...JUSDT_POOL_B",
  },
  {
    id: "ton-not",
    tokenA: "TON",
    tokenB: "NOT",
    reserveA: 6100,
    reserveB: 720000,
    feeRate: 0.003,
    addressA: "EQD...TON_NOT_A",
    addressB: "EQD...NOT_POOL_B",
  },
  {
    id: "usdt-jusdt",
    tokenA: "USDT",
    tokenB: "jUSDT",
    reserveA: 150000,
    reserveB: 149440,
    feeRate: 0.003,
    addressA: "EQD...USDT_JUSDT_A",
    addressB: "EQD...JUSDT_POOL_B",
  },
];

function getPoolQuote(pool: Pool, amountIn: number, direction: "AtoB" | "BtoA") {
  const reserveIn = direction === "AtoB" ? pool.reserveA : pool.reserveB;
  const reserveOut = direction === "AtoB" ? pool.reserveB : pool.reserveA;

  if (amountIn <= 0 || reserveIn <= 0 || reserveOut <= 0) return 0;

  const feeAdjustedAmount = amountIn * (1 - pool.feeRate);
  const numerator = feeAdjustedAmount * reserveOut;
  const denominator = reserveIn + feeAdjustedAmount;

  return numerator / denominator;
}

export function findBestRoute(fromToken: string, toToken: string, amountIn: number) {
  if (!amountIn || amountIn <= 0 || fromToken === toToken) {
    return {
      route: [],
      amountOut: amountIn,
      priceImpact: 0,
      path: [],
    };
  }

  const adjacency = new Map<string, Pool[]>();
  for (const pool of AMM_POOLS) {
    if (!adjacency.has(pool.tokenA)) adjacency.set(pool.tokenA, []);
    if (!adjacency.has(pool.tokenB)) adjacency.set(pool.tokenB, []);
    adjacency.get(pool.tokenA)!.push(pool);
    adjacency.get(pool.tokenB)!.push(pool);
  }

  const routes: Pool[][] = [];
  const visited = new Set<string>();

  const dfs = (current: string, target: string, currentRoute: Pool[], usedPools: Set<string>) => {
    if (current === target) {
      routes.push([...currentRoute]);
      return;
    }

    for (const pool of adjacency.get(current) ?? []) {
      const next = pool.tokenA === current ? pool.tokenB : pool.tokenB === current ? pool.tokenA : null;
      if (!next || visited.has(next) || usedPools.has(pool.id)) continue;

      visited.add(next);
      usedPools.add(pool.id);
      currentRoute.push(pool);
      dfs(next, target, currentRoute, usedPools);
      currentRoute.pop();
      usedPools.delete(pool.id);
      visited.delete(next);
    }
  };

  visited.add(fromToken);
  dfs(fromToken, toToken, [], new Set());

  let best = null as null | { route: Pool[]; amountOut: number; priceImpact: number; path: { poolId: string; tokenA: string; tokenB: string }[] };

  for (const route of routes) {
    let currentAmount = amountIn;
    let currentToken = fromToken;

    for (const pool of route) {
      const direction = pool.tokenA === currentToken ? "AtoB" : "BtoA";
      const nextToken = direction === "AtoB" ? pool.tokenB : pool.tokenA;
      currentAmount = getPoolQuote(pool, currentAmount, direction);
      currentToken = nextToken;
    }

    const priceImpact = Math.min(2.5, Math.max(0.05, currentAmount > 0 ? (amountIn / currentAmount) * 0.15 : 0.05));

    if (!best || currentAmount > best.amountOut) {
      best = {
        route,
        amountOut: currentAmount,
        priceImpact,
        path: route.map((pool) => ({ poolId: pool.id, tokenA: pool.tokenA, tokenB: pool.tokenB })),
      };
    }
  }

  return best ?? { route: [], amountOut: amountIn, priceImpact: 0, path: [] };
}
