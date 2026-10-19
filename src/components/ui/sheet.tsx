import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-40 bg-ink/80" />
        <Dialog.Content
          className="sheet-content fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-md flex-col rounded-t-xl border border-line bg-panel outline-none"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
        >
          <div className="flex items-start justify-between gap-4 px-4 pt-4">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-semibold tracking-tight text-foam">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-sm leading-normal text-mist">
                  {description}
                </Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">{title}</Dialog.Description>
              )}
            </div>
            <Dialog.Close
              className="grid size-11 shrink-0 place-items-center rounded-md text-mist hover:bg-panel-2 hover:text-foam"
              aria-label="Закрыть"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="min-h-0 overflow-y-auto px-4 pt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
