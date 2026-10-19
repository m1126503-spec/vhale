import { Sheet } from "@/components/ui/sheet";
import { BOT_HANDLE } from "@/lib/brand";

const STEPS = [
  {
    n: "1",
    title: "Адрес",
    body: "Опубликуйте Vhale и скопируйте адрес страницы. Локальный предпросмотр в бота не вставится.",
  },
  {
    n: "2",
    title: "Mini App",
    body: `BotFather → ${BOT_HANDLE} → Mini Apps. Вставьте адрес и задайте короткое имя, например app.`,
  },
  {
    n: "3",
    title: "Кнопка меню",
    body: "Bot Settings → Menu Button. Та же ссылка, подпись «Vhale». Кнопка появится в чате с ботом.",
  },
  {
    n: "4",
    title: "Звёзды",
    body: "Боевой платёж создаёт бот: createInvoiceLink, валюта XTR. Кнопка «Применить демо» в превью ничего не списывает.",
  },
];

export function ConnectSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Подключение к боту"
      description="Четыре шага, чтобы Vhale открывался из Telegram и принимал звёзды."
    >
      <ol className="space-y-4 pb-2">
        {STEPS.map((step) => (
          <li key={step.n} className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-panel-2 text-sm text-tide">
              {step.n}
            </span>
            <div className="min-w-0">
              <p className="font-medium text-foam">{step.title}</p>
              <p className="mt-1 text-sm leading-normal text-mist">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}
