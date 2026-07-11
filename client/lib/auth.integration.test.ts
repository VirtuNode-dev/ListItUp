import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

const THIRTY_DAYS_IN_SECONDS = 2_592_000;
const SESSION_UPDATE_AGE_SECONDS = 86_400;
const ONE_SECOND_IN_MILLISECONDS = 1_000;

function sessionCookie(response: Response): string {
  const setCookie = response.headers.get("set-cookie");

  assert.ok(setCookie, "Better Auth must set a session cookie after sign-up.");

  return setCookie.split(";", 1)[0];
}

function record(value: unknown): Record<string, unknown> {
  assert.ok(value && typeof value === "object");

  return value as Record<string, unknown>;
}

function sessionExpiry(responseBody: unknown): Date {
  const session = record(record(responseBody).session);
  const expiresAt = session.expiresAt;
  assert.equal(typeof expiresAt, "string");

  if (typeof expiresAt !== "string") {
    throw new Error(
      "Better Auth returned a session without an expiration time."
    );
  }

  return new Date(expiresAt);
}

async function run() {
  if (!process.env.DATABASE_URL) {
    console.log(
      "auth database integration test skipped: DATABASE_URL is not set"
    );
    return;
  }

  const [{ PrismaPg }, { PrismaClient }, { createAuth }] = await Promise.all([
    import("@prisma/adapter-pg"),
    import("@/generated/prisma/client"),
    import("./auth-core"),
  ]);
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  const userId = randomUUID();
  const email = `auth-test-${userId}@example.test`;
  const auth = createAuth(prisma);

  try {
    const signUpResponse = await auth.handler(
      new Request("http://localhost:3000/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          name: "Auth integration test",
          email,
          password: "a-long-test-password",
        }),
      })
    );

    assert.equal(signUpResponse.status, 200);

    const cookie = sessionCookie(signUpResponse);
    const initialSessionResponse = await auth.handler(
      new Request("http://localhost:3000/api/auth/get-session", {
        headers: { cookie },
      })
    );
    const initialExpiry = sessionExpiry(await initialSessionResponse.json());

    await prisma.session.updateMany({
      where: { user: { email } },
      data: {
        expiresAt: new Date(
          Date.now() +
            (THIRTY_DAYS_IN_SECONDS - SESSION_UPDATE_AGE_SECONDS - 1) *
              ONE_SECOND_IN_MILLISECONDS
        ),
      },
    });

    const renewedSessionResponse = await auth.handler(
      new Request("http://localhost:3000/api/auth/get-session", {
        headers: { cookie },
      })
    );
    const renewedExpiry = sessionExpiry(await renewedSessionResponse.json());

    assert.ok(renewedExpiry > initialExpiry);
  } finally {
    await prisma.user.deleteMany({ where: { email } }).catch(() => undefined);
    await prisma.$disconnect();
  }

  console.log("auth database integration test passed");
}

void run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
