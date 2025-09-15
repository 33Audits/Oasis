import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Rocket, Shield, Zap, TrendingUp, Code, X } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-0.5">
            <Image src={"https://pbs.twimg.com/profile_images/1960579574024060928/jgfzPvLH_400x400.jpg"}
              alt=""
              width={70}
              height={70}
            />

            <X className="h-9 w-9 text-neutral-400 font-bold" />

            <Image src={"https://pbs.twimg.com/profile_images/1828342451213606913/34bu6fHq_400x400.jpg"}
              alt=""
              width={70}
              height={70}
            />
            <span className="text-xl font-bold text-foreground">Agent Launchpad</span>
          </div>
          <Link href="/create">
            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-mono">
              Launch Agent
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <Badge variant="secondary" className="font-mono text-xs">
              v1.0.0 // BETA
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Deploy AI Trading Agents
              <br />
              <span className="text-primary font-mono">On-Chain</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create, configure, and deploy autonomous trading agents with custom strategies,
              risk management, and tokenized ownership.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create">
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-lg px-8 py-6">
                <Rocket className="mr-2 h-5 w-5" />
                Create Your Agent
              </Button>
            </Link>
            {/* <Button variant="outline" size="lg" className="font-mono text-lg px-8 py-6">
              <Code className="mr-2 h-5 w-5" />
              View Docs
            </Button> */}
          </div>
        </div>

 
      </main>

      {/* Footer */}
      {/* <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-mono font-semibold">Agent Launchpad</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary font-mono">Documentation</a>
              <a href="#" className="hover:text-primary font-mono">GitHub</a>
              <a href="#" className="hover:text-primary font-mono">Discord</a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border text-center text-sm text-muted-foreground font-mono">
            © 2024 Agent Launchpad. Built for the future of autonomous trading.
          </div>
        </div>
      </footer> */}
    </div>
  );
}
