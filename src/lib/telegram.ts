export type TgWebApp = {
  ready: () => void;
  expand: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
  };
  initDataUnsafe?: {
    start_param?: string;
    user?: { first_name?: string; username?: string };
  };
  openTelegramLink?: (url: string) => void;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}

const SCRIPT = "https://telegram.org/js/telegram-web-app.js";

export function getTg() {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

export function loadTelegram() {
  if (typeof document === "undefined") return Promise.resolve();
  if (window.Telegram?.WebApp) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-vhale-tg]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => resolve(), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.dataset.vhaleTg = "1";
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export function bindTelegram() {
  const tg = getTg();
  if (!tg) return { name: "Гость", startParam: null as string | null };
  try {
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.("#0c1112");
    tg.setBackgroundColor?.("#0c1112");
  } catch {
    /* Preview is not the Telegram host. */
  }
  const user = tg.initDataUnsafe?.user;
  const name = user?.first_name?.trim() || (user?.username ? `@${user.username}` : "Гость");
  return { name, startParam: tg.initDataUnsafe?.start_param ?? null };
}

export function haptic(style: "light" | "medium" = "light") {
  try {
    getTg()?.HapticFeedback?.impactOccurred(style);
  } catch {
    /* ignore */
  }
}

export function openShare(link: string, text: string) {
  const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
  const tg = getTg();
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}
