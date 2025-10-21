"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ConnectWalletButton from "../wallet/connect-wallet-button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { usePrivy } from "@privy-io/react-auth";

const handleNavigation = (
  target: string,
  pathname: string,
  router: ReturnType<typeof useRouter>
) => {
  const isHomePage = pathname === "/";

  if (isHomePage) {
    if (typeof window !== "undefined" && (window as any).smoothScrollTo) {
      (window as any).smoothScrollTo(target);
    }
  } else {
    router.push(`/${target}`);
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { authenticated: isAuthenticated } = usePrivy();

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-xl">
      <div className="container max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-0.5">
            <Image src={"/logo-white.png"} alt="" width={150} height={150} />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
              onClick={() => handleNavigation("#home", pathname, router)}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("#bonding-curves", pathname, router)}
              className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
            >
              Bonding Curves
            </button>
            <button
              onClick={() => handleNavigation("#faqs", pathname, router)}
              className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
            >
              FAQs
            </button>
          </div>

          {/* Desktop wallet button */}
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
            <Link href="/create" className="hidden md:block">
              <Button className="rounded-lg bg-white hover:bg-white/90 text-black font-mono">
                Deploy
              </Button>
            </Link>
            )}

            <ConnectWalletButton />

            {/* Mobile menu toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon: Hamburger / Close */}
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-4 border border-white/10 rounded-xl bg-background/60 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-2">
              <button
                className="block w-full text-left text-base text-foreground hover:text-foreground/80"
                onClick={() => {
                  handleNavigation("#home", pathname, router);
                  setIsOpen(false);
                }}
              >
                Home
              </button>
              <button
                className="block w-full text-left text-base text-foreground hover:text-foreground/80"
                onClick={() => {
                  handleNavigation("#bonding-curves", pathname, router);
                  setIsOpen(false);
                }}
              >
                Bonding Curves
              </button>
              <button
                className="block w-full text-left text-base text-foreground hover:text-foreground/80"
                onClick={() => {
                  handleNavigation("#faqs", pathname, router);
                  setIsOpen(false);
                }}
              >
                FAQs
              </button>
            </div>

            {isAuthenticated && (
              <div className="p-4">
                <Link href="/create">
                  <Button className="rounded-lg bg-white hover:bg-white/90 text-black font-mono">
                    Deploy
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
