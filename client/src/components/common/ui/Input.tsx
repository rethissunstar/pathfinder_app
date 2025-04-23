// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";

// export const Input = React.forwardRef<
//   HTMLInputElement,
//   React.InputHTMLAttributes<HTMLInputElement>
// >(({ className, type = "text", ...props }, ref) => {
//   return (
//     <input
//       type={type}
//       ref={ref}
//       className={cn(
//         "border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       {...props}
//     />
//   );
// });

// Input.displayName = "Input";


"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={ className
      }
      {...props}
    />
  );
});

Input.displayName = "Input";