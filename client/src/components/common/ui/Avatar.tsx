import * as React from "react";
import {
  Avatar as ShadAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type Props = {
  src?: string;
  alt?: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Avatar: React.FC<Props> = ({
  src,
  alt = "User Avatar",
  fallbackText = "U",
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const fallbackSrc = "https://www.gravatar.com/avatar/?d=mp";

  return (
    <ShadAvatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={src || fallbackSrc} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </ShadAvatar>
  );
};
