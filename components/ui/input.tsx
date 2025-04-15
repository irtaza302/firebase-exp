import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  iconPosition?: "left" | "right";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      icon,
      wrapperClassName,
      labelClassName,
      iconPosition = "left",
      type = "text",
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId =
      id ||
      props.name ||
      `input-${Math.random().toString(36).substring(2, 11)}`;

    return (
      <div className={twMerge("space-y-2", wrapperClassName || "")}>
        {label && (
          <label
            htmlFor={inputId}
            className={twMerge(
              "block text-sm font-medium text-gray-700",
              labelClassName || "",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={twMerge(
              "w-full rounded-lg border px-4 py-2 text-sm text-gray-900 transition-colors",
              "focus:outline-none focus:ring-2 focus:border-blue-600 focus:ring-blue-600",
              icon && iconPosition === "left" ? "pl-10" : "",
              icon && iconPosition === "right" ? "pr-10" : "",
              error
                ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 placeholder-gray-400",
              disabled ? "cursor-not-allowed opacity-75 bg-gray-100" : "",
              className || "",
            )}
            disabled={disabled}
            ref={ref}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={twMerge(
              "text-xs",
              error ? "text-red-600" : "text-gray-500",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
