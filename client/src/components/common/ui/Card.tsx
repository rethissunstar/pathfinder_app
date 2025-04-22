"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "mobile" | "desktop";
  title?: string;
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "desktop",
  title,
}) => {
  const variantStyles = {
    mobile: "max-w-sm w-full p-4",
    desktop: "max-w-2xl w-full p-6",
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-md", variantStyles[variant], className)}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">{title}</h2>
      )}
      {children}
    </div>
  );
};
