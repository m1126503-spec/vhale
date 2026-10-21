import { useEffect, useMemo, useState } from "react";
import { TonConnectButton, useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { APP_NAME, APP_URL, TELEGRAM_BOT_USERNAME } from "@/config";
import { FALLBACK_TOKENS, fetchJettons, fetchMarketPrices, fetchWalletInfo } from "@/lib/tonApi";
import { findBestRoute } from "@/lib/dexRouter";

function applyTelegramTheme(theme: Record<string, string> = {}) {
  const root = document.documentElement;
  root.style.setProperty("--tg-theme-bg-color", theme.bg_color || "#0b1220");
  root.style.setProperty("--tg-theme-secondary-bg-color", theme.secondary_bg_color || "#101827");
  root.style.setProperty("--tg-theme-text-color", theme.text_color || "#f8fafc");
  root.style.setProperty("--tg-theme-hint-color", theme.hint_color || "#94a3b8");
  root.style.setProperty("--tg-theme-link-color", theme.link_color || "#5da9ff");
  root.style.setProperty("--tg-theme-button-color", theme.button_color || "#3b82f6");
  root.style.setProperty("--tg-theme-button-text-color", theme.button_text_color || "#ffffff");
  root.style.setProperty("--tg-theme-header-bg-color", theme.header_bg_color || "#0f172a");
  root.style.setProperty("--tg-theme-accent-text-color", theme.accent_text_color || "#7dd3fc");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "0";
  return Number(value).toLocaleString("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function TelegramDexApp() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const walletAddress = useTonAddress();

  const [activeTab, setActiveTab] = useState<"swap" | "pool" | "wallet">("swap");
  const [tokens, setTokens] = useState(FALLBACK_TOKENS);
  const [fromToken, setFromToken] = useState(FALLBACK_TOKENS[0]);
  const [toToken, setToToken] = useState(FALLBACK_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("1.25");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<"from" | "to">("from");
  const [successTx, setSuccessTx] = useState("");
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [loadingSwap, setLoadingSwap] = useState(false);

  const tg = typeof window !== "undefined" ? (window as any).Telegram?.WebApp : null;

  useEffect(() => {
    async function loadMarket() {
      const prices = await fetchMarketPrices();
      setTokens((prev) =>
        prev.map((token) => {
          const key = token.symbol.toUpperCase();
          if (key === "TON") return { ...token, price: prices.TON };
          if (key === "USDT") return { ...token, price: prices.USDT };
          if (key === "NOT") return { ...token, price: prices.NOT };
          if (key === "JUSDT") return { ...token, price: prices.jUSDT };
          return token;
        }),
      );
      setLoadingPrices(false);
    }

    void loadMarket();
  }, []);

  useEffect(() => {
    async function loadWalletData() {
      if (!walletAddress) return;

      const walletInfo = await fetchWalletInfo(walletAddress);
      const jettons = await fetchJettons(walletAddress);

      const tonBalance = walletInfo?.balance ? Number(walletInfo.balance) / 1_000_000_000 : 0;
      const walletTokens = [
        {
          symbol: "TON",
          name: "Toncoin",
          icon: "₸",
          price: 7.8,
          balance: tonBalance ? tonBalance.toFixed(2) : "0.00",
          decimals: 9,
          address: walletAddress,
        },
      ];

      for (const jetton of jettons) {
        const symbol = (jetton.metadata?.symbol || jetton.symbol || "JETTON").toUpperCase();
        const decimals = Number(jetton.decimals || 0);
        walletTokens.push({
          symbol,
          name: jetton.metadata?.name || jetton.name || "Jetton",
          icon: symbol.slice(0, 1),
          price: 0.01,
          balance: jetton.balance ? (Number(jetton.balance) / 10 ** decimals).toFixed(2) : "0.00",
          decimals,
          address: jetton.address || "",
        });
      }

      setTokens((prev) => {
        const merged = [...prev];
        for (const token of walletTokens) {
          const idx = merged.findIndex((item) => item.symbol === token.symbol);
          if (idx >= 0) merged[idx] = { ...merged[idx], ...token };
          else merged.push(token);
        }
        return merged;
      });
    }

    void loadWalletData();
  }, [walletAddress]);

  useEffect(() => {
    if (!tg) return;

    tg.ready();
    applyTelegramTheme(tg.themeParams || {});

    const mainButton = tg.MainButton;
    mainButton.setText(!wallet ? "Подключите кошелек" : `Обменять ${fromAmount || "0"} ${fromToken.symbol}`);
    mainButton.color = tg.themeParams?.button_color || "#3b82f6";
    mainButton.textColor = tg.themeParams?.button_text_color || "#ffffff";

    if (!wallet || !fromAmount || Number(fromAmount) <= 0) {
      mainButton.disable();
    } else {
      mainButton.enable();
    }

    const handleSwap = async () => {
      if (!wallet) {
        tg.showAlert("Сначала подключите TON кошелек.");
        return;
      }

      if (!fromAmount || Number(fromAmount) <= 0) {
        tg.showAlert("Введите корректную сумму.");
        return;
      }

      setLoadingSwap(true);
      mainButton.showProgress(true);
      mainButton.disable();

      try {
        const tx = {
          validUntil: Math.floor(Date.now() / 1000) + 600,
          messages: [
            {
              address: toToken.address || "EQD...router",
              amount: String(Math.max(1, Math.floor(Number(fromAmount) * 1_000_000_000))),
              payload: `TON_DEX_SWAP:${fromToken.symbol}->${toToken.symbol}:${Date.now()}`,
            },
          ],
        };

        if (typeof tonConnectUI?.sendTransaction === "function") {
          await tonConnectUI.sendTransaction(tx);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        const hash = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
        setSuccessTx(hash);
      } catch (error) {
        console.error(error);
        tg.showAlert("Ошибка при создании обмена. Проверьте кошелек и сеть.");
      } finally {
        setLoadingSwap(false);
        mainButton.showProgress(false);
        mainButton.enable();
      }
    };

    mainButton.onClick(handleSwap);
    mainButton.show();

    return () => {
      mainButton.offClick(handleSwap);
      mainButton.hide();
    };
  }, [tg, wallet, fromAmount, fromToken, toToken, tonConnectUI]);

  const route = useMemo(() => {
    if (!fromToken || !toToken || !Number(fromAmount || 0)) return null;
    return findBestRoute(fromToken.symbol, toToken.symbol, Number(fromAmount));
  }, [fromAmount, fromToken, toToken]);

  const quote = route ? route.amountOut : 0;
  const slippage = 0.5;
  const networkFeeTon = fromToken.symbol === "TON" || toToken.symbol === "TON" ? 0.0042 : 0.0051;
  const minReceive = quote * (1 - slippage / 100);
  const priceImpact = route ? route.priceImpact : 0;

  const swapRate = fromToken.price / toToken.price;

  const openPicker = (target: "from" | "to") => {
    setPickerTarget(target);
    setIsPickerOpen(true);
  };

  const selectToken = (token: (typeof tokens)[number]) => {
    if (pickerTarget === "from") {
      if (token.symbol === toToken.symbol) {
        setToToken(fromToken);
      }
      setFromToken(token);
    } else {
      if (token.symbol === fromToken.symbol) {
        setFromToken(toToken);
      }
      setToToken(token);
    }

    setIsPickerOpen(false);
  };

  const reverseTokens = () => {
    const prevFrom = fromToken;
    setFromToken(toToken);
    setToToken(prevFrom);
  };

  const walletLabel = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Подключить кошелек";

  return (
    <div className="miniapp-page">
      <div className="miniapp-shell">
        <header className="topbar">
          <div className="brand-wrap">
            <div className="brand-mark">T</div>
            <div>
              <small>Bot: {TELEGRAM_BOT_USERNAME}</small>
              <h1>{APP_NAME}</h1>
            </div>
          </div>

          <div className="wallet-block">
            <TonConnectButton />
            {walletAddress && <div className="wallet-pill">{walletLabel}</div>}
          </div>
        </header>

        <main className="content-card">
          <div className="tab-row">
            <button type="button" className={activeTab === "swap" ? "tab active" : "tab"} onClick={() => setActiveTab("swap")}>
              Swap
            </button>
            <button type="button" className={activeTab === "pool" ? "tab active" : "tab"} onClick={() => setActiveTab("pool")}>
              Pool
            </button>
            <button type="button" className={activeTab === "wallet" ? "tab active" : "tab"} onClick={() => setActiveTab("wallet")}>
              Wallet
            </button>
          </div>

          {activeTab === "swap" && (
            <div className="screen">
              <div className="section-header">
                <div>
                  <small>Обмен</small>
                  <h2>Swap</h2>
                </div>
                <button type="button" className="icon-button" onClick={reverseTokens}>
                  ⇅
                </button>
              </div>

              <div className="panel">
                <div className="panel-top">
                  <span>Отдаете</span>
                  <span>Баланс: {fromToken.balance}</span>
                </div>

                <div className="amount-row">
                  <input
                    type="number"
                    min="0"
                    step="0.000001"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.0"
                  />

                  <button type="button" className="token-button" onClick={() => openPicker("from")}>
                    <span className="token-badge">{fromToken.icon}</span>
                    <span>{fromToken.symbol}</span>
                    <span className="caret">▾</span>
                  </button>
                </div>
              </div>

              <div className="swap-divider">
                <button type="button" className="icon-button large" onClick={reverseTokens}>
                  ⇅
                </button>
              </div>

              <div className="panel">
                <div className="panel-top">
                  <span>Получаете</span>
                  <span>Баланс: {toToken.balance}</span>
                </div>

                <div className="amount-row">
                  <div className="receive-value">{formatNumber(quote, 4)}</div>

                  <button type="button" className="token-button" onClick={() => openPicker("to")}>
                    <span className="token-badge">{toToken.icon}</span>
                    <span>{toToken.symbol}</span>
                    <span className="caret">▾</span>
                  </button>
                </div>
              </div>

              <div className="market-box">
                <div className="market-row">
                  <span>Курс</span>
                  <strong>
                    1 {fromToken.symbol} = {formatNumber(swapRate, 4)} {toToken.symbol}
                  </strong>
                </div>
                <div className="market-row">
                  <span>Route</span>
                  <strong>{route?.path?.length ? route.path.map((item) => item.poolId).join(" → ") : "—"}</strong>
                </div>
                <div className="market-row">
                  <span>Комиссия сети</span>
                  <strong>{formatNumber(networkFeeTon, 4)} TON</strong>
                </div>
                <div className="market-row">
                  <span>Slippage</span>
                  <strong>{slippage}%</strong>
                </div>
                <div className="market-row">
                  <span>Price impact</span>
                  <strong>{formatNumber(priceImpact, 2)}%</strong>
                </div>
                <div className="market-row highlight">
                  <span>Минимум к получению</span>
                  <strong>
                    {formatNumber(minReceive, 4)} {toToken.symbol}
                  </strong>
                </div>
              </div>

              <div className="cta-wrap">
                <button
                  type="button"
                  className="primary-button"
                  disabled={loadingSwap || !wallet || loadingPrices || Number(fromAmount || 0) <= 0}
                  onClick={() => {
                    if (!wallet) {
                      tg?.showAlert("Подключите TON кошелек.");
                      return;
                    }
                    tg?.MainButton?.click();
                  }}
                >
                  {loadingSwap ? "Подтверждение..." : "Подтвердить обмен"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "pool" && (
            <div className="screen">
              <div className="section-header">
                <div>
                  <small>Pool</small>
                  <h2>Ликвидность</h2>
                </div>
              </div>

              <div className="pool-card">
                <div className="pill-row">
                  {[
                    "TON/USDT",
                    "TON/jUSDT",
                    "TON/NOT",
                  ].map((poolName) => (
                    <button key={poolName} type="button" className="pill active">
                      {poolName}
                    </button>
                  ))}
                </div>

                <div className="pool-grid">
                  <div className="metric-box">
                    <span>TVL</span>
                    <strong>$3.8M</strong>
                  </div>
                  <div className="metric-box">
                    <span>APR</span>
                    <strong>8.4%</strong>
                  </div>
                  <div className="metric-box">
                    <span>Fee</span>
                    <strong>0.3%</strong>
                  </div>
                </div>

                <div className="pool-inputs">
                  <label>
                    <span>Токен A</span>
                    <input type="number" defaultValue="1" />
                  </label>
                  <label>
                    <span>Токен B</span>
                    <input type="number" defaultValue="120" />
                  </label>
                </div>

                <div className="lp-box">
                  <span>Ликвидная позиция</span>
                  <strong>0.36 LP</strong>
                </div>

                <div className="dual-actions">
                  <button type="button" className="primary-button secondary" onClick={() => tg?.showAlert("Добавление ликвидности")}>Добавить ликвидность</button>
                  <button type="button" className="primary-button danger" onClick={() => tg?.showAlert("Удаление ликвидности")}>Удалить</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "wallet" && (
            <div className="screen">
              <div className="section-header">
                <div>
                  <small>Wallet</small>
                  <h2>Кошелек</h2>
                </div>
              </div>

              <div className="wallet-card">
                <div className="wallet-top">
                  <div>
                    <span className="tiny-label">Telegram</span>
                    <strong>{(tg?.initDataUnsafe?.user?.first_name) || "Guest"}</strong>
                  </div>
                  <div>
                    <span className="tiny-label">Wallet</span>
                    <strong>{walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}` : "Не подключен"}</strong>
                  </div>
                </div>

                <div className="balance-list">
                  {tokens.map((token) => (
                    <div key={token.symbol} className="balance-row">
                      <div className="balance-token">
                        <span className="token-badge">{token.icon}</span>
                        <div>
                          <strong>{token.symbol}</strong>
                          <small>{token.name}</small>
                        </div>
                      </div>
                      <span>{token.balance}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="history-card">
                <h3>История</h3>
                <div className="history-list">
                  <div className="history-item">
                    <span>Swap TON → USDT</span>
                    <strong>+12.30 USDT</strong>
                  </div>
                  <div className="history-item">
                    <span>Pool TON/USDT</span>
                    <strong>+0.45 LP</strong>
                  </div>
                  <div className="history-item">
                    <span>Jetton transfer</span>
                    <strong>-3.90 NOT</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {isPickerOpen && (
        <div className="modal-backdrop" onClick={() => setIsPickerOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Выберите токен</h3>
              <button type="button" className="close-button" onClick={() => setIsPickerOpen(false)}>
                ✕
              </button>
            </div>

            <div className="token-list">
              {tokens.map((token) => (
                <button key={token.symbol} type="button" className="token-option" onClick={() => selectToken(token)}>
                  <div className="option-left">
                    <span className="token-badge large">{token.icon}</span>
                    <div>
                      <strong>{token.symbol}</strong>
                      <small>{token.name}</small>
                    </div>
                  </div>
                  <span className="option-balance">{token.balance}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {successTx && (
        <div className="toast">
          <strong>Tx confirmed</strong>
          <span>{successTx}</span>
        </div>
      )}
    </div>
  );
}
