"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  id: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: "default" | "bordered" | "separated";
}

export function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = false,
  className,
  itemClassName,
  headerClassName,
  contentClassName,
  variant = "default",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (openItems.includes(itemId)) {
      setOpenItems(openItems.filter((id) => id !== itemId));
    } else {
      if (allowMultiple) {
        setOpenItems([...openItems, itemId]);
      } else {
        setOpenItems([itemId]);
      }
    }
  };

  // Variant-specific styles
  const variantStyles = {
    default: {
      item: "border-b border-gray-200",
      header: "py-4",
      content: "pb-4",
    },
    bordered: {
      item: "border border-gray-200 rounded-lg",
      header: "p-4 border-b border-gray-200",
      content: "p-4",
    },
    separated: {
      item: "mb-3 border border-gray-200 rounded-lg",
      header: "p-4",
      content: "px-4 pb-4",
    },
  };

  return (
    <div className={twMerge("w-full", className || "")}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div
            key={item.id}
            className={twMerge(
              variantStyles[variant].item,
              itemClassName || "",
            )}
          >
            <button
              className={twMerge(
                "w-full flex justify-between items-center text-left focus:outline-none transition-colors",
                "hover:bg-gray-50",
                variantStyles[variant].header,
                headerClassName || "",
              )}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-gray-900">{item.title}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div
                className={twMerge(
                  "text-gray-700",
                  variantStyles[variant].content,
                  contentClassName || "",
                )}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
