import { Geist, Geist_Mono, Poppins } from "next/font/google";

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

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased `}>
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
