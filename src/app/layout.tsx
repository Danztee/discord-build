import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans, Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/components/providers/socket-provider";

const font = Noto_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Discord Build - created by Olowoniyi Daniel",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("", "bg-white dark:bg-[#313338]")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
        >
          <SocketProvider>
            <ModalProvider />
            <Toaster />
            {children}
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
