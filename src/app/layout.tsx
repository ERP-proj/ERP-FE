"use client";

import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    } else {
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <html lang="en">
      <body className="antialiased overflow-hidden h-screen m-0 flex items-center justify-center w-full">
        <main className="flex-1 w-full max-w-[1820px] h-fit">{children}</main>
      </body>
    </html>
  );
}
