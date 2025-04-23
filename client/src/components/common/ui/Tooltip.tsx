
"use client";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  text: string;
  className?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={className}
          aria-label="Info"
        >
          <Info className="w-5 h-5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="bg-black text-white px-3 py-1 rounded text-sm max-w-xs z-50"
      >
        {text}
      </PopoverContent>
    </Popover>
  );
};

export default InfoTooltip;
