"use client";

import { createAuthClient } from "better-auth/react";

const resolvedBaseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: resolvedBaseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
