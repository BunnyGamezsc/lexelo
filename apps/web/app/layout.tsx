import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { ModeToggle } from "#/frontend/ModeToggle";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased `}>
        <Providers>
          <div className="absolute w-full p-4">
            <div className="float-right">
              <ModeToggle></ModeToggle>
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
