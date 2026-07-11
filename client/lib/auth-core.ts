import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";

import type { PrismaClient } from "@/generated/prisma/client";
import {
  MIN_PASSWORD_LENGTH,
  SESSION_UPDATE_AGE_SECONDS,
  THIRTY_DAYS_IN_SECONDS,
} from "@/lib/auth-config";

export function createAuth(database: PrismaClient) {
  return betterAuth({
    appName: "ListItUp",
    database: prismaAdapter(database, { provider: "postgresql" }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: MIN_PASSWORD_LENGTH,
    },
    session: {
      expiresIn: THIRTY_DAYS_IN_SECONDS,
      updateAge: SESSION_UPDATE_AGE_SECONDS,
    },
  });
}
