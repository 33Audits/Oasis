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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useBondingCurveDetails } from "@/hooks/useBondingCurveDetails";

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
  const { data: details } = useBondingCurveDetails();
  console.log(details);

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...allColumns,
  ]);
  const [searchFilter, setSearchFilter] = useState("");

  const router = useRouter();
  const { authenticated: isAuthenticated } = usePrivy();

  const filteredData = details.filter((agent) => {
    if (!searchFilter) return true;

    const searchLower = searchFilter.toLowerCase();

    return (
      agent.issuanceToken.name.toLowerCase().includes(searchLower) ||
      agent.issuanceToken.symbol.toLowerCase().includes(searchLower)
    );
  });

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="max-w-7xl mx-auto w-full container space-y-4 px-4 py-8 bg-background shadow-sm overflow-x-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-12">
        <h2 className="text-3xl md:text-5xl font-normal text-white">Agents</h2>
        <div className="flex gap-2 md:gap-3">
          <Input
            placeholder="Search agents, symbols, or tags..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full md:w-64 bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
          />
          {isAuthenticated && (
            <Link href="/create">
              <Button className="rounded-lg bg-white hover:bg-white/90 text-black font-mono">
                <span className="sm:hidden">Create +</span>
                <span className="hidden sm:inline">Create Agent</span>
              </Button>
            </Link>
          )}
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
            {filteredData && filteredData.length ? (
              filteredData.map((token) => (
                <TableRow
                  key={token.fundingManagerAddress}
                  className="border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                  onClick={() =>
                    router.push(`/project/${token.fundingManagerAddress}`)
                  }
                >
                  {visibleColumns.includes("Agent") && (
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/33labs.jpg"
                            alt={token.issuanceToken.name}
                          />
                          <AvatarFallback className="bg-neutral-700 text-neutral-300">
                            {token.issuanceToken.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-neutral-300">
                          {token.issuanceToken.name}
                        </span>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Symbol") && (
                    <TableCell className="whitespace-nowrap font-mono text-neutral-300">
                      ${token.issuanceToken.symbol}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Market Cap") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {0}
                    </TableCell>
                  )}
                  {visibleColumns.includes("1d change") && (
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={cn(
                          "font-medium",
                          "0".startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        )}
                      >
                        {0}
                      </span>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Holders") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {0}
                    </TableCell>
                  )}
                  {visibleColumns.includes("AUM") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {0}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Returns") && (
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={cn(
                          "font-medium",
                          "0".startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        )}
                      >
                        {0}
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
