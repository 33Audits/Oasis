"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Clock } from "lucide-react";

interface Transaction {
  id: number;
  time: string;
  agent: string;
  type: string;
  assets: string;
  value: string;
  status: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="bg-neutral-950 border-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-neutral-50">
          Recent Transactions
        </CardTitle>
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
              <TableHead className="text-neutral-400">Agent</TableHead>
              <TableHead className="text-neutral-400">Type</TableHead>
              <TableHead className="text-neutral-400">Assets</TableHead>
              <TableHead className="text-neutral-400">Value</TableHead>
              <TableHead className="text-neutral-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow
                key={tx.id}
                className="border-neutral-800 hover:bg-neutral-900"
              >
                <TableCell className="text-neutral-300">
                  {tx.time}
                </TableCell>
                <TableCell className="text-neutral-50 font-medium">
                  {tx.agent}
                </TableCell>
                <TableCell className="text-neutral-300">
                  {tx.type}
                </TableCell>
                <TableCell className="text-neutral-300">
                  {tx.assets}
                </TableCell>
                <TableCell className="text-neutral-50 font-mono">
                  {tx.value}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tx.status === "Completed"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      tx.status === "Pending"
                        ? "border-blue-500 text-blue-400"
                        : ""
                    }
                  >
                    {tx.status === "Completed" ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
