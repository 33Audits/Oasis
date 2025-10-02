"use client";

import Link from "next/link";
import Image from "next/image";
import ConnectWalletButton from "../wallet/connect-wallet-button";

const handleSmoothScroll = (target: string) => {
  if (typeof window !== "undefined" && (window as any).smoothScrollTo) {
    (window as any).smoothScrollTo(target);
  }
};

export default function Navbar() {
  return (
    <header className=" sticky top-0 z-50 backdrop-blur-xl">
      <div className="container max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-0.5">
          <Image src={"/logo-white.png"} alt="" width={150} height={150} />
        </div>

        <div className="flex items-center space-x-8">
          <Link
            href="#home"
            className="text-base text-foreground hover:text-foreground/80"
            onClick={() => handleSmoothScroll("#home")}
          >
            Home
          </Link>
          <Link
            href="#agents"
            onClick={() => handleSmoothScroll("#agents")}
            className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
          >
            Agents
          </Link>
          <Link
            href="#faqs"
            onClick={() => handleSmoothScroll("#faqs")}
            className="text-base text-foreground hover:text-foreground/80 cursor-pointer"
          >
            FAQs
          </Link>
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
