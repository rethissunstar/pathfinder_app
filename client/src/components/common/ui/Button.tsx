
// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";

// export type ButtonProps = {
//   children: React.ReactNode;
//   variant?: "default" | "secondary" | "danger" | "ghost";
//   iconSize?: "default" | "wide";
//   className?: string;
//   confirm?: boolean;
//   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
// } & React.ButtonHTMLAttributes<HTMLButtonElement>;

// export const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = "default",
//   iconSize = "default",
//   className,
//   confirm = false,
//   onClick,
//   ...props
// }) => {
//   const variants = {
//     default: "bg-orange-800 text-white hover:bg-orange-900",
//     secondary: "bg-gray-600 text-white hover:bg-gray-700",
//     danger: "bg-red-600 text-white hover:bg-red-700",
//     ghost: "bg-transparent hover:bg-gray-200 text-gray-800",
//   };

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (confirm && !window.confirm("Are you sure you want to delete this?")) return;
//     onClick?.(e);
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className={cn(
//         "px-4 py-2 rounded-lg font-medium transition duration-200",
//         iconSize === "wide" && "w-full",
//         variants[variant],
//         className 
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "danger" | "ghost";
  iconSize?: "default" | "wide";
  className?: string;
  confirm?: boolean;
  asChild?: boolean; // ✅ NEW
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      iconSize = "default",
      className,
      confirm = false,
      asChild = false, // ✅ NEW
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"; // ✅ Supports wrapping other elements

    const variants = {
      default: "bg-orange-800 text-white hover:bg-orange-900",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "bg-transparent hover:bg-gray-200 text-gray-800",
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (confirm && !window.confirm("Are you sure you want to delete this?")) return;
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        onClick={handleClick}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition duration-200",
          iconSize === "wide" && "w-full",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
