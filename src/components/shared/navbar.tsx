"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ConnectWalletButton from "../wallet/connect-wallet-button";

const handleNavigation = (target: string, pathname: string, router: ReturnType<typeof useRouter>) => {
  const isHomePage = pathname === "/";

  if (isHomePage) {
    // On home page, use smooth scroll
    if (typeof window !== "undefined" && (window as any).smoothScrollTo) {
      (window as any).smoothScrollTo(target);
    }
  } else {
    // Not on home page, redirect to home page with hash
    router.push(`/${target}`);
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl">
      <div className="container max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-0.5">
          <Image src={"/logo-white.png"} alt="" width={150} height={150} />
        </div>

        <div className="flex items-center space-x-8">
          <button
            className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
            onClick={() => handleNavigation("#home", pathname, router)}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("#agents", pathname, router)}
            className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
          >
            Agents
          </button>
          <button
            onClick={() => handleNavigation("#faqs", pathname, router)}
            className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
          >
            FAQs
          </button>
        </div>
        {/* <Link href="/create">
          <Button className="rounded-xl bg-white hover:bg-white/90 text-black font-mono">
            Launch Agent
          </Button>
        </Link> */}
        <ConnectWalletButton />
      </div>
    </header>
  );
}
