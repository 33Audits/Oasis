"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AgentSummaryProps {
  agentData: {
    id: string;
    name: string;
    symbol: string;
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
    <div className="p-4 sm:p-6 bg-card border border-border rounded-xl">
      {/* Mobile layout */}
      <div className="sm:hidden space-y-4">
        {/* Avatar + Name + ID in one row */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 bg-black shrink-0">
            <AvatarImage src={agentData.avatar} alt={agentData.name} />
            <AvatarFallback className="bg-black text-white text-lg">
              S
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-2xl font-bold text-foreground leading-tight truncate">
              {agentData.name}
            </h1>
            <span className="text-lg text-neutral-400 whitespace-nowrap">
              ${agentData.symbol}
            </span>
          </div>
        </div>

        {/* Tags below */}
        <div className="flex gap-2 flex-wrap">
          {agentData.tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="bg-neutral-700 text-neutral-300 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats below */}
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="text-center">
            <span className="text-neutral-400 block">Market cap: </span>
            <span className="text-foreground font-medium break-words">
              {agentData.marketCap}
            </span>
          </div>
          <div className="text-center">
            <span className="text-neutral-400 block">1d change: </span>
            <span className="text-green-400 font-medium break-words">
              {agentData.change1d}
            </span>
          </div>
          <div className="text-center">
            <span className="text-neutral-400 block">Holders: </span>
            <span className="text-foreground font-medium break-words">
              {agentData.holders}
            </span>
          </div>
          <div className="text-center">
            <span className="text-neutral-400 block">AUM: </span>
            <span className="text-foreground font-medium break-words">
              {agentData.aum}
            </span>
          </div>
          <div className="col-span-2 text-center">
            <span className="text-neutral-400 block">Returns: </span>
            <span className="text-green-400 font-medium break-words">
              {agentData.returns}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop layout - preserve original design */}
      <div className="hidden sm:flex items-center gap-6">
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
    </div>
  );
}
