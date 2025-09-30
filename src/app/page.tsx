import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Rocket, Bot, TrendingUp, Shield, Zap, DollarSign, Users, Clock, ArrowRight } from "lucide-react";
import AgentsTable from "@/components/agents/agents-table";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* <Badge variant="outline" className="px-4 py-2 text-sm font-mono">
                🚀 Next-Gen DeFi Trading Platform
              </Badge> */}
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
                <span className="text-primary font-semibold"> Join the future of autonomous trading.</span>
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
              <Button variant="outline" size="lg" className="font-mono text-lg px-8 py-6 hover:bg-muted/50 transition-colors">
                <Zap className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>

          </div>
        </div>
      </section>


      {/* CTA Section */}
      {/* <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of traders who are already using AI-powered trading agents.
              Create your first agent in minutes and start automating your strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/create">
                <Button
                  size="lg"
                  className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-lg px-8 py-6"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Building Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="font-mono text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Agents Table Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">Active Trading Agents</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the current marketplace of autonomous trading agents
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto">
            <AgentsTable />
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-mono font-semibold text-lg">Agent Launchpad</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The future of autonomous trading is here. Deploy AI agents with confidence.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono font-semibold">Platform</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Create Agent</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Marketplace</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Analytics</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Documentation</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono font-semibold">Community</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Discord</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Twitter</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">GitHub</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Forum</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Help Center</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">API Docs</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Contact Us</a>
                <a href="#" className="block text-muted-foreground hover:text-primary font-mono transition-colors">Status</a>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground font-mono">
            <div>© 2024 Agent Launchpad. Built for the future of autonomous trading.</div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
