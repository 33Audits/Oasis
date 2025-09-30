import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Footer } from "@/components/ui/footer";
import {
  Rocket,
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import AgentsTable from "@/components/agents/agents-table";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Deploy AI Trading Agents
                <br />
                <span className="text-primary font-mono bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  On-Chain
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Create, configure, and deploy autonomous trading agents with
                custom strategies, risk management, and tokenized ownership.
                <span className="text-primary font-semibold">
                  {" "}
                  Join the future of autonomous trading.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/create">
                <Button
                  size="lg"
                  className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Create Your Agent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="font-mono text-lg px-8 py-6 hover:bg-muted/50 transition-colors"
              >
                <Zap className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Table Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              Active Trading Agents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the current marketplace of autonomous trading agents
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto">
            <AgentsTable />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
