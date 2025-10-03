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
import { Plus, Play, ExternalLink } from "lucide-react";

interface Vault {
  id: number;
  name: string;
  agent: string;
  capital: string;
  assets: string;
  status: string;
}

interface AgentVaultsProps {
  vaults: Vault[];
}

export function AgentVaults({ vaults }: AgentVaultsProps) {
  return (
    <Card className="bg-neutral-950 border-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-neutral-50">Agent Vaults</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="border-neutral-700 hover:bg-neutral-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Vault
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-neutral-900">
              <TableHead className="text-neutral-400">
                Vault Name
              </TableHead>
              <TableHead className="text-neutral-400">Agent</TableHead>
              <TableHead className="text-neutral-400">
                Capital
              </TableHead>
              <TableHead className="text-neutral-400">Assets</TableHead>
              <TableHead className="text-neutral-400">Status</TableHead>
              <TableHead className="text-neutral-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaults.map((vault) => (
              <TableRow
                key={vault.id}
                className="border-neutral-800 hover:bg-neutral-900"
              >
                <TableCell className="text-neutral-50 font-medium">
                  {vault.name}
                </TableCell>
                <TableCell className="text-neutral-300">
                  {vault.agent}
                </TableCell>
                <TableCell className="text-neutral-50 font-mono">
                  {vault.capital}
                </TableCell>
                <TableCell className="text-neutral-300">
                  {vault.assets}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      vault.status === "Active"
                        ? "default"
                        : "secondary"
                    }
                    className={
                      vault.status === "Active"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : ""
                    }
                  >
                    {vault.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neutral-700 hover:bg-neutral-800"
                  >
                    {vault.status === "Paused" ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Delegate
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
