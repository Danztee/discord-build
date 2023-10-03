import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "appearance-none block w-full px-3 py-2 border border-input rounded-md text-sm leading-5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-input bg-input",
        outline: "border border-input bg-background",
        error: "border-error bg-error-background",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
