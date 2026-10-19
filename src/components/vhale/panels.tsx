import { useEffect, useRef, useState, type ReactNode } from "react";
import { Star } from "lucide-react";
import whaleUrl from "@/assets/whale.jpg";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { BOT_HANDLE, referralLink } from "@/lib/brand";
import { cn } from "@/lib/cn";
import {
  formatLeft,
  formatNum,
  formatWhen,
  incomePerHour,
  SHOP,
  tapValue,
  tasksOf,
  UPGRADES,
  upgradeCost,
  type ShopId,
  type UpgradeId,
} from "@/lib/economy";
import { haptic, openShare } from "@/lib/telegram";
import { useGame } from "@/lib/store";

const UPGRADE_IDS: UpgradeId[] = ["tap", "tank", "regen", "depth"];

function List({ children }: { children: ReactNode }) {
  return <ul className="overflow-hidden rounded-xl border border-line bg-panel">{children}</ul>;
}

function Row({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <li className={cn("flex items-center gap-3 p-4", index > 0 && "border-t border-line")}>{children}</li>
  );
}

export function Mine() {
  const save = useGame((s) => s.save);
  const tap = useGame((s) => s.tap);
  const [pops, setPops] = useState<{ id: number; n: number; x: number; y: number }[]>([]);
  const [combo, setCombo] = useState(0);
  const seq = useRef(0);
  const last = useRef(0);
  const boost = Date.now() < save.boostUntil;
  const energy = Math.floor(save.energy);
  const pct = Math.max(0, Math.min(100, (save.energy / save.maxEnergy) * 100));

  function onTap() {
    const gain = tap();
    if (!gain) return;
    haptic("light");
    const now = Date.now();
    const nextCombo = now - last.current < 450 ? combo + 1 : 1;
    last.current = now;
    setCombo(nextCombo);
    const id = ++seq.current;
    setPops((items) => [...items.slice(-7), { id, n: gain, x: 38 + Math.random() * 24, y: 18 + Math.random() * 18 }]);
    window.setTimeout(() => {
      setPops((items) => items.filter((item) => item.id !== id));
    }, 700);
  }

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative">
        <button
          type="button"
          aria-label="Добыть VHL"
          disabled={save.energy < 1}
          onClick={onTap}
          className={cn(
            "relative size-64 overflow-hidden rounded-full border bg-panel transition-transform duration-150 ease-out active:scale-95 disabled:opacity-40",
            boost ? "border-tide" : "border-line",
          )}
        >
          <img src={whaleUrl} alt="" className="size-full object-cover" />
        </button>
        <div className="pointer-events-none absolute inset-0">
          {pops.map((pop) => (
            <span
              key={pop.id}
              className="rise numeric absolute font-display text-xl text-tide"
              style={{ left: `${pop.x}%`, top: `${pop.y}%` }}
            >
              +{pop.n}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-mist">
        {save.energy < 1 ? "Энергия копится" : combo > 2 ? `Серия ${combo}` : "Нажмите кита"}
      </p>
      <div className="mt-5 w-full">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-mist">Энергия</span>
          <span className="numeric text-foam">
            {energy} / {save.maxEnergy}
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-panel"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={save.maxEnergy}
          aria-valuenow={energy}
          aria-label="Энергия"
        >
          <div className="h-full bg-tide" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <dl className="mt-4 grid w-full grid-cols-3 gap-2">
        <Stat label="Касание" value={`+${tapValue(save)}`} />
        <Stat label="В час" value={formatNum(incomePerHour(save))} />
        <Stat label="Серия" value={save.streak > 0 ? String(save.streak) : "—"} />
      </dl>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-panel px-3 py-3">
      <dt className="text-xs text-mist">{label}</dt>
      <dd className="numeric mt-1 text-sm font-medium text-foam">{value}</dd>
    </div>
  );
}

export function Tasks({ onShare }: { onShare: () => void }) {
  const save = useGame((s) => s.save);
  const claim = useGame((s) => s.claim);
  const tasks = tasksOf(save);

  return (
    <div className="py-4">
      <h2 className="mb-3 text-sm font-medium text-mist">Сбрасываются в полночь</h2>
      <List>
        {tasks.map((task, index) => (
          <Row key={task.id} index={index}>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foam">{task.title}</p>
              <p className="mt-1 truncate text-sm text-mist">{task.detail}</p>
            </div>
            {task.id === "share" && !task.claimed && !save.sharedToday ? (
              <Button
                size="sm"
                variant="secondary"
                className="shrink-0"
                onClick={() => {
                  onShare();
                  haptic("light");
                }}
              >
                Отправить
              </Button>
            ) : (
              <Button
                size="sm"
                className="shrink-0"
                disabled={!task.ready}
                onClick={() => {
                  if (claim(task.id)) haptic("medium");
                }}
              >
                {task.claimed ? "Готово" : `+${task.reward}`}
              </Button>
            )}
          </Row>
        ))}
      </List>
    </div>
  );
}

const TIERS = [
  { title: "Первый вход друга", detail: "250 VHL вам, когда бот видит переход" },
  { title: "5 друзей", detail: "+5% к глубине" },
  { title: "20 друзей", detail: "Отметка стаи в профиле" },
];

export function Friends() {
  const code = useGame((s) => s.save.refCode);
  const markShared = useGame((s) => s.markShared);
  const link = referralLink(code);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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

  return (
    <div className="space-y-4 py-4">
      <section className="rounded-xl border border-line bg-panel p-4">
        <h2 className="font-medium text-foam">Ваша ссылка</h2>
        <p className="mt-1 text-sm leading-normal text-mist">
          Бонусы друзей включатся, когда бот начнёт считать входы. Ссылку уже можно ставить в закреп.
        </p>
        <input
          readOnly
          value={link}
          aria-label="Реферальная ссылка"
          onFocus={(event) => event.currentTarget.select()}
          className="mt-4 h-11 w-full select-text rounded-md border border-line bg-ink px-3 text-sm text-foam outline-none"
        />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => void copy()}>
            {copied ? "Скопировано" : "Скопировать"}
          </Button>
          <Button onClick={share}>Отправить</Button>
        </div>
      </section>
      <List>
        {TIERS.map((tier, index) => (
          <Row key={tier.title} index={index}>
            <div className="min-w-0">
              <p className="font-medium text-foam">{tier.title}</p>
              <p className="mt-1 text-sm text-mist">{tier.detail}</p>
            </div>
          </Row>
        ))}
      </List>
    </div>
  );
}

export function Boost() {
  const save = useGame((s) => s.save);
  const buyUpgrade = useGame((s) => s.buyUpgrade);

  return (
    <div className="space-y-4 py-4">
      <dl className="grid grid-cols-2 gap-2">
        <Stat label="Касание" value={`+${tapValue(save)}`} />
        <Stat label="Запас" value={String(save.maxEnergy)} />
        <Stat label="Течение" value={`${save.regen}/с`} />
        <Stat label="Глубина" value={`${formatNum(incomePerHour(save))}/ч`} />
      </dl>
      <List>
        {UPGRADE_IDS.map((id, index) => {
          const spec = UPGRADES[id];
          const level = save.levels[id];
          const maxed = level >= spec.max;
          const cost = upgradeCost(id, level);
          const afford = save.balance >= cost;
          return (
            <Row key={id} index={index}>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foam">
                  {spec.title}
                  <span className="numeric ml-2 text-sm font-normal text-mist">ур. {level}</span>
                </p>
                <p className="mt-1 text-sm text-mist">
                  {spec.detail}
                  {maxed ? "" : ` · ${formatNum(cost)} VHL`}
                </p>
              </div>
              <Button
                size="sm"
                className="shrink-0"
                disabled={maxed || !afford}
                onClick={() => {
                  if (buyUpgrade(id)) haptic("medium");
                }}
              >
                {maxed ? "Максимум" : "Купить"}
              </Button>
            </Row>
          );
        })}
      </List>
    </div>
  );
}

export function Wallet({ onHelp }: { onHelp: () => void }) {
  const save = useGame((s) => s.save);
  const buyShop = useGame((s) => s.buyShop);
  const [pending, setPending] = useState<ShopId | null>(null);
  const item = SHOP.find((entry) => entry.id === pending) ?? null;
  const left = save.boostUntil - Date.now();

  return (
    <div className="space-y-4 py-4">
      <div>
        <h2 className="text-sm font-medium text-mist">Магазин</h2>
        <p className="mt-1 text-sm leading-normal text-mist">
          В Telegram откроется счёт в звёздах. В превью это демо: звёзды не списываются.
        </p>
      </div>
      <List>
        {SHOP.map((entry, index) => {
          const owned = entry.id === "lease" && save.premiumDepth;
          const active = entry.id === "surge" && left > 0;
          return (
            <Row key={entry.id} index={index}>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foam">{entry.title}</p>
                <p className="mt-1 text-sm text-mist">
                  {owned ? "Уже ваше" : active ? `Ещё ${formatLeft(left)}` : entry.detail}
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="shrink-0"
                disabled={owned}
                onClick={() => setPending(entry.id)}
              >
                <Star className="size-4" aria-hidden="true" />
                {entry.stars}
              </Button>
            </Row>
          );
        })}
      </List>
      <section>
        <h2 className="mb-3 text-sm font-medium text-mist">Покупки</h2>
        {save.purchases.length === 0 ? (
          <p className="text-sm text-mist">Покупок пока нет.</p>
        ) : (
          <List>
            {save.purchases.map((purchase, index) => (
              <Row key={purchase.id} index={index}>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foam">{purchase.title}</p>
                  <p className="mt-1 text-sm text-mist">{formatWhen(purchase.at)}</p>
                </div>
                <span className="numeric inline-flex items-center gap-1 text-sm text-tide">
                  <Star className="size-4" aria-hidden="true" />
                  {purchase.stars}
                </span>
              </Row>
            ))}
          </List>
        )}
      </section>
      <Button variant="ghost" className="w-full" onClick={onHelp}>
        Как подключить бота
      </Button>
      <Sheet
        open={item !== null}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
        title={item?.title ?? "Покупка"}
        description={
          item
            ? `В Telegram здесь счёт на ${item.stars} звёзд. Демо применяет эффект и ничего не списывает.`
            : undefined
        }
      >
        {item ? (
          <div className="grid grid-cols-2 gap-2 pb-2">
            <Button variant="secondary" onClick={() => setPending(null)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                if (buyShop(item.id)) haptic("medium");
                setPending(null);
              }}
            >
              Применить демо
            </Button>
          </div>
        ) : null}
      </Sheet>
    </div>
  );
}
