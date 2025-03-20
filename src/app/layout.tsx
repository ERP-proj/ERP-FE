"use client";

import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import Alert from "./components/ui/Alert";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/") {
      router.push("/");
    } else {
    }
  }, [isAuthenticated, pathname, router]);

  useEffect(() => {
    document.body.style.backgroundColor = pathname.startsWith("/admin")
      ? "white"
      : "hsl(96, 43%, 73%)";
  }, [pathname]);

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: pathname.startsWith("/admin")
            ? "white"
            : "hsl(96, 43%, 73%)",
        }}
        className="antialiased overflow-hidden h-screen m-0 flex items-center justify-center w-full"
      >
        <main className="flex-1 w-full max-w-[1820px] h-fit">
          <Providers>{children}</Providers>
          <Alert />
        </main>
      </body>
    </html>
  );
}
