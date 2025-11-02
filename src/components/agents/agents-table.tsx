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
import { cn, formatCompactNumber } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useBondingCurveDetails } from "@/hooks/useBondingCurveDetails";
import { DeployButton } from "../shared/deploy-button";

const allColumns = [
  "Token",
  "Symbol",
  "Market Cap",
  "Holders",
] as const;

function AgentsTable() {
  const { data: details } = useBondingCurveDetails();

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...allColumns,
  ]);
  const [searchFilter, setSearchFilter] = useState("");

  const router = useRouter();
  const { authenticated: isAuthenticated } = usePrivy();

  const filteredData = details.filter((curve) => {
    if (!searchFilter) return true;

    const searchLower = searchFilter.toLowerCase();

    return (
      curve.issuanceToken.name.toLowerCase().includes(searchLower) ||
      curve.issuanceToken.symbol.toLowerCase().includes(searchLower)
    );
  }).sort((a, b) => {
    const marketCapA = a.marketCap ?? 0;
    const marketCapB = b.marketCap ?? 0;
    return marketCapB - marketCapA;
  });


  return (
    <div className="max-w-7xl mx-auto w-full container space-y-4 px-4 py-8 bg-background shadow-sm overflow-x-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-12">
        <h2 className="text-3xl md:text-5xl font-normal text-white">Bonding Curves</h2>
        <div className="flex gap-2 md:gap-3">
          <Input
            placeholder="Search tokens or symbols..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full md:w-64 bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
          />
         < DeployButton />
        </div>
      </div>

      <div className=" border border-neutral-800 p-4 rounded-xl">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-neutral-700">
              {visibleColumns.includes("Token") && (
                <TableHead className="w-[200px] text-neutral-300">
                  Token
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
              {visibleColumns.includes("Holders") && (
                <TableHead className="w-[100px] text-neutral-300">
                  Holders
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
                  {visibleColumns.includes("Token") && (
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
                      {token.marketCap !== null && token.marketCap !== undefined
                        ? `$${formatCompactNumber(token.marketCap, 2)}`
                        : "-"}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Holders") && (
                    <TableCell className="whitespace-nowrap text-neutral-300">
                      {token.holderCount ?? "-"}
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
