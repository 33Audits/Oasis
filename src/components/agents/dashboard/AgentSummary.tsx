"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AgentSummaryProps {
  agentData: {
    id: string;
    name: string;
    avatar: string;
    tags: string[];
    marketCap: string;
    change1d: string;
    holders: string;
    aum: string;
    returns: string;
  };
}

export function AgentSummary({ agentData }: AgentSummaryProps) {
  return (
    <div className="flex items-center gap-6 p-6 bg-card border border-border rounded-xl">
      <Avatar className="h-20 w-20 bg-black">
        <AvatarImage src={agentData.avatar} alt={agentData.name} />
        <AvatarFallback className="bg-black text-white text-xl">
          S
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-foreground">
            {agentData.name}
          </h1>
          <span className="text-xl text-neutral-400">
            #{agentData.id}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex gap-2 flex-wrap">
            {agentData.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-neutral-700 text-neutral-300 text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:flex sm:gap-8 text-sm gap-4">
            <div>
              <span className="text-neutral-400">Market cap: </span>
              <span className="text-foreground font-medium">
                {agentData.marketCap}
              </span>
            </div>
            <div>
              <span className="text-neutral-400">1d change: </span>
              <span className="text-green-400 font-medium">
                {agentData.change1d}
              </span>
            </div>
            <div>
              <span className="text-neutral-400">Holders: </span>
              <span className="text-foreground font-medium">
                {agentData.holders}
              </span>
            </div>
            <div>
              <span className="text-neutral-400">AUM: </span>
              <span className="text-foreground font-medium">
                {agentData.aum}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-neutral-400">Returns: </span>
              <span className="text-green-400 font-medium">
                {agentData.returns}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
