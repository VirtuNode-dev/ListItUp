import { createAuth } from "@/lib/auth-core";
import { prisma } from "@/lib/prisma";
import { mailer } from "@/lib/mailer";

export const auth = createAuth(prisma, mailer);
