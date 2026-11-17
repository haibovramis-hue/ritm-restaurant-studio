import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-normal rounded-full text-center font-sans text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[oklch(0.55_0.17_40)] active:bg-[oklch(0.5_0.16_40)]",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        outline: "border border-current/40 bg-transparent text-current hover:border-current",
        secondary: "bg-secondary text-secondary-foreground hover:bg-coal",
        ghost: "bg-transparent text-current hover:text-ember",
        link: "min-h-11 px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-[52px] px-7 py-3",
        sm: "min-h-11 px-5 py-2 text-sm",
        lg: "min-h-[56px] px-7 py-4",
        icon: "h-11 min-h-11 w-11 rounded-full p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean; }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
