"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DeployButtonProps {
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  tooltipMessage?: string;
}

export function DeployButton({ 
  className = "", 
  fullWidth = false,
  children = "Deploy",
  size,
  tooltipMessage = "Connect wallet to deploy"
}: DeployButtonProps) {
  const { authenticated: isAuthenticated } = usePrivy();

  const baseClasses = "disabled:opacity-50 disabled:cursor-not-allowed";
  
  const defaultClasses = !className ? "rounded-lg bg-white hover:bg-white/90 text-black font-mono" : "";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Link
              href={isAuthenticated ? "/create" : "#"}
              className={!isAuthenticated ? "pointer-events-none" : ""}
            >
              <Button
                disabled={!isAuthenticated}
                size={size}
                className={`${baseClasses} ${defaultClasses} ${fullWidth ? "w-full" : ""} ${className}`}
              >
                {children}
              </Button>
            </Link>
          </div>
        </TooltipTrigger>
        {!isAuthenticated && (
          <TooltipContent>
            <p>{tooltipMessage}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
