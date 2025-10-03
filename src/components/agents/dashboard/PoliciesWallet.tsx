"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface PoliciesWalletProps {
  policies: string[];
  agentWallet: string;
}

export function PoliciesWallet({ policies, agentWallet }: PoliciesWalletProps) {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-4">
        <div>
          <div className="text-sm font-medium mb-2">POLICIES:</div>
          <div className="flex gap-2">
            {policies.map((policy, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-neutral-700 text-neutral-300 text-xs"
              >
                {policy}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">AGENT WALLET:</div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">
              {agentWallet}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(agentWallet)}
              className={cn(
                "transition-colors",
                copiedText === agentWallet
                  ? "text-green-400"
                  : "text-neutral-400 hover:text-foreground"
              )}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
