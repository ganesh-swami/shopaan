"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MyLoader from "@/components/ui/loader";

export default function AuthChecker({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  if (session?.status !== "authenticated" && session?.status !== "loading") {
    redirect("/");
  }
 
  return (
    <>
      {session && session?.status === "authenticated" ? (
        <>{children}</>
      ) : (
        <MyLoader />
      )}
    </>
  );
}
