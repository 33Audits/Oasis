"use client";

import { useEnsureChain } from "@/hooks/useEnsureChain";

export function ChainGuard({ children }: { children: React.ReactNode }) {
  useEnsureChain();
  return <>{children}</>;
}