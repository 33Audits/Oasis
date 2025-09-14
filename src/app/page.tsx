import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Rocket, Shield, Zap, TrendingUp, Code } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="font-mono text-xl font-bold text-foreground">Agent Launchpad</span>
          </div>
          <Link href="/create">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono">
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
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-lg px-8 py-6">
                <Rocket className="mr-2 h-5 w-5" />
                Create Your Agent
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="font-mono text-lg px-8 py-6">
              <Code className="mr-2 h-5 w-5" />
              View Docs
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <CardTitle className="font-mono">Agent Creation</CardTitle>
              </div>
              <CardDescription>
                Design your agent's personality, trading strategy, and risk parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="font-mono text-xs">Custom Strategy</Badge>
                <Badge variant="secondary" className="font-mono text-xs">Risk Management</Badge>
                <Badge variant="secondary" className="font-mono text-xs">MCP Tools</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="font-mono">Vault Policies</CardTitle>
              </div>
              <CardDescription>
                Configure profit distribution, access controls, and performance fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="font-mono text-xs">Profit Sharing</Badge>
                <Badge variant="secondary" className="font-mono text-xs">Access Control</Badge>
                <Badge variant="secondary" className="font-mono text-xs">Fee Structure</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <CardTitle className="font-mono">Token Launch</CardTitle>
              </div>
              <CardDescription>
                Deploy your agent token with custom parameters and funding goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="font-mono text-xs">Token Economics</Badge>
                <Badge variant="secondary" className="font-mono text-xs">Liquidity Pool</Badge>
                <Badge variant="secondary" className="font-mono text-xs">Smart Contracts</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-card rounded-lg p-8 text-center border border-primary/20">
          <h2 className="text-2xl font-bold mb-6 font-mono text-primary">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-3xl font-bold text-primary font-mono">$0M</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-3xl font-bold text-primary font-mono">0</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-3xl font-bold text-primary font-mono">0</div>
              <div className="text-sm text-muted-foreground">Deployed Tokens</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-3xl font-bold text-primary font-mono">0%</div>
              <div className="text-sm text-muted-foreground">Avg. Performance</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
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
      </footer>
    </div>
  );
}
