"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {session.user?.name || session.user?.email}
        </span>
        <Button onClick={() => signOut()} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/" })} size="sm">
      Login
    </Button>
  );
}
