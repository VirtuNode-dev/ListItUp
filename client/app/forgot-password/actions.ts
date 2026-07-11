"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { normalizeEmail } from "@/lib/normalize-email";

export type ForgotPasswordFormState = { status: "idle" } | { status: "sent" };

export const initialForgotPasswordState: ForgotPasswordFormState = {
  status: "idle",
};

export async function requestPasswordResetAction(
  _prevState: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const email = normalizeEmail(formData.get("email"));

  if (email) {
    await auth.api
      .requestPasswordReset({
        body: { email, redirectTo: "/reset-password" },
        headers: await headers(),
      })
      .catch(() => undefined);
  }

  // Better Auth's own endpoint already returns this same generic response
  // whether or not the email exists; we mirror that here defensively so a
  // send failure can't be distinguished from "no such account" either.
  return { status: "sent" };
}
