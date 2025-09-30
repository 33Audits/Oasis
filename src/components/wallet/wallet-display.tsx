import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Settings,
  LogOut,
  Globe,
  Database,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  User,
} from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

export default function WalletDisplay() {
  const { user, logout } = usePrivy();
  const walletAddress = user?.wallet?.address;
  const truncatedAddress = `${walletAddress?.slice(
    0,
    6
  )}...${walletAddress?.slice(-4)}`;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:bg-white/10 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <span className="font-mono text-sm">{truncatedAddress}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 bg-neutral-900 border-neutral-700 text-white rounded-2xl">
        <div className="p-4 space-y-4">
          {/* Wallet Address Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-neutral-800 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-sm text-neutral-300">
                  {truncatedAddress}
                </div>
                <div className="text-xs text-neutral-400">Connected Wallet</div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 text-neutral-400 hover:text-white hover:bg-neutral-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 text-neutral-400 hover:text-white hover:bg-neutral-700"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <MenuItem icon={<User className="w-4 h-4" />} text="Profile" />

            <MenuItem icon={<Settings className="w-4 h-4" />} text="Setting" />
          </div>

          {/* Disconnect Button */}
          <Button
            variant="ghost"
            className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 justify-start cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function MenuItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg cursor-pointer"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Button>
  );
}
