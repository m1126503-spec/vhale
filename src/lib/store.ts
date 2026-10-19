import { create } from "zustand";
import {
  applyUpgrade,
  dailyReward,
  freshSave,
  nextStreak,
  SHOP,
  tasksOf,
  todayKey,
  upgradeCost,
  UPGRADES,
  withClock,
  type Purchase,
  type Save,
  type ShopId,
  type TaskId,
  type UpgradeId,
} from "@/lib/economy";
import { bindTelegram, loadTelegram } from "@/lib/telegram";

const KEY = "vhale-save-v1";

function isPurchase(value: unknown): value is Purchase {
  if (!value || typeof value !== "object") return false;
  const item = value as Purchase;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.stars === "number" &&
    typeof item.at === "number"
  );
}

function loadSave(): Save | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Save>;
    const base = freshSave();
    return {
      ...base,
      ...parsed,
      levels: { ...base.levels, ...(parsed.levels ?? {}) },
      claimed: parsed.claimed ?? {},
      purchases: Array.isArray(parsed.purchases) ? parsed.purchases.filter(isPurchase) : [],
      refCode: typeof parsed.refCode === "string" ? parsed.refCode : base.refCode,
    };
  } catch {
    return null;
  }
}

function persist(save: Save) {
  localStorage.setItem(KEY, JSON.stringify(save));
}

function applyWelcome(save: Save, startParam: string | null) {
  if (!startParam?.startsWith("ref_") || save.welcomed) return save;
  return {
    ...save,
    welcomed: true,
    invitedBy: startParam,
    balance: save.balance + 100,
    totalEarned: save.totalEarned + 100,
  };
}

type Game = {
  save: Save;
  booted: boolean;
  profileName: string;
  boot: () => void;
  seeIntro: () => void;
  tap: () => number;
  buyUpgrade: (id: UpgradeId) => boolean;
  claim: (id: TaskId) => boolean;
  markShared: () => void;
  buyShop: (id: ShopId) => boolean;
  tick: () => void;
};

export const useGame = create<Game>((set, get) => ({
  save: freshSave(0),
  booted: false,
  profileName: "Гость",
  boot: () => {
    const now = Date.now();
    const loaded = loadSave();
    let save = withClock(loaded ?? freshSave(now), now);
    const session = bindTelegram();
    save = applyWelcome(save, session.startParam);
    persist(save);
    set({ save, booted: true, profileName: session.name });
    void loadTelegram().then(() => {
      const next = bindTelegram();
      set((state) => {
        const welcomed = applyWelcome(state.save, next.startParam);
        if (welcomed !== state.save) persist(welcomed);
        return { save: welcomed, profileName: next.name };
      });
    });
  },
  seeIntro: () => {
    if (!get().booted) return;
    const save = { ...withClock(get().save), introSeen: true };
    persist(save);
    set({ save });
  },
  tap: () => {
    if (!get().booted) return 0;
    const save = withClock(get().save);
    if (save.energy < 1) {
      persist(save);
      set({ save });
      return 0;
    }
    const gain = save.tapPower * (Date.now() < save.boostUntil ? 2 : 1);
    const next: Save = {
      ...save,
      energy: save.energy - 1,
      balance: save.balance + gain,
      totalEarned: save.totalEarned + gain,
      tapsToday: save.tapsToday + 1,
    };
    persist(next);
    set({ save: next });
    return gain;
  },
  buyUpgrade: (id) => {
    if (!get().booted) return false;
    const current = withClock(get().save);
    const level = current.levels[id];
    if (level >= UPGRADES[id].max) return false;
    const cost = upgradeCost(id, level);
    if (current.balance < cost) return false;
    const save = applyUpgrade(
      {
        ...current,
        balance: current.balance - cost,
        upgradedToday: true,
        levels: { ...current.levels, [id]: level + 1 },
      },
      id,
    );
    persist(save);
    set({ save });
    return true;
  },
  claim: (id) => {
    if (!get().booted) return false;
    const now = new Date();
    let save = withClock(get().save, now.getTime());
    if (id === "daily") {
      if (save.lastClaim === todayKey(now)) return false;
      const reward = dailyReward(save, now);
      save = {
        ...save,
        streak: nextStreak(save, now),
        lastClaim: todayKey(now),
        balance: save.balance + reward,
        totalEarned: save.totalEarned + reward,
      };
      persist(save);
      set({ save });
      return true;
    }
    const view = tasksOf(save, now).find((task) => task.id === id);
    if (!view?.ready) return false;
    save = {
      ...save,
      claimed: { ...save.claimed, [id]: true },
      balance: save.balance + view.reward,
      totalEarned: save.totalEarned + view.reward,
    };
    persist(save);
    set({ save });
    return true;
  },
  markShared: () => {
    if (!get().booted) return;
    const save = { ...withClock(get().save), sharedToday: true };
    persist(save);
    set({ save });
  },
  buyShop: (id) => {
    if (!get().booted) return false;
    const item = SHOP.find((entry) => entry.id === id);
    if (!item) return false;
    let save = withClock(get().save);
    if (id === "lease" && save.premiumDepth) return false;
    if (id === "refill") save = { ...save, energy: save.maxEnergy };
    if (id === "surge") {
      const start = Math.max(Date.now(), save.boostUntil);
      save = { ...save, boostUntil: start + 60 * 60 * 1000 };
    }
    if (id === "lease") save = { ...save, premiumDepth: true };
    save = {
      ...save,
      purchases: [
        { id: `${id}-${Date.now()}`, title: item.title, stars: item.stars, at: Date.now() },
        ...save.purchases,
      ].slice(0, 20),
    };
    persist(save);
    set({ save });
    return true;
  },
  tick: () => {
    if (!get().booted) return;
    const save = withClock(get().save);
    persist(save);
    set({ save });
  },
}));
