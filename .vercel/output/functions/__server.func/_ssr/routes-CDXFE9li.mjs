import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Users, c as ListChecks, i as Wallet, l as Droplets, n as X, r as Waves, s as Star, t as Zap, u as CircleHelp } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CDXFE9li.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var whale_default = "/assets/whale-yU1r02fy.jpg";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[opacity,background-color,transform] duration-150 ease-out disabled:opacity-40 active:scale-95", {
	variants: {
		variant: {
			primary: "bg-tide text-tide-ink hover:opacity-90",
			secondary: "border border-line bg-ink text-foam hover:bg-panel-2",
			ghost: "text-mist hover:text-foam"
		},
		size: {
			md: "h-11 px-4 text-sm",
			sm: "h-10 px-3 text-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Sheet({ open, onOpenChange, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "sheet-overlay fixed inset-0 z-40 bg-ink/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sheet-content fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-md flex-col rounded-t-xl border border-line bg-panel outline-none",
			style: { paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 px-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-semibold tracking-tight text-foam",
						children: title
					}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-1 text-sm leading-normal text-mist",
						children: description
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "sr-only",
						children: title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "grid size-11 shrink-0 place-items-center rounded-md text-mist hover:bg-panel-2 hover:text-foam",
					"aria-label": "Закрыть",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 overflow-y-auto px-4 pt-4",
				children
			})]
		})] })
	});
}
var BOT_USERNAME = "Medved_23bot";
var BOT_HANDLE = "@Medved_23bot";
function referralLink(code) {
	return `https://t.me/${BOT_USERNAME}?startapp=ref_${code}`;
}
var STEPS = [
	{
		n: "1",
		title: "Адрес",
		body: "Опубликуйте Vhale и скопируйте адрес страницы. Локальный предпросмотр в бота не вставится."
	},
	{
		n: "2",
		title: "Mini App",
		body: `BotFather → ${BOT_HANDLE} → Mini Apps. Вставьте адрес и задайте короткое имя, например app.`
	},
	{
		n: "3",
		title: "Кнопка меню",
		body: "Bot Settings → Menu Button. Та же ссылка, подпись «Vhale». Кнопка появится в чате с ботом."
	},
	{
		n: "4",
		title: "Звёзды",
		body: "Боевой платёж создаёт бот: createInvoiceLink, валюта XTR. Кнопка «Применить демо» в превью ничего не списывает."
	}
];
function ConnectSheet({ open, onOpenChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		title: "Подключение к боту",
		description: "Четыре шага, чтобы Vhale открывался из Telegram и принимал звёзды.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-4 pb-2",
			children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-7 shrink-0 place-items-center rounded-full bg-panel-2 text-sm text-tide",
					children: step.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foam",
						children: step.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-normal text-mist",
						children: step.body
					})]
				})]
			}, step.n))
		})
	});
}
var UPGRADES = {
	tap: {
		title: "Касание",
		detail: "+1 VHL за нажатие",
		base: 25,
		growth: 1.68,
		max: 25
	},
	tank: {
		title: "Запас",
		detail: "+80 энергии",
		base: 50,
		growth: 1.7,
		max: 20
	},
	regen: {
		title: "Течение",
		detail: "+1 энергия в секунду",
		base: 80,
		growth: 1.72,
		max: 12
	},
	depth: {
		title: "Глубина",
		detail: "+180 VHL в час",
		base: 100,
		growth: 1.78,
		max: 30
	}
};
var SHOP = [
	{
		id: "refill",
		title: "Полный бак",
		detail: "Энергия до максимума",
		stars: 5
	},
	{
		id: "surge",
		title: "Всплеск",
		detail: "Удвоение касания на час",
		stars: 15
	},
	{
		id: "lease",
		title: "Аренда глубины",
		detail: "+500 VHL в час навсегда",
		stars: 49
	}
];
var STREAK = [
	80,
	120,
	180,
	250,
	340,
	460,
	700
];
var OFFLINE_CAP = 288e5;
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function shiftDays(d, days) {
	const next = new Date(d);
	next.setDate(next.getDate() + days);
	return next;
}
function makeCode() {
	const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
	let code = "";
	for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * 31)];
	return code;
}
function freshSave(now = Date.now()) {
	return {
		balance: 0,
		totalEarned: 0,
		energy: 160,
		maxEnergy: 160,
		regen: 1,
		tapPower: 1,
		perHour: 0,
		levels: {
			tap: 0,
			tank: 0,
			regen: 0,
			depth: 0
		},
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
		invitedBy: null
	};
}
function formatNum(n) {
	return new Intl.NumberFormat("ru-RU").format(Math.floor(n));
}
function formatWhen(at) {
	return new Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}).format(at);
}
function formatLeft(ms) {
	const total = Math.max(0, Math.ceil(ms / 1e3));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function incomePerHour(save) {
	return save.perHour + (save.premiumDepth ? 500 : 0);
}
function tapValue(save, now = Date.now()) {
	return save.tapPower * (now < save.boostUntil ? 2 : 1);
}
function upgradeCost(id, level) {
	const spec = UPGRADES[id];
	return Math.round(spec.base * spec.growth ** level);
}
function nextStreak(save, now = /* @__PURE__ */ new Date()) {
	const today = todayKey(now);
	if (save.lastClaim === today) return save.streak;
	if (!save.lastClaim) return 1;
	if (save.lastClaim === todayKey(shiftDays(now, -1))) return Math.min(7, save.streak + 1);
	return 1;
}
function dailyReward(save, now = /* @__PURE__ */ new Date()) {
	const step = nextStreak(save, now);
	return STREAK[Math.max(0, Math.min(STREAK.length, step) - 1)] ?? STREAK[0];
}
function withClock(save, now = Date.now()) {
	const day = todayKey(new Date(now));
	let next = save;
	if (save.day !== day) next = {
		...next,
		day,
		tapsToday: 0,
		sharedToday: false,
		upgradedToday: false,
		claimed: {}
	};
	const elapsed = Math.max(0, Math.min(now - next.lastTick, OFFLINE_CAP));
	const gained = incomePerHour(next) * elapsed / 36e5;
	const energy = Math.min(next.maxEnergy, next.energy + next.regen * elapsed / 1e3);
	return {
		...next,
		balance: next.balance + gained,
		totalEarned: next.totalEarned + gained,
		energy,
		lastTick: now
	};
}
function applyUpgrade(save, id) {
	if (id === "tap") return {
		...save,
		tapPower: save.tapPower + 1
	};
	if (id === "tank") {
		const maxEnergy = save.maxEnergy + 80;
		return {
			...save,
			maxEnergy,
			energy: Math.min(maxEnergy, save.energy + 80)
		};
	}
	if (id === "regen") return {
		...save,
		regen: save.regen + 1
	};
	return {
		...save,
		perHour: save.perHour + 180
	};
}
var RANKS = [
	{
		at: 0,
		name: "Мелководье"
	},
	{
		at: 400,
		name: "Стая"
	},
	{
		at: 2e3,
		name: "Глубина"
	},
	{
		at: 8e3,
		name: "Кит"
	},
	{
		at: 3e4,
		name: "Vhale"
	}
];
function rankOf(total) {
	let index = 0;
	for (let i = 0; i < RANKS.length; i++) if (total >= RANKS[i].at) index = i;
	const current = RANKS[index];
	const next = RANKS[index + 1];
	if (!next) return {
		name: current.name,
		next: null,
		pct: 1,
		left: 0
	};
	const span = next.at - current.at;
	const pct = Math.min(1, Math.max(0, (total - current.at) / span));
	return {
		name: current.name,
		next: next.name,
		pct,
		left: Math.max(0, next.at - total)
	};
}
function tasksOf(save, now = /* @__PURE__ */ new Date()) {
	const today = todayKey(now);
	const dailyClaimed = save.lastClaim === today;
	return [
		{
			id: "daily",
			title: "Спуск дня",
			detail: save.streak > 0 ? `Серия ${save.streak} из 7` : "Начните серию",
			reward: dailyReward(save, now),
			ready: !dailyClaimed,
			claimed: dailyClaimed
		},
		{
			id: "taps30",
			title: "30 касаний",
			detail: `${Math.min(save.tapsToday, 30)} из 30`,
			reward: 40,
			ready: save.tapsToday >= 30 && !save.claimed.taps30,
			claimed: Boolean(save.claimed.taps30)
		},
		{
			id: "taps100",
			title: "100 касаний",
			detail: `${Math.min(save.tapsToday, 100)} из 100`,
			reward: 120,
			ready: save.tapsToday >= 100 && !save.claimed.taps100,
			claimed: Boolean(save.claimed.taps100)
		},
		{
			id: "upgrade",
			title: "Любой буст",
			detail: save.upgradedToday ? "Улучшение куплено" : "Купите улучшение",
			reward: 60,
			ready: save.upgradedToday && !save.claimed.upgrade,
			claimed: Boolean(save.claimed.upgrade)
		},
		{
			id: "share",
			title: "Поделиться ботом",
			detail: save.sharedToday ? "Ссылка отправлена" : "Отправьте ссылку другу",
			reward: 80,
			ready: save.sharedToday && !save.claimed.share,
			claimed: Boolean(save.claimed.share)
		}
	];
}
var SCRIPT = "https://telegram.org/js/telegram-web-app.js";
function getTg() {
	if (typeof window === "undefined") return null;
	return window.Telegram?.WebApp ?? null;
}
function loadTelegram() {
	if (typeof document === "undefined") return Promise.resolve();
	if (window.Telegram?.WebApp) return Promise.resolve();
	return new Promise((resolve) => {
		const existing = document.querySelector("script[data-vhale-tg]");
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
function bindTelegram() {
	const tg = getTg();
	if (!tg) return {
		name: "Гость",
		startParam: null
	};
	try {
		tg.ready();
		tg.expand();
		tg.setHeaderColor?.("#0c1112");
		tg.setBackgroundColor?.("#0c1112");
	} catch {}
	const user = tg.initDataUnsafe?.user;
	return {
		name: user?.first_name?.trim() || (user?.username ? `@${user.username}` : "Гость"),
		startParam: tg.initDataUnsafe?.start_param ?? null
	};
}
function haptic(style = "light") {
	try {
		getTg()?.HapticFeedback?.impactOccurred(style);
	} catch {}
}
function openShare(link, text) {
	const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
	const tg = getTg();
	if (tg?.openTelegramLink) {
		tg.openTelegramLink(url);
		return;
	}
	window.open(url, "_blank", "noopener,noreferrer");
}
var KEY = "vhale-save-v1";
function isPurchase(value) {
	if (!value || typeof value !== "object") return false;
	const item = value;
	return typeof item.id === "string" && typeof item.title === "string" && typeof item.stars === "number" && typeof item.at === "number";
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		const base = freshSave();
		return {
			...base,
			...parsed,
			levels: {
				...base.levels,
				...parsed.levels ?? {}
			},
			claimed: parsed.claimed ?? {},
			purchases: Array.isArray(parsed.purchases) ? parsed.purchases.filter(isPurchase) : [],
			refCode: typeof parsed.refCode === "string" ? parsed.refCode : base.refCode
		};
	} catch {
		return null;
	}
}
function persist(save) {
	localStorage.setItem(KEY, JSON.stringify(save));
}
function applyWelcome(save, startParam) {
	if (!startParam?.startsWith("ref_") || save.welcomed) return save;
	return {
		...save,
		welcomed: true,
		invitedBy: startParam,
		balance: save.balance + 100,
		totalEarned: save.totalEarned + 100
	};
}
var useGame = create((set, get) => ({
	save: freshSave(0),
	booted: false,
	profileName: "Гость",
	boot: () => {
		const now = Date.now();
		let save = withClock(loadSave() ?? freshSave(now), now);
		const session = bindTelegram();
		save = applyWelcome(save, session.startParam);
		persist(save);
		set({
			save,
			booted: true,
			profileName: session.name
		});
		loadTelegram().then(() => {
			const next = bindTelegram();
			set((state) => {
				const welcomed = applyWelcome(state.save, next.startParam);
				if (welcomed !== state.save) persist(welcomed);
				return {
					save: welcomed,
					profileName: next.name
				};
			});
		});
	},
	seeIntro: () => {
		if (!get().booted) return;
		const save = {
			...withClock(get().save),
			introSeen: true
		};
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
		const next = {
			...save,
			energy: save.energy - 1,
			balance: save.balance + gain,
			totalEarned: save.totalEarned + gain,
			tapsToday: save.tapsToday + 1
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
		const save = applyUpgrade({
			...current,
			balance: current.balance - cost,
			upgradedToday: true,
			levels: {
				...current.levels,
				[id]: level + 1
			}
		}, id);
		persist(save);
		set({ save });
		return true;
	},
	claim: (id) => {
		if (!get().booted) return false;
		const now = /* @__PURE__ */ new Date();
		let save = withClock(get().save, now.getTime());
		if (id === "daily") {
			if (save.lastClaim === todayKey(now)) return false;
			const reward = dailyReward(save, now);
			save = {
				...save,
				streak: nextStreak(save, now),
				lastClaim: todayKey(now),
				balance: save.balance + reward,
				totalEarned: save.totalEarned + reward
			};
			persist(save);
			set({ save });
			return true;
		}
		const view = tasksOf(save, now).find((task) => task.id === id);
		if (!view?.ready) return false;
		save = {
			...save,
			claimed: {
				...save.claimed,
				[id]: true
			},
			balance: save.balance + view.reward,
			totalEarned: save.totalEarned + view.reward
		};
		persist(save);
		set({ save });
		return true;
	},
	markShared: () => {
		if (!get().booted) return;
		const save = {
			...withClock(get().save),
			sharedToday: true
		};
		persist(save);
		set({ save });
	},
	buyShop: (id) => {
		if (!get().booted) return false;
		const item = SHOP.find((entry) => entry.id === id);
		if (!item) return false;
		let save = withClock(get().save);
		if (id === "lease" && save.premiumDepth) return false;
		if (id === "refill") save = {
			...save,
			energy: save.maxEnergy
		};
		if (id === "surge") {
			const start = Math.max(Date.now(), save.boostUntil);
			save = {
				...save,
				boostUntil: start + 36e5
			};
		}
		if (id === "lease") save = {
			...save,
			premiumDepth: true
		};
		save = {
			...save,
			purchases: [{
				id: `${id}-${Date.now()}`,
				title: item.title,
				stars: item.stars,
				at: Date.now()
			}, ...save.purchases].slice(0, 20)
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
	}
}));
var UPGRADE_IDS = [
	"tap",
	"tank",
	"regen",
	"depth"
];
function List({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "overflow-hidden rounded-xl border border-line bg-panel",
		children
	});
}
function Row({ index, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: cn("flex items-center gap-3 p-4", index > 0 && "border-t border-line"),
		children
	});
}
function Mine() {
	const save = useGame((s) => s.save);
	const tap = useGame((s) => s.tap);
	const [pops, setPops] = (0, import_react.useState)([]);
	const [combo, setCombo] = (0, import_react.useState)(0);
	const seq = (0, import_react.useRef)(0);
	const last = (0, import_react.useRef)(0);
	const boost = Date.now() < save.boostUntil;
	const energy = Math.floor(save.energy);
	const pct = Math.max(0, Math.min(100, save.energy / save.maxEnergy * 100));
	function onTap() {
		const gain = tap();
		if (!gain) return;
		haptic("light");
		const now = Date.now();
		const nextCombo = now - last.current < 450 ? combo + 1 : 1;
		last.current = now;
		setCombo(nextCombo);
		const id = ++seq.current;
		setPops((items) => [...items.slice(-7), {
			id,
			n: gain,
			x: 38 + Math.random() * 24,
			y: 18 + Math.random() * 18
		}]);
		window.setTimeout(() => {
			setPops((items) => items.filter((item) => item.id !== id));
		}, 700);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Добыть VHL",
					disabled: save.energy < 1,
					onClick: onTap,
					className: cn("relative size-64 overflow-hidden rounded-full border bg-panel transition-transform duration-150 ease-out active:scale-95 disabled:opacity-40", boost ? "border-tide" : "border-line"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: whale_default,
						alt: "",
						className: "size-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0",
					children: pops.map((pop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rise numeric absolute font-display text-xl text-tide",
						style: {
							left: `${pop.x}%`,
							top: `${pop.y}%`
						},
						children: ["+", pop.n]
					}, pop.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-mist",
				children: save.energy < 1 ? "Энергия копится" : combo > 2 ? `Серия ${combo}` : "Нажмите кита"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mist",
						children: "Энергия"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "numeric text-foam",
						children: [
							energy,
							" / ",
							save.maxEnergy
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-panel",
					role: "progressbar",
					"aria-valuemin": 0,
					"aria-valuemax": save.maxEnergy,
					"aria-valuenow": energy,
					"aria-label": "Энергия",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-tide",
						style: { width: `${pct}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid w-full grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Касание",
						value: `+${tapValue(save)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "В час",
						value: formatNum(incomePerHour(save))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Серия",
						value: save.streak > 0 ? String(save.streak) : "—"
					})
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-panel px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-mist",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "numeric mt-1 text-sm font-medium text-foam",
			children: value
		})]
	});
}
function Tasks({ onShare }) {
	const save = useGame((s) => s.save);
	const claim = useGame((s) => s.claim);
	const tasks = tasksOf(save);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-medium text-mist",
			children: "Сбрасываются в полночь"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: tasks.map((task, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			index,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-foam",
					children: task.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 truncate text-sm text-mist",
					children: task.detail
				})]
			}), task.id === "share" && !task.claimed && !save.sharedToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				className: "shrink-0",
				onClick: () => {
					onShare();
					haptic("light");
				},
				children: "Отправить"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "shrink-0",
				disabled: !task.ready,
				onClick: () => {
					if (claim(task.id)) haptic("medium");
				},
				children: task.claimed ? "Готово" : `+${task.reward}`
			})]
		}, task.id)) })]
	});
}
var TIERS = [
	{
		title: "Первый вход друга",
		detail: "250 VHL вам, когда бот видит переход"
	},
	{
		title: "5 друзей",
		detail: "+5% к глубине"
	},
	{
		title: "20 друзей",
		detail: "Отметка стаи в профиле"
	}
];
function Friends() {
	const code = useGame((s) => s.save.refCode);
	const markShared = useGame((s) => s.markShared);
	const link = referralLink(code);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(false), 1600);
		return () => window.clearTimeout(id);
	}, [copied]);
	async function copy() {
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			markShared();
			haptic("light");
		} catch {
			setCopied(false);
		}
	}
	function share() {
		markShared();
		haptic("light");
		openShare(link, `Vhale — добыча в ${BOT_HANDLE}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-line bg-panel p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium text-foam",
					children: "Ваша ссылка"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-normal text-mist",
					children: "Бонусы друзей включатся, когда бот начнёт считать входы. Ссылку уже можно ставить в закреп."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					readOnly: true,
					value: link,
					"aria-label": "Реферальная ссылка",
					onFocus: (event) => event.currentTarget.select(),
					className: "mt-4 h-11 w-full select-text rounded-md border border-line bg-ink px-3 text-sm text-foam outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => void copy(),
						children: copied ? "Скопировано" : "Скопировать"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: share,
						children: "Отправить"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: TIERS.map((tier, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			index,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-foam",
					children: tier.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-mist",
					children: tier.detail
				})]
			})
		}, tier.title)) })]
	});
}
function Boost() {
	const save = useGame((s) => s.save);
	const buyUpgrade = useGame((s) => s.buyUpgrade);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "grid grid-cols-2 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Касание",
					value: `+${tapValue(save)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Запас",
					value: String(save.maxEnergy)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Течение",
					value: `${save.regen}/с`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Глубина",
					value: `${formatNum(incomePerHour(save))}/ч`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: UPGRADE_IDS.map((id, index) => {
			const spec = UPGRADES[id];
			const level = save.levels[id];
			const maxed = level >= spec.max;
			const cost = upgradeCost(id, level);
			const afford = save.balance >= cost;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				index,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-foam",
						children: [spec.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "numeric ml-2 text-sm font-normal text-mist",
							children: ["ур. ", level]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-mist",
						children: [spec.detail, maxed ? "" : ` · ${formatNum(cost)} VHL`]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "shrink-0",
					disabled: maxed || !afford,
					onClick: () => {
						if (buyUpgrade(id)) haptic("medium");
					},
					children: maxed ? "Максимум" : "Купить"
				})]
			}, id);
		}) })]
	});
}
function Wallet$1({ onHelp }) {
	const save = useGame((s) => s.save);
	const buyShop = useGame((s) => s.buyShop);
	const [pending, setPending] = (0, import_react.useState)(null);
	const item = SHOP.find((entry) => entry.id === pending) ?? null;
	const left = save.boostUntil - Date.now();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium text-mist",
				children: "Магазин"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-normal text-mist",
				children: "В Telegram откроется счёт в звёздах. В превью это демо: звёзды не списываются."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: SHOP.map((entry, index) => {
				const owned = entry.id === "lease" && save.premiumDepth;
				const active = entry.id === "surge" && left > 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					index,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foam",
							children: entry.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-mist",
							children: owned ? "Уже ваше" : active ? `Ещё ${formatLeft(left)}` : entry.detail
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						className: "shrink-0",
						disabled: owned,
						onClick: () => setPending(entry.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							className: "size-4",
							"aria-hidden": "true"
						}), entry.stars]
					})]
				}, entry.id);
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-medium text-mist",
				children: "Покупки"
			}), save.purchases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "Покупок пока нет."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: save.purchases.map((purchase, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				index,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium text-foam",
						children: purchase.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-mist",
						children: formatWhen(purchase.at)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "numeric inline-flex items-center gap-1 text-sm text-tide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
						className: "size-4",
						"aria-hidden": "true"
					}), purchase.stars]
				})]
			}, purchase.id)) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				className: "w-full",
				onClick: onHelp,
				children: "Как подключить бота"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: item !== null,
				onOpenChange: (open) => {
					if (!open) setPending(null);
				},
				title: item?.title ?? "Покупка",
				description: item ? `В Telegram здесь счёт на ${item.stars} звёзд. Демо применяет эффект и ничего не списывает.` : void 0,
				children: item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setPending(null),
						children: "Отмена"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							if (buyShop(item.id)) haptic("medium");
							setPending(null);
						},
						children: "Применить демо"
					})]
				}) : null
			})
		]
	});
}
var TABS = [
	{
		id: "mine",
		label: "Добыча",
		icon: Waves
	},
	{
		id: "tasks",
		label: "Задания",
		icon: ListChecks
	},
	{
		id: "friends",
		label: "Друзья",
		icon: Users
	},
	{
		id: "boost",
		label: "Буст",
		icon: Zap
	},
	{
		id: "wallet",
		label: "Касса",
		icon: Wallet
	}
];
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid size-9 shrink-0 place-items-center rounded-full bg-tide font-display text-lg text-tide-ink", className),
		children: "V"
	});
}
function VhaleApp() {
	const boot = useGame((s) => s.boot);
	(0, import_react.useEffect)(() => {
		boot();
	}, [boot]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-dvh w-full max-w-6xl justify-center bg-ink text-foam",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerAside, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {})]
	});
}
function OwnerAside() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "hidden h-dvh min-w-0 flex-1 flex-col overflow-y-auto border-line px-8 py-8 lg:flex lg:border-r",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: ["Telegram · ", BOT_HANDLE]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-12 text-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl leading-none tracking-tight",
						children: "Vhale"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-normal text-mist",
					children: "Мини-приложение для бота. Игроки копят VHL, а ускорения покупают звёздами Telegram — это выручка, не обещание выплаты."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-8 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsidePoint, {
							icon: Droplets,
							title: "Добыча",
							body: "Касание тратит энергию. Глубина капает сама, даже когда игра закрыта."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsidePoint, {
							icon: ListChecks,
							title: "Удержание",
							body: "Серия до 7 дней, задания и ссылка, которой зовут друзей."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsidePoint, {
							icon: Star,
							title: "Касса",
							body: "Три позиции: 5, 15 и 49 звёзд. В превью оплата учебная."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 border-t border-line pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium text-foam",
						children: "Как включить"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 space-y-2 text-sm leading-normal text-mist",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. Опубликуйте Vhale и скопируйте адрес." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. BotFather → Mini Apps: адрес и короткое имя app." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Menu Button: та же ссылка, подпись «Vhale»." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. Счёт звёзд создаёт бот, валюта XTR." })
						]
					})]
				})
			]
		})
	});
}
function AsidePoint({ icon: Icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-11 shrink-0 place-items-center rounded-md border border-line bg-panel text-tide",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-5",
				"aria-hidden": "true"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-foam",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-normal text-mist",
			children: body
		})] })]
	});
}
function Phone() {
	const introSeen = useGame((s) => s.save.introSeen);
	const booted = useGame((s) => s.booted);
	const [help, setHelp] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-dvh w-full max-w-md shrink-0 select-none flex-col border-line lg:border-l",
		children: [introSeen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { onHelp: () => setHelp(true) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {
			ready: booted,
			onHelp: () => setHelp(true)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectSheet, {
			open: help,
			onOpenChange: setHelp
		})]
	});
}
function Intro({ ready, onHelp }) {
	const seeIntro = useGame((s) => s.seeIntro);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-4",
		style: {
			paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
			paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-foam",
					children: "Vhale"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: BOT_HANDLE
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: whale_default,
						alt: "Кит Vhale",
						className: "size-28 rounded-full border border-line object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-2xl font-semibold tracking-tight text-foam",
						children: "Добыча открыта"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-normal text-mist",
						children: "Касайтесь кита, пока есть энергия. Серия и задания приносят ещё. Ускорение лежит в кассе."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-3 text-sm text-foam",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
									className: "size-5 text-tide",
									"aria-hidden": "true"
								}), "Энергия тратится на касание"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {
									className: "size-5 text-tide",
									"aria-hidden": "true"
								}), "Смена закрывается каждый день"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									className: "size-5 text-tide",
									"aria-hidden": "true"
								}), "Звёзды ускоряют, не заменяют игру"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				disabled: !ready,
				onClick: seeIntro,
				children: "К добыче"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onHelp,
				className: "mt-2 h-11 text-sm text-mist",
				children: "Как подключить к боту"
			})
		]
	});
}
function Shell({ onHelp }) {
	const tick = useGame((s) => s.tick);
	const [tab, setTab] = (0, import_react.useState)("mine");
	const code = useGame((s) => s.save.refCode);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, [tick]);
	function share() {
		useGame.getState().markShared();
		openShare(referralLink(code), `Vhale — добыча в ${BOT_HANDLE}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { onHelp }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "min-h-0 flex-1 overflow-y-auto px-4",
			children: [
				tab === "mine" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mine, {}) : null,
				tab === "tasks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tasks, { onShare: share }) : null,
				tab === "friends" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Friends, {}) : null,
				tab === "boost" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boost, {}) : null,
				tab === "wallet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet$1, { onHelp }) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Разделы",
			className: "grid shrink-0 grid-cols-5 border-t border-line bg-ink",
			style: { paddingBottom: "env(safe-area-inset-bottom)" },
			children: TABS.map((item) => {
				const active = tab === item.id;
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-current": active ? "page" : void 0,
					onClick: () => {
						setTab(item.id);
						haptic("light");
					},
					className: cn("flex h-16 flex-col items-center justify-center gap-1 text-xs", active ? "text-tide" : "text-mist"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: 1.75,
						"aria-hidden": "true"
					}), item.label]
				}, item.id);
			})
		})
	] });
}
function Header({ onHelp }) {
	const save = useGame((s) => s.save);
	const name = useGame((s) => s.profileName);
	const rank = rankOf(save.totalEarned);
	const left = save.boostUntil - Date.now();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "shrink-0 border-b border-line px-4 pb-3",
		style: { paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium text-foam",
							children: "Vhale"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-mist",
							children: name === "Гость" ? BOT_HANDLE : name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onHelp,
						"aria-label": "Как подключить",
						className: "grid size-11 place-items-center rounded-md text-mist hover:bg-panel hover:text-foam",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "numeric font-display text-3xl leading-none tracking-tight text-foam",
						children: formatNum(save.balance)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-mist",
						children: [
							"VHL · ",
							rank.name,
							rank.next ? ` · ${formatNum(rank.left)} до «${rank.next}»` : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "numeric text-sm text-foam",
						children: [formatNum(incomePerHour(save)), " / ч"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "numeric mt-1 text-xs text-tide",
						children: left > 0 ? `×2 ${formatLeft(left)}` : `+${tapValue(save)}`
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-1 overflow-hidden rounded-full bg-panel",
				role: "progressbar",
				"aria-label": "Ранг",
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": Math.round(rank.pct * 100),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-tide",
					style: { width: `${rank.pct * 100}%` }
				})
			})
		]
	});
}
var SplitComponent = VhaleApp;
//#endregion
export { SplitComponent as component };
