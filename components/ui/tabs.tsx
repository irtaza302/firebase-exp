"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  tabsClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  contentClassName?: string;
  variant?: "underline" | "contained" | "pills";
}

export function Tabs({
  tabs,
  defaultValue,
  onChange,
  className,
  tabsClassName,
  activeTabClassName,
  inactiveTabClassName,
  contentClassName,
  variant = "underline",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  // Base styles
  const baseTabsClass = "flex space-x-2";
  const baseTabClass =
    "px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none";

  // Variant-specific styles
  const variantStyles = {
    underline: {
      tabs: "border-b border-gray-200",
      active: "text-blue-600 border-b-2 border-blue-600 -mb-px",
      inactive: "text-gray-500 hover:text-gray-700",
    },
    contained: {
      tabs: "bg-gray-100 p-1 rounded-lg",
      active: "bg-white text-gray-900 shadow-sm rounded-md",
      inactive: "text-gray-600 hover:text-gray-900",
    },
    pills: {
      tabs: "",
      active: "bg-blue-600 text-white rounded-full",
      inactive:
        "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full",
    },
  };

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <div className={className ? twMerge("w-full", className) : "w-full"}>
      {/* Tabs */}
      <div
        className={twMerge(
          baseTabsClass,
          variantStyles[variant].tabs,
          tabsClassName || "",
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={twMerge(
              baseTabClass,
              tab.value === activeTab
                ? twMerge(
                    variantStyles[variant].active,
                    activeTabClassName || "",
                  )
                : twMerge(
                    variantStyles[variant].inactive,
                    inactiveTabClassName || "",
                  ),
              tab.disabled ? "opacity-50 cursor-not-allowed" : "",
            )}
            onClick={() => !tab.disabled && handleTabClick(tab.value)}
            disabled={tab.disabled}
            aria-selected={tab.value === activeTab}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={twMerge("mt-4", contentClassName || "")}>
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}
