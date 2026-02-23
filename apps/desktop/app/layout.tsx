"use client";

import "@workspace/ui/globals.css";

import { invoke } from "@tauri-apps/api/core";
import {
  BookA,
  Home,
  Layers,
  Menu,
  Package2,
  Search,
  Settings,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, type ReactNode, useState } from "react";

import { ModeToggle } from "#/frontend/ModeToggle";
import defaultAvatar from "#/frontend/clerk-default.png";
import { Button } from "#/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/ui/dropdown-menu";
import { Input } from "#/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "#/ui/sheet";
import { Providers } from "@/components/providers";
import {
  DesktopAuthSessionProvider,
  DesktopSignedIn,
  DesktopSignedOut,
  useDesktopAuthSession,
} from "@/lib/auth/session";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/sets", icon: Layers, label: "Sets" },
  { href: "/learn", icon: BookA, label: "Learn" },
  { href: "/community", icon: Users2, label: "Community" },
] as const;

const routeTitles: Record<string, string> = {
  "/": "Home",
  "/home": "Home",
  "/sets": "Sets",
  "/learn": "Learn",
  "/community": "Community",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <DesktopAuthSessionProvider>
            <LayoutShell>{children}</LayoutShell>
          </DesktopAuthSessionProvider>

          <div className="fixed bottom-4 right-4 z-[70]">
            <ModeToggle />
          </div>
        </Providers>
      </body>
    </html>
  );
}

const LayoutShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { bootstrapPhase, displayName, isAuthResolved, setSignedIn, userId } =
    useDesktopAuthSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) {
      return;
    }
    setIsLoggingOut(true);
    setSignedIn(false);
    try {
      await invoke("auth_sign_out");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, setSignedIn]);

  if (!isAuthResolved) {
    const loadingMessage =
      bootstrapPhase === "waiting_for_secure_storage"
        ? "Waiting for Keychain access..."
        : "Loading your workspace...";
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-background text-sm text-muted-foreground">
        {loadingMessage}
      </div>
    );
  }

  return (
    <>
      <DesktopSignedIn>
        <div className="dash flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
              <Link
                href="/home"
                className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:h-8 md:w-8"
              >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Lexelo</span>
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (pathname === "/" && item.href === "/home");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground md:h-8 md:w-8">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </nav>
          </aside>

          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="mt-6 grid gap-2 text-base font-medium">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Lexelo Desktop</p>
                <p className="text-sm font-semibold">{routeTitles[pathname] ?? "Workspace"}</p>
              </div>

              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search sets, lessons, and topics"
                  className="w-full rounded-lg bg-background pl-8 md:w-[240px] lg:w-[340px]"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <Image
                      src={defaultAvatar}
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{displayName ?? userId ?? "User"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
          </div>
        </div>
      </DesktopSignedIn>

      <DesktopSignedOut>{children}</DesktopSignedOut>
    </>
  );
};
