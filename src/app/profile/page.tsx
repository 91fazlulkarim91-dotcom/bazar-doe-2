
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const [result, setResult] = useState("Session পরীক্ষা চলছে...");

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await authClient.getSession();

        console.log("Session response:", response);

        if (response.error) {
          setResult(
            `Session error: ${response.error.message}`
          );
        } else if (response.data?.user) {
          setResult(
            `Logged in as: ${response.data.user.email}`
          );
        } else {
          setResult("No active session. User is not logged in.");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setResult("Failed to check session. See browser console.");
      }
    }

    checkSession();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Session Debug</h1>
      <p className="mt-4 break-words">{result}</p>
    </main>
  );
}
