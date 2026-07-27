"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface AuthPasswordFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id" | "type"
> {
  id: string;
  label: string;
  error?: string;
}

export function AuthPasswordField({
  id,
  label,
  error,
  ...inputProps
}: AuthPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#e6e6e6]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...inputProps}
          className="h-14 w-full rounded-lg border border-[#31363a] bg-[#0e1113] py-3 pl-4 pr-12 text-base text-[#e6e6e6] outline-none transition duration-200 placeholder:text-[#a5aaaf]/70 hover:border-white/25 focus:border-[#c4581a] focus:ring-2 focus:ring-[#c4581a]/35 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#e17a6a]"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 grid min-w-14 place-items-center text-[#a5aaaf] transition hover:text-[#e6e6e6] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#c4581a]"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          onClick={() => setShowPassword((value) => !value)}
        >
          {showPassword ? (
            <EyeClosed
              className="h-5 w-5"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          )}
        </button>
      </div>
      <p
        id={errorId}
        role="alert"
        className={error ? "text-sm text-[#e17a6a]" : "hidden"}
      >
        {error}
      </p>
    </div>
  );
}
