import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[opacity,background-color,transform] duration-150 ease-out disabled:opacity-40 active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-tide text-tide-ink hover:opacity-90",
        secondary: "border border-line bg-ink text-foam hover:bg-panel-2",
        ghost: "text-mist hover:text-foam",
      },
      size: {
        md: "h-11 px-4 text-sm",
        sm: "h-10 px-3 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: Props) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
