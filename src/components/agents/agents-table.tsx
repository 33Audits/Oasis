"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


type Agent = {
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

const data: Agent[] = [
  {
    id: "1",
    name: "Momentum Scalper",
    symbol: "BSCALP",
    avatar: "/33labs.jpg",
    tags: ["DeFi", "Scalping", "BSC"],
    marketCap: "$2.3M",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$48M",
    returns: "+3.42%",
  },
  {
    id: "2",
    name: "Sentiment Analyzer",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "Sentiment", "Analysis"],
    marketCap: "$892K",
    change1d: "+1.8%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "3",
    name: "Agent",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "4",
    name: "AGENT",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "5",
    name: "Agent",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "6",
    name: "Agent",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "7",
    name: "Agent",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "8",
    name: "Agent",
    symbol: "AGENT",
    avatar:
      "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "9",
    name: "Agent",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
  {
    id: "10",
    name: "Agent",
    symbol: "AGENT",
    avatar: "/33labs.jpg",
    tags: ["AI", "ML", "Auto"],
    marketCap: "$923K",
    change1d: "+2.1%",
    holders: "1,736",
    aum: "$64M",
    returns: "+3.42%",
  },
];

const allColumns = [
  "Agent",
  "Symbol",
  "Tags",
  "Market Cap",
  "1d change",
  "Holders",
  "AUM",
  "Returns",
] as const;

function AgentsTable() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...allColumns,
  ]);
  const [searchFilter, setSearchFilter] = useState("");

  const router = useRouter();

  const filteredData = data.filter((agent) => {
    if (!searchFilter) return true;

    const searchLower = searchFilter.toLowerCase();

    return (
      agent.name.toLowerCase().includes(searchLower) ||
      agent.symbol.toLowerCase().includes(searchLower) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="max-w-7xl mx-auto w-full container my-10 space-y-4 px-4 py-8 bg-background shadow-sm overflow-x-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-12">
        <h2 className="text-5xl font-bold text-neutral-300">Agents</h2>
        <div className="flex gap-3 flex-wrap">
          <Input
            placeholder="Search agents, symbols, or tags..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-64 bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
          />

          <Link href="/create">
            <Button className="rounded-lg bg-white hover:bg-white/90 text-black font-mono">
              Create Agent
            </Button>
          </Link>
        </div>
      </div>

      <div className=" border border-neutral-800 p-4 rounded-xl">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-neutral-700">
              {visibleColumns.includes("Agent") && (
                <TableHead className="w-[200px] text-neutral-300">
                  Agent
                </TableHead>
              )}
              {visibleColumns.includes("Symbol") && (
                <TableHead className="w-[100px] text-neutral-300">
                  Symbol
                </TableHead>
              )}
              {visibleColumns.includes("Tags") && (
                <TableHead className="w-[150px] text-neutral-300">
                  Tags
                </TableHead>
              )}
              {visibleColumns.includes("Market Cap") && (
                <TableHead className="w-[120px] text-neutral-300">
                  Market Cap
                </TableHead>
              )}
              {visibleColumns.includes("1d change") && (
                <TableHead className="w-[100px] text-neutral-300">
                  1d change
                </TableHead>
              )}
              {visibleColumns.includes("Holders") && (
                <TableHead className="w-[100px] text-neutral-300">
                  Holders
                </TableHead>
              )}
              {visibleColumns.includes("AUM") && (
                <TableHead className="w-[100px] text-neutral-300">
                  AUM
                </TableHead>
              )}
              {visibleColumns.includes("Returns") && (
                <TableHead className="w-[100px] text-neutral-300">
                  Returns
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((agent) => (
                <TableRow
                  key={agent.id}
                  className="border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                  onClick={() => router.push(`/agent/${agent.id}`)}
                >
                  {visibleColumns.includes("Agent") && (
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                          <AvatarFallback className="bg-neutral-700 text-neutral-300">
                            {agent.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-neutral-300">{agent.name}</span>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Symbol") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {agent.symbol}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Tags") && (
                    <TableCell className="whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {agent.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-neutral-700 text-neutral-300 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Market Cap") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {agent.marketCap}
                    </TableCell>
                  )}
                  {visibleColumns.includes("1d change") && (
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={cn(
                          "font-medium",
                          agent.change1d.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        )}
                      >
                        {agent.change1d}
                      </span>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Holders") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {agent.holders}
                    </TableCell>
                  )}
                  {visibleColumns.includes("AUM") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {agent.aum}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Returns") && (
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={cn(
                          "font-medium",
                          agent.returns.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        )}
                      >
                        {agent.returns}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-neutral-700">
                <TableCell
                  colSpan={visibleColumns.length}
                  className="text-center py-6 text-neutral-400"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AgentsTable;
