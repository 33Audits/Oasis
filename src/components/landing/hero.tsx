import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Sponsors from "./sponsors";

export default function Hero() {
  return (
    <section className="min-h-screen top-0 relative overflow-hidden" id="home">
      <div className="top-0 absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/20" />
      <div className="relative container mx-auto px-4 py-28">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-normal tracking-wide">
              Deploy Strategies
              <br />
              <span className="text-primary font-mono bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent">
                On-Chain
              </span>
            </h1>
            <p className="font-light text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Deploy bonding curves to fund and tokenize your onchain strategies
              with custom parameters, transparent pricing, and community ownership.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create">
              <Button
                size="lg"
                className="flex items-center rounded-xl bg-white hover:bg-white/90 text-black font-mono text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* <Button
              variant="outline"
              size="lg"
              className="font-mono text-lg px-8 py-6 hover:bg-muted/50 transition-colors"
            >
              <Zap className="mr-2 h-5 w-5" />
              View Demo
            </Button> */}
          </div>
        </div>
      </div>
      {/* <Sponsors/> */}
    </section>
  );
}
