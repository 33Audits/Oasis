"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Eye, Play } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  initials: string;
  status: string;
  portfolio: string;
  strategies: string;
  lastAction: string;
  canTrain: boolean;
}

interface AgentManagementProps {
  agents: Agent[];
}

export function AgentManagement({ agents }: AgentManagementProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-50">
          My Agents
        </h2>
        <Button className="gap-2 bg-white text-black hover:bg-white/90 rounded-xl cursor-pointer">
          <Plus className="w-4 h-4" />
          Create New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={"/33labs.jpg"} alt={agent.name} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {agent.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-50">
                    {agent.name}
                  </h3>
                  <Badge
                    variant={
                      agent.status === "Ready"
                        ? "default"
                        : agent.status === "Training"
                        ? "outline"
                        : "secondary"
                    }
                    className={
                      agent.status === "Ready"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : agent.status === "Training"
                        ? "border-yellow-500 text-yellow-500"
                        : ""
                    }
                  >
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Portfolio:</span>
                  <span className="text-neutral-50 font-medium">
                    {agent.portfolio}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Strategies:</span>
                  <span className="text-neutral-50">
                    {agent.strategies}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Last action:</span>
                  <span className="text-neutral-50">
                    {agent.lastAction}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-neutral-700 hover:bg-neutral-800"
                size="sm"
              >
                {agent.canTrain ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Train Agent
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
