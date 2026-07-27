import type { ReactNode } from "react";
import Link from "next/link";

import { AuthStatusPane } from "@/components/auth/AuthStatusPane";

interface AuthPageShellProps {
  kicker: string;
  heroTitle: string;
  heroCopy: string;
  children: ReactNode;
}

export function AuthPageShell({
  kicker,
  heroTitle,
  heroCopy,
  children,
}: AuthPageShellProps) {
  return (
    <main className="auth-page min-h-screen overflow-x-hidden bg-[#0b0d0f] text-[#a5aaaf]">
      <a
        className="absolute left-4 top-4 z-50 -translate-y-20 rounded bg-[#c4581a] px-4 py-3 text-sm font-medium text-[#0b0d0f] transition-transform focus:translate-y-0 focus:outline-none"
        href="#auth-form"
      >
        Skip to form
      </a>

      <div className="grid min-h-screen bg-[#0b0d0f] lg:grid-cols-2">
        <AuthStatusPane />

        <section className="relative flex min-h-screen items-center px-6 py-8 sm:px-10 lg:items-start lg:px-16 lg:py-12 xl:px-20">
          <div className="relative mx-auto w-full max-w-[36.75rem]">
            <Link
              href="/"
              className="group inline-flex min-h-12 items-center gap-3 text-sm uppercase tracking-[0.22em] text-[#e6e6e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4581a]"
            >
              <strong className="relative text-base font-semibold tracking-[0.22em] text-[#e6e6e6] after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-[#c4581a] after:content-['']">
                ListItUp
              </strong>
              <span className="text-white/30">/</span>
              <span className="font-mono text-xs font-semibold tracking-[0.24em] text-[#c4581a]">
                {kicker}
              </span>
              <span className="size-2 rounded-full bg-[#c4581a] transition-shadow duration-200 group-hover:shadow-[0_0_10px_#c4581a]" />
            </Link>

            <div className="mt-8">
              <h1 className="text-balance text-4xl font-light leading-[1.05] tracking-[-0.03em] text-[#e6e6e6] sm:text-5xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-[35ch] text-pretty text-base leading-7 text-[#a5aaaf]">
                {heroCopy}
              </p>
            </div>

            <div id="auth-form" className="mt-8">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
