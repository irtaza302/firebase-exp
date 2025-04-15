import React from "react";
import { twMerge } from "tailwind-merge";

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export function Alert({
  title,
  children,
  variant = "info",
  className,
  icon,
  onClose,
}: AlertProps) {
  // Variant-specific styles and icons
  const variants = {
    info: {
      container: "bg-blue-50 text-blue-800 border-blue-100",
      icon: (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    success: {
      container: "bg-green-50 text-green-800 border-green-100",
      icon: (
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    warning: {
      container: "bg-yellow-50 text-yellow-800 border-yellow-100",
      icon: (
        <svg
          className="w-5 h-5 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    error: {
      container: "bg-red-50 text-red-800 border-red-100",
      icon: (
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  return (
    <div
      className={twMerge(
        "flex rounded-lg p-4 border",
        variants[variant].container,
        className || "",
      )}
      role="alert"
    >
      {/* Icon */}
      {icon ||
        (variants[variant].icon && (
          <div className="flex-shrink-0 mr-3">
            {icon || variants[variant].icon}
          </div>
        ))}

      {/* Content */}
      <div className="flex-1">
        {title && <h3 className="font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-3 -mt-1 -mr-1 p-1 rounded-full hover:bg-opacity-10 hover:bg-black focus:outline-none"
          aria-label="Close alert"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
