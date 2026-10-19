export type UpgradeId = "tap" | "tank" | "regen" | "depth";
export type TaskId = "daily" | "taps30" | "taps100" | "upgrade" | "share";
export type ShopId = "refill" | "surge" | "lease";

export type Purchase = {
  id: string;
  title: string;
  stars: number;
  at: number;
};

export type Save = {
  balance: number;
  totalEarned: number;
  energy: number;
  maxEnergy: number;
  regen: number;
  tapPower: number;
  perHour: number;
  levels: Record<UpgradeId, number>;
  tapsToday: number;
  day: string;
  streak: number;
  lastClaim: string | null;
  sharedToday: boolean;
  upgradedToday: boolean;
  claimed: Partial<Record<TaskId, boolean>>;
  boostUntil: number;
  premiumDepth: boolean;
  purchases: Purchase[];
  lastTick: number;
  refCode: string;
  introSeen: boolean;
  welcomed: boolean;
  invitedBy: string | null;
};

export const UPGRADES: Record<
  UpgradeId,
  { title: string; detail: string; base: number; growth: number; max: number }
> = {
  tap: { title: "Касание", detail: "+1 VHL за нажатие", base: 25, growth: 1.68, max: 25 },
  tank: { title: "Запас", detail: "+80 энергии", base: 50, growth: 1.7, max: 20 },
  regen: { title: "Течение", detail: "+1 энергия в секунду", base: 80, growth: 1.72, max: 12 },
  depth: { title: "Глубина", detail: "+180 VHL в час", base: 100, growth: 1.78, max: 30 },
};

export const SHOP: { id: ShopId; title: string; detail: string; stars: number }[] = [
  { id: "refill", title: "Полный бак", detail: "Энергия до максимума", stars: 5 },
  { id: "surge", title: "Всплеск", detail: "Удвоение касания на час", stars: 15 },
  { id: "lease", title: "Аренда глубины", detail: "+500 VHL в час навсегда", stars: 49 },
];

const STREAK = [80, 120, 180, 250, 340, 460, 700];
const OFFLINE_CAP = 8 * 60 * 60 * 1000;

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function shiftDays(d: Date, days: number) {
  const next = new Date(d);
  next.setDate(next.getDate() + days);
  return next;
}

function makeCode() {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

export function freshSave(now = Date.now()): Save {
  return {
    balance: 0,
    totalEarned: 0,
    energy: 160,
    maxEnergy: 160,
    regen: 1,
    tapPower: 1,
    perHour: 0,
    levels: { tap: 0, tank: 0, regen: 0, depth: 0 },
    tapsToday: 0,
    day: todayKey(new Date(now)),
    streak: 0,
    lastClaim: null,
    sharedToday: false,
    upgradedToday: false,
    claimed: {},
    boostUntil: 0,
    premiumDepth: false,
    purchases: [],
    lastTick: now,
    refCode: makeCode(),
    introSeen: false,
    welcomed: false,
    invitedBy: null,
  };
}

export function formatNum(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.floor(n));
}

export function formatWhen(at: number) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(at);
}

export function formatLeft(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function incomePerHour(save: Save) {
  return save.perHour + (save.premiumDepth ? 500 : 0);
}

export function tapValue(save: Save, now = Date.now()) {
  return save.tapPower * (now < save.boostUntil ? 2 : 1);
}

export function upgradeCost(id: UpgradeId, level: number) {
  const spec = UPGRADES[id];
  return Math.round(spec.base * spec.growth ** level);
}

export function nextStreak(save: Save, now = new Date()) {
  const today = todayKey(now);
  if (save.lastClaim === today) return save.streak;
  if (!save.lastClaim) return 1;
  if (save.lastClaim === todayKey(shiftDays(now, -1))) return Math.min(7, save.streak + 1);
  return 1;
}

export function dailyReward(save: Save, now = new Date()) {
  const step = nextStreak(save, now);
  return STREAK[Math.max(0, Math.min(STREAK.length, step) - 1)] ?? STREAK[0];
}

export function withClock(save: Save, now = Date.now()): Save {
  const day = todayKey(new Date(now));
  let next = save;
  if (save.day !== day) {
    next = {
      ...next,
      day,
      tapsToday: 0,
      sharedToday: false,
      upgradedToday: false,
      claimed: {},
    };
  }
  const elapsed = Math.max(0, Math.min(now - next.lastTick, OFFLINE_CAP));
  const gained = (incomePerHour(next) * elapsed) / 3_600_000;
  const energy = Math.min(next.maxEnergy, next.energy + (next.regen * elapsed) / 1000);
  return {
    ...next,
    balance: next.balance + gained,
    totalEarned: next.totalEarned + gained,
    energy,
    lastTick: now,
  };
}

export function applyUpgrade(save: Save, id: UpgradeId): Save {
  if (id === "tap") return { ...save, tapPower: save.tapPower + 1 };
  if (id === "tank") {
    const maxEnergy = save.maxEnergy + 80;
    return { ...save, maxEnergy, energy: Math.min(maxEnergy, save.energy + 80) };
  }
  if (id === "regen") return { ...save, regen: save.regen + 1 };
  return { ...save, perHour: save.perHour + 180 };
}

const RANKS = [
  { at: 0, name: "Мелководье" },
  { at: 400, name: "Стая" },
  { at: 2_000, name: "Глубина" },
  { at: 8_000, name: "Кит" },
  { at: 30_000, name: "Vhale" },
];

export function rankOf(total: number) {
  let index = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (total >= RANKS[i].at) index = i;
  }
  const current = RANKS[index];
  const next = RANKS[index + 1];
  if (!next) return { name: current.name, next: null as string | null, pct: 1, left: 0 };
  const span = next.at - current.at;
  const pct = Math.min(1, Math.max(0, (total - current.at) / span));
  return { name: current.name, next: next.name, pct, left: Math.max(0, next.at - total) };
}

export type TaskView = {
  id: TaskId;
  title: string;
  detail: string;
  reward: number;
  ready: boolean;
  claimed: boolean;
};

export function tasksOf(save: Save, now = new Date()): TaskView[] {
  const today = todayKey(now);
  const dailyClaimed = save.lastClaim === today;
  return [
    {
      id: "daily",
      title: "Спуск дня",
      detail: save.streak > 0 ? `Серия ${save.streak} из 7` : "Начните серию",
      reward: dailyReward(save, now),
      ready: !dailyClaimed,
      claimed: dailyClaimed,
    },
    {
      id: "taps30",
      title: "30 касаний",
      detail: `${Math.min(save.tapsToday, 30)} из 30`,
      reward: 40,
      ready: save.tapsToday >= 30 && !save.claimed.taps30,
      claimed: Boolean(save.claimed.taps30),
    },
    {
      id: "taps100",
      title: "100 касаний",
      detail: `${Math.min(save.tapsToday, 100)} из 100`,
      reward: 120,
      ready: save.tapsToday >= 100 && !save.claimed.taps100,
      claimed: Boolean(save.claimed.taps100),
    },
    {
      id: "upgrade",
      title: "Любой буст",
      detail: save.upgradedToday ? "Улучшение куплено" : "Купите улучшение",
      reward: 60,
      ready: save.upgradedToday && !save.claimed.upgrade,
      claimed: Boolean(save.claimed.upgrade),
    },
    {
      id: "share",
      title: "Поделиться ботом",
      detail: save.sharedToday ? "Ссылка отправлена" : "Отправьте ссылку другу",
      reward: 80,
      ready: save.sharedToday && !save.claimed.share,
      claimed: Boolean(save.claimed.share),
    },
  ];
}
