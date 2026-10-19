import { useEffect, useState } from "react";
import { CircleHelp, Droplets, ListChecks, Star, Users, Wallet, Waves, Zap } from "lucide-react";
import whaleUrl from "@/assets/whale.jpg";
import { Button } from "@/components/ui/button";
import { ConnectSheet } from "@/components/vhale/connect-sheet";
import { Boost, Friends, Mine, Tasks, Wallet as WalletPanel } from "@/components/vhale/panels";
import { BOT_HANDLE, referralLink } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { formatLeft, formatNum, incomePerHour, rankOf, tapValue } from "@/lib/economy";
import { useGame } from "@/lib/store";
import { haptic, openShare } from "@/lib/telegram";

type Tab = "mine" | "tasks" | "friends" | "boost" | "wallet";

const TABS: { id: Tab; label: string; icon: typeof Waves }[] = [
  { id: "mine", label: "Добыча", icon: Waves },
  { id: "tasks", label: "Задания", icon: ListChecks },
  { id: "friends", label: "Друзья", icon: Users },
  { id: "boost", label: "Буст", icon: Zap },
  { id: "wallet", label: "Касса", icon: Wallet },
];

function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-tide font-display text-lg text-tide-ink",
        className,
      )}
    >
      V
    </span>
  );
}

export function VhaleApp() {
  const boot = useGame((s) => s.boot);
  useEffect(() => {
    boot();
  }, [boot]);

  return (
    <div className="mx-auto flex h-dvh w-full max-w-6xl justify-center bg-ink text-foam">
      <OwnerAside />
      <Phone />
    </div>
  );
}

function OwnerAside() {
  return (
    <aside className="hidden h-dvh min-w-0 flex-1 flex-col overflow-y-auto border-line px-8 py-8 lg:flex lg:border-r">
      <div className="max-w-md">
        <p className="text-sm text-mist">Telegram · {BOT_HANDLE}</p>
        <div className="mt-4 flex items-center gap-3">
          <Mark className="size-12 text-2xl" />
          <h1 className="font-display text-5xl leading-none tracking-tight">Vhale</h1>
        </div>
        <p className="mt-6 text-base leading-normal text-mist">
          Мини-приложение для бота. Игроки копят VHL, а ускорения покупают звёздами Telegram — это
          выручка, не обещание выплаты.
        </p>
        <ul className="mt-8 space-y-4">
          <AsidePoint icon={Droplets} title="Добыча" body="Касание тратит энергию. Глубина капает сама, даже когда игра закрыта." />
          <AsidePoint icon={ListChecks} title="Удержание" body="Серия до 7 дней, задания и ссылка, которой зовут друзей." />
          <AsidePoint icon={Star} title="Касса" body="Три позиции: 5, 15 и 49 звёзд. В превью оплата учебная." />
        </ul>
        <div className="mt-8 border-t border-line pt-6">
          <h2 className="font-medium text-foam">Как включить</h2>
          <ol className="mt-3 space-y-2 text-sm leading-normal text-mist">
            <li>1. Опубликуйте Vhale и скопируйте адрес.</li>
            <li>2. BotFather → Mini Apps: адрес и короткое имя app.</li>
            <li>3. Menu Button: та же ссылка, подпись «Vhale».</li>
            <li>4. Счёт звёзд создаёт бот, валюта XTR.</li>
          </ol>
        </div>
      </div>
    </aside>
  );
}

function AsidePoint({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Droplets;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-md border border-line bg-panel text-tide">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="font-medium text-foam">{title}</p>
        <p className="mt-1 text-sm leading-normal text-mist">{body}</p>
      </div>
    </li>
  );
}

function Phone() {
  const introSeen = useGame((s) => s.save.introSeen);
  const booted = useGame((s) => s.booted);
  const [help, setHelp] = useState(false);

  return (
    <section className="flex h-dvh w-full max-w-md shrink-0 select-none flex-col border-line lg:border-l">
      {introSeen ? <Shell onHelp={() => setHelp(true)} /> : <Intro ready={booted} onHelp={() => setHelp(true)} />}
      <ConnectSheet open={help} onOpenChange={setHelp} />
    </section>
  );
}

function Intro({ ready, onHelp }: { ready: boolean; onHelp: () => void }) {
  const seeIntro = useGame((s) => s.seeIntro);
  return (
    <div
      className="flex h-full flex-col px-4"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <div className="flex items-center gap-3">
        <Mark />
        <div>
          <p className="font-medium text-foam">Vhale</p>
          <p className="text-sm text-mist">{BOT_HANDLE}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <img
          src={whaleUrl}
          alt="Кит Vhale"
          className="size-28 rounded-full border border-line object-cover"
        />
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foam">Добыча открыта</h2>
        <p className="mt-2 text-sm leading-normal text-mist">
          Касайтесь кита, пока есть энергия. Серия и задания приносят ещё. Ускорение лежит в кассе.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-foam">
          <li className="flex items-center gap-3">
            <Waves className="size-5 text-tide" aria-hidden="true" />
            Энергия тратится на касание
          </li>
          <li className="flex items-center gap-3">
            <ListChecks className="size-5 text-tide" aria-hidden="true" />
            Смена закрывается каждый день
          </li>
          <li className="flex items-center gap-3">
            <Star className="size-5 text-tide" aria-hidden="true" />
            Звёзды ускоряют, не заменяют игру
          </li>
        </ul>
      </div>
      <Button className="w-full" disabled={!ready} onClick={seeIntro}>
        К добыче
      </Button>
      <button type="button" onClick={onHelp} className="mt-2 h-11 text-sm text-mist">
        Как подключить к боту
      </button>
    </div>
  );
}

function Shell({ onHelp }: { onHelp: () => void }) {
  const tick = useGame((s) => s.tick);
  const [tab, setTab] = useState<Tab>("mine");
  const code = useGame((s) => s.save.refCode);

  useEffect(() => {
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  function share() {
    useGame.getState().markShared();
    openShare(referralLink(code), `Vhale — добыча в ${BOT_HANDLE}`);
  }

  return (
    <>
      <Header onHelp={onHelp} />
      <main className="min-h-0 flex-1 overflow-y-auto px-4">
        {tab === "mine" ? <Mine /> : null}
        {tab === "tasks" ? <Tasks onShare={share} /> : null}
        {tab === "friends" ? <Friends /> : null}
        {tab === "boost" ? <Boost /> : null}
        {tab === "wallet" ? <WalletPanel onHelp={onHelp} /> : null}
      </main>
      <nav
        aria-label="Разделы"
        className="grid shrink-0 grid-cols-5 border-t border-line bg-ink"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {TABS.map((item) => {
          const active = tab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => {
                setTab(item.id);
                haptic("light");
              }}
              className={cn(
                "flex h-16 flex-col items-center justify-center gap-1 text-xs",
                active ? "text-tide" : "text-mist",
              )}
            >
              <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}

function Header({ onHelp }: { onHelp: () => void }) {
  const save = useGame((s) => s.save);
  const name = useGame((s) => s.profileName);
  const rank = rankOf(save.totalEarned);
  const left = save.boostUntil - Date.now();

  return (
    <header
      className="shrink-0 border-b border-line px-4 pb-3"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
    >
      <div className="flex items-center gap-3">
        <Mark />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foam">Vhale</p>
          <p className="truncate text-sm text-mist">{name === "Гость" ? BOT_HANDLE : name}</p>
        </div>
        <button
          type="button"
          onClick={onHelp}
          aria-label="Как подключить"
          className="grid size-11 place-items-center rounded-md text-mist hover:bg-panel hover:text-foam"
        >
          <CircleHelp className="size-5" />
        </button>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="numeric font-display text-3xl leading-none tracking-tight text-foam">
            {formatNum(save.balance)}
          </p>
          <p className="mt-2 text-sm text-mist">
            VHL · {rank.name}
            {rank.next ? ` · ${formatNum(rank.left)} до «${rank.next}»` : ""}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="numeric text-sm text-foam">{formatNum(incomePerHour(save))} / ч</p>
          <p className="numeric mt-1 text-xs text-tide">
            {left > 0 ? `×2 ${formatLeft(left)}` : `+${tapValue(save)}`}
          </p>
        </div>
      </div>
      <div
        className="mt-3 h-1 overflow-hidden rounded-full bg-panel"
        role="progressbar"
        aria-label="Ранг"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(rank.pct * 100)}
      >
        <div className="h-full bg-tide" style={{ width: `${rank.pct * 100}%` }} />
      </div>
    </header>
  );
}
