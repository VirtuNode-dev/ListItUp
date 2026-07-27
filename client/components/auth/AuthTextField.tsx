import type { InputHTMLAttributes } from "react";

interface AuthTextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id"
> {
  id: string;
  label: string;
  error?: string;
}

export function AuthTextField({
  id,
  label,
  error,
  ...inputProps
}: AuthTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#e6e6e6]">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...inputProps}
        className="h-14 w-full rounded-lg border border-[#31363a] bg-[#0e1113] px-4 text-base text-[#e6e6e6] outline-none transition duration-200 placeholder:text-[#a5aaaf]/70 hover:border-white/25 focus:border-[#c4581a] focus:ring-2 focus:ring-[#c4581a]/35 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#e17a6a]"
      />
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
