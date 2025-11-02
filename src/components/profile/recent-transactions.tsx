"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EXPLORER_URL } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: number;
  time: string;
  agent: string;
  type: string;
  assets: string;
  value: string;
  status: string;
  transactionHash: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="bg-neutral-950 border-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-neutral-50">Recent Transactions</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-400 hover:text-blue-300"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-neutral-900">
              <TableHead className="text-neutral-400">Time</TableHead>
              <TableHead className="text-neutral-400">Type</TableHead>
              <TableHead className="text-neutral-400">Assets</TableHead>
              <TableHead className="text-neutral-400">Value</TableHead>
              <TableHead className="text-neutral-400">Tx Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow
                key={tx.id}
                className="border-neutral-800 hover:bg-neutral-900"
              >
                <TableCell className="text-neutral-300">{tx.time}</TableCell>
                <TableCell className={`${tx.type.toLowerCase().includes("sell") ? "text-red-400" : "text-green-400"}`}>{tx.type}</TableCell>
                <TableCell className="text-neutral-300">{tx.assets}</TableCell>
                <TableCell className="text-neutral-50 font-mono">
                  {tx.value}
                </TableCell>
                <TableCell className="text-neutral-400 font-mono ">
                  <Link
                    href={`${EXPLORER_URL}/tx/${tx.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    {tx.transactionHash?.slice(0, 6)}...
                    {tx.transactionHash?.slice(-4)}
                    <ExternalLink className="w-4 h-4 text-neutral-400" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
