/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { cn } from "@/lib/utils"; // optional helper, remove if not using
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type RangeType = "hour" | "day" | "month" | "overall";

interface Props {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const RANGE_CONFIG: Record<Exclude<RangeType, "overall">, number> = {
  hour: 24,
  day: 31,
  month: 12,
};

export const TimeRangeSelector: React.FC<Props> = ({ setValue, watch }) => {
  const type: RangeType = watch("rangeType") || "hour";
  const value = watch("rangeValue");

  const showPicker = type !== "overall";

  return (
    <div className="flex flex-col gap-4 font-poppins">
      {/* Layer 1: Type selector */}
      <div className="flex gap-2">
        {(["hour", "day", "month", "overall"] as RangeType[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setValue("rangeType", item);
              setValue("rangeValue", undefined);
            }}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-medium capitalize transition",
              type === item
                ? "bg-primary text-white"
                : "border-gray-300 text-[#878787] hover:bg-gray-100",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Layer 2: Label */}
      {showPicker && (
        <p className="text-xs font-medium text-[#878787]">Select {type}</p>
      )}

      {/* Layer 3: Number picker */}
      {showPicker && (
        <div
          className="flex gap-0 border border-[#EDEDED] rounded-lg overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide"
        >
          {Array.from({ length: RANGE_CONFIG[type] }, (_, i) => i + 1).map(
            (num) => (
              <button
                key={num}
                type="button"
                onClick={() => setValue("rangeValue", num)}
                className={cn(
                  "min-w-10 h-10 shrink-0 flex items-center justify-center text-sm",
                  value === num ? "bg-primary text-white" : "hover:bg-gray-100",
                )}
              >
                {num}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};
