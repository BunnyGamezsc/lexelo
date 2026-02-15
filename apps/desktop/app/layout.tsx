"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "@workspace/ui/globals.css";
import { Clerk } from "@clerk/clerk-js";
import { Suspense, use, useEffect, useState } from "react";
import { ClerkProvider, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Login from "#/frontend/Login";
import { cn } from "#/lib/utils";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  CalendarDays,
  Layers,
  BookA,
  ScrollText,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/ui/breadcrumb";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "#/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/ui/tooltip";
import SidebarIcon from "#/frontend/SidebarIconHome";
import { Input } from "#/ui/input";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenu,
} from "#/ui/dropdown-menu";
import { Button } from "#/ui/button";
import defaultAvatar from "#/frontend/clerk-default.png";
import { initClerkSafe } from "@/lib/initClerkSafe";

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
  const [clerkPromise, setClerkPromise] = useState<Promise<Clerk> | null>(null);

  useEffect(() => {
    setClerkPromise(initClerkSafe());
  }, []);

  return (
    <html lang="en">
      <body className={"antialiased"}>
        <Suspense fallback={<LoadingClerk />}>
          {clerkPromise ? (
            <AppLoaded clerkPromise={clerkPromise} parentChildren={children} />
          ) : (
            <LoadingClerk />
          )}
        </Suspense>
      </body>
    </html>
  );
}

const AppLoaded = ({
  clerkPromise,
  parentChildren,
}: {
  clerkPromise: Promise<Clerk>;
  parentChildren: React.ReactNode;
}) => {
  const clerk = use(clerkPromise);

  useEffect(() => {
    console.log(clerk.user?.imageUrl);
    console.log("Has Image: ", clerk.user?.hasImage);
  }, [clerk]);
  return (
    <ClerkProvider publishableKey={clerk.publishableKey} Clerk={clerk}>
      <SignedOut>{parentChildren}</SignedOut>
      <SignedIn>
        <div className="--font-geist-sans --font-geist-mono dash antialiased flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
              <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <SidebarIcon link="#" tooltipText="Home">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </SidebarIcon>
              <SidebarIcon link="#" tooltipText="Sets">
                <Layers className="h-5 w-5" />
                <span className="sr-only">Sets</span>
              </SidebarIcon>
              <SidebarIcon link="" tooltipText="Learn">
                <BookA className="h-5 w-5" />
                <span className="sr-only">Learn</span>
              </SidebarIcon>
              <SidebarIcon link="" tooltipText="Study">
                <ScrollText className="h-5 w-5" />
                <span className="sr-only">Study</span>
              </SidebarIcon>
              <SidebarIcon link="" tooltipText="Community">
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Community</span>
              </SidebarIcon>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
              <SidebarIcon link="" tooltipText="Settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </SidebarIcon>
            </nav>
          </aside>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="#"
                      className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                      <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                      <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-foreground"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Orders
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Package className="h-5 w-5" />
                      Products
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Users2 className="h-5 w-5" />
                      Customers
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <LineChart className="h-5 w-5" />
                      Settings
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="#">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Image
                      src={clerk.user?.hasImage ? clerk.user.imageUrl : defaultAvatar}
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <SignOutButton><DropdownMenuItem>Logout</DropdownMenuItem></SignOutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            {parentChildren}
          </div>
        </div>
      </SignedIn>
    </ClerkProvider>
  );
};

const LoadingClerk = ({
  parentChildren,
}: {
  parentChildren?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="w-full max-w-sm">
        <Login SignInButton={null} />
      </div>
    </div>
  );
};
