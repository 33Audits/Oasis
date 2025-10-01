import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ConnectWalletButton from "../wallet/connect-wallet-button";

export default function Navbar() {
  return (
    <header className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-0.5">
          <Image src={"/logo-white.png"}
            alt=""
            width={150}
            height={150}
          />
        </div>

        <div className="flex items-center space-x-8" >
          <Link href="/" className="text-base text-foreground hover:text-foreground/80">
            Discover
          </Link>
          <Link href="#" className="text-base text-foreground hover:text-foreground/80">
            About
          </Link>
          <Link href="#" className="text-base text-foreground hover:text-foreground/80">
            Support
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
