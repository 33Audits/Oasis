'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import {
  LayoutDashboard,
  Vault,
  TrendingUp,
  Receipt,
  BookOpen,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Activity,
  Check,
  Clock,
  Plus,
  Eye,
  Play,
  Pause,
  ExternalLink
} from 'lucide-react'
import { FaMicrochip } from "react-icons/fa6"
import { usePrivy } from "@privy-io/react-auth"

export default function ProfileDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const { user } = usePrivy()
  const walletAddress = user?.wallet?.address
  const truncatedAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not Connected'

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'My Agents', icon: FaMicrochip, active: false },
    { name: 'Agent Vaults', icon: Vault, active: false },
    { name: 'Funding Markets', icon: TrendingUp, active: false },
    { name: 'Transactions', icon: Receipt, active: false },
    { name: 'Knowledge Base', icon: BookOpen, active: false },
    { name: 'Settings', icon: Settings, active: false },
  ]

  const agents = [
  {
    id: 1,
      name: 'Trading Alpha',
      initials: 'TA',
      status: 'Ready',
      portfolio: '$24,580',
      strategies: '3 active',
      lastAction: '2 hours ago',
      canTrain: false
  },
  {
    id: 2,
      name: 'Yield Optimizer',
      initials: 'YO',
      status: 'Training',
      portfolio: '$18,920',
      strategies: '2 active',
      lastAction: '5 hours ago',
      canTrain: true
  },
  {
    id: 3,
      name: 'DeFi Master',
      initials: 'DM',
      status: 'Ready',
      portfolio: '$32,150',
      strategies: '5 active',
      lastAction: '1 hour ago',
      canTrain: false
    },
    {
      id: 4,
      name: 'Liquidity Hunter',
      initials: 'LH',
      status: 'Not Trained',
      portfolio: '$0',
      strategies: '0 active',
      lastAction: 'Never',
      canTrain: true
    },
    {
      id: 5,
      name: 'Arbitrage Scout',
      initials: 'AS',
      status: 'Ready',
      portfolio: '$28,470',
      strategies: '4 active',
      lastAction: '30 minutes ago',
      canTrain: false
    },
    {
      id: 6,
      name: 'Risk Manager',
      initials: 'RM',
      status: 'Training',
      portfolio: '$15,600',
      strategies: '2 active',
      lastAction: '3 hours ago',
      canTrain: true
    }
  ]

  const vaults = [
  {
    id: 1,
      name: 'Alpha Trading Vault',
      agent: 'Trading Alpha',
      capital: '$24,580',
      assets: 'ETH, USDC',
      status: 'Active'
  },
  {
    id: 2,
      name: 'Yield Optimization Vault',
      agent: 'Yield Optimizer',
      capital: '$18,920',
      assets: 'USDC, DAI',
      status: 'Active'
    },
    {
      id: 3,
      name: 'DeFi Strategy Vault',
      agent: 'DeFi Master',
      capital: '$32,150',
      assets: 'ETH, BTC, USDC',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Arbitrage Vault',
      agent: 'Arbitrage Scout',
      capital: '$28,470',
      assets: 'Multi-chain',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Risk Hedging Vault',
      agent: 'Risk Manager',
      capital: '$15,600',
      assets: 'ETH, USDC',
      status: 'Paused'
    }
  ]

  const markets = [
  {
    id: 1,
      title: 'Alpha Trading Initial Funding',
      agent: 'Trading Alpha',
    progress: 85,
      raised: '$42,500',
      target: '$50,000',
      status: 'Active'
  },
  {
    id: 2,
      title: 'Yield Optimizer Launch',
      agent: 'Yield Optimizer',
    progress: 100,
      raised: '$30,000',
      target: '$30,000',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'DeFi Master Expansion',
      agent: 'DeFi Master',
      progress: 45,
      raised: '$22,500',
      target: '$50,000',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Liquidity Hunter Bootstrap',
      agent: 'Liquidity Hunter',
      progress: 15,
      raised: '$3,000',
      target: '$20,000',
      status: 'Active'
    }
  ]

  const transactions = [
  {
    id: 1,
      time: '2 min ago',
      agent: 'Trading Alpha',
      type: 'Spot Trade',
      assets: 'ETH → USDC',
      value: '$5,420',
      status: 'Completed'
  },
  {
    id: 2,
      time: '15 min ago',
      agent: 'Yield Optimizer',
      type: 'Yield Strategy',
      assets: 'USDC',
      value: '$3,200',
      status: 'Completed'
  },
  {
    id: 3,
      time: '1 hour ago',
      agent: 'DeFi Master',
      type: 'Rebalance',
      assets: 'Multi-asset',
      value: '$12,850',
      status: 'Completed'
    },
    {
      id: 4,
      time: '2 hours ago',
      agent: 'Arbitrage Scout',
      type: 'Spot Trade',
      assets: 'BTC → ETH',
      value: '$8,900',
      status: 'Completed'
    },
    {
      id: 5,
      time: '3 hours ago',
      agent: 'Trading Alpha',
      type: 'Liquidity Provision',
      assets: 'ETH/USDC',
      value: '$6,500',
      status: 'Pending'
    },
    {
      id: 6,
      time: '5 hours ago',
      agent: 'Yield Optimizer',
      type: 'Yield Strategy',
      assets: 'DAI',
      value: '$4,100',
      status: 'Completed'
    }
  ]

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50">
      {/* Sidebar */}
      <div className={`bg-neutral-950 border-r border-neutral-800 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } ${sidebarCollapsed ? 'hidden md:block' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
             
            </div>
        </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveNav(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeNav === item.name
                        ? 'bg-neutral-800 border border-neutral-700 text-blue-400'
                        : 'text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
            </nav>
          </div>
      </div>

        {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-neutral-950 border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="md:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-neutral-50">Overview</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search agents, vaults..."
                  className="pl-10 w-64 bg-neutral-900 border-neutral-700 text-neutral-50 placeholder:text-neutral-400"
                />
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-neutral-950 border-neutral-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-400">Total Portfolio Value</CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-50">$145,892.50</div>
                  <p className="text-xs text-green-500">+12.5% this month</p>
                </CardContent>
              </Card>

              <Card className="bg-neutral-950 border-neutral-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-400">Active Agents</CardTitle>
                  <FaMicrochip className="w-4 h-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-50">8</div>
                  <p className="text-xs text-neutral-400">3 training</p>
                </CardContent>
              </Card>

              <Card className="bg-neutral-950 border-neutral-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-400">Total Vaults</CardTitle>
                  <Vault className="w-4 h-4 text-neutral-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-50">5</div>
                  <p className="text-xs text-neutral-400">$85,420 capital</p>
                </CardContent>
              </Card>

              <Card className="bg-neutral-950 border-neutral-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-400">Active Markets</CardTitle>
                  <TrendingUp className="w-4 h-4 text-neutral-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-50">3</div>
                  <p className="text-xs text-neutral-400">2 completing</p>
                </CardContent>
              </Card>
          </div>

            {/* Agent Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-neutral-50">My Agents</h2>
                <Button className="gap-2 bg-white text-black hover:bg-white/90 rounded-xl cursor-pointer">
                  <Plus className="w-4 h-4" />
                  Create New Agent
                </Button>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <Card key={agent.id} className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-500 text-white">{agent.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                          <h3 className="font-semibold text-neutral-50">{agent.name}</h3>
                            <Badge
                            variant={
                              agent.status === 'Ready' ? 'default' :
                              agent.status === 'Training' ? 'outline' :
                              'secondary'
                            }
                            className={
                              agent.status === 'Ready' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                              agent.status === 'Training' ? 'border-yellow-500 text-yellow-500' : ''
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
                          <span className="text-neutral-50 font-medium">{agent.portfolio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Strategies:</span>
                          <span className="text-neutral-50">{agent.strategies}</span>
                          </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Last action:</span>
                          <span className="text-neutral-50">{agent.lastAction}</span>
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

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-neutral-950 border-neutral-800">
              <CardHeader>
                  <CardTitle className="text-neutral-50">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center justify-center h-64 bg-neutral-900 rounded-lg">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <div className="text-white font-semibold">Chart</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-neutral-400">ETH</span>
                          <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                            <div className="h-2 bg-blue-500 rounded-full" style={{width: '40%'}}></div>
                          </div>
                          <span className="text-neutral-50">40%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-neutral-400">USDC</span>
                          <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{width: '25%'}}></div>
                    </div>
                          <span className="text-neutral-50">25%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-neutral-400">BTC</span>
                          <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                            <div className="h-2 bg-orange-500 rounded-full" style={{width: '20%'}}></div>
                      </div>
                          <span className="text-neutral-50">20%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-neutral-400">Other</span>
                          <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                            <div className="h-2 bg-purple-500 rounded-full" style={{width: '15%'}}></div>
                      </div>
                          <span className="text-neutral-50">15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-950 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-neutral-50">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-neutral-400">24h Change</span>
                      </div>
                      <span className="text-green-500 font-medium">+5.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-neutral-400">7d Change</span>
                      </div>
                      <span className="text-green-500 font-medium">+18.7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-neutral-400">Monthly Return</span>
                  </div>
                      <span className="text-green-500 font-medium">+12.5%</span>
                </div>
                        <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-neutral-400">Active Strategies</span>
                            </div>
                      <span className="text-neutral-50 font-medium">17</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                </div>

            {/* Agent Vaults */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-neutral-50">Agent Vaults</CardTitle>
                <Button variant="outline" size="sm" className="border-neutral-700 hover:bg-neutral-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Vault
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-neutral-800 hover:bg-neutral-900">
                      <TableHead className="text-neutral-400">Vault Name</TableHead>
                      <TableHead className="text-neutral-400">Agent</TableHead>
                      <TableHead className="text-neutral-400">Capital</TableHead>
                      <TableHead className="text-neutral-400">Assets</TableHead>
                      <TableHead className="text-neutral-400">Status</TableHead>
                      <TableHead className="text-neutral-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vaults.map((vault) => (
                      <TableRow key={vault.id} className="border-neutral-800 hover:bg-neutral-900">
                        <TableCell className="text-neutral-50 font-medium">{vault.name}</TableCell>
                        <TableCell className="text-neutral-300">{vault.agent}</TableCell>
                        <TableCell className="text-neutral-50 font-mono">{vault.capital}</TableCell>
                        <TableCell className="text-neutral-300">{vault.assets}</TableCell>
                        <TableCell>
                          <Badge
                            variant={vault.status === 'Active' ? 'default' : 'secondary'}
                            className={vault.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
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
                            {vault.status === 'Paused' ? (
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

            {/* Funding Markets */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-neutral-50">Funding Markets</h2>
                <Button variant="outline" className="border-neutral-700 hover:bg-neutral-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Deploy New Market
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {markets.map((market) => (
                  <Card key={market.id} className="bg-neutral-950 border-neutral-800">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-neutral-50">{market.title}</h3>
                          <p className="text-sm text-neutral-400">by {market.agent}</p>
                        </div>
                        <Badge
                          variant={market.status === 'Active' ? 'default' : 'secondary'}
                          className={market.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                        >
                          {market.status}
                        </Badge>
                          </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                          <span className="text-neutral-400">Progress</span>
                          <span className="text-neutral-50">{market.progress}%</span>
                          </div>
                        <Progress value={market.progress} className="h-2" />
                        <div className="flex justify-between">
                          <span className="text-neutral-300 font-mono">{market.raised}</span>
                          <span className="text-neutral-400">/ {market.target}</span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full border-neutral-700 hover:bg-neutral-800"
                          size="sm"
                        >
                          View Market
                        </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            </div>

            {/* Recent Transactions */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-neutral-50">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
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
                      <TableRow key={tx.id} className="border-neutral-800 hover:bg-neutral-900">
                        <TableCell className="text-neutral-300">{tx.time}</TableCell>
                        <TableCell className="text-neutral-50 font-medium">{tx.agent}</TableCell>
                        <TableCell className="text-neutral-300">{tx.type}</TableCell>
                        <TableCell className="text-neutral-300">{tx.assets}</TableCell>
                        <TableCell className="text-neutral-50 font-mono">{tx.value}</TableCell>
                        <TableCell>
                          <Badge
                            variant={tx.status === 'Completed' ? 'secondary' : 'outline'}
                            className={tx.status === 'Pending' ? 'border-blue-500 text-blue-400' : ''}
                          >
                            {tx.status === 'Completed' ? (
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
          </div>
        </main>
      </div>
    </div>
  )
}
