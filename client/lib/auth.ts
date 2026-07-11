import { createAuth } from "@/lib/auth-core";
import { prisma } from "@/lib/prisma";

export const auth = createAuth(prisma);
