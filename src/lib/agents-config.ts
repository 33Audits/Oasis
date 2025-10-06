// lib/agents-config.ts
export const chatAgents = [
    {
      id: 'ember-aave' as const,
      name: 'Lending',
      description: 'AAVE lending agent',
      suggestedActions: [
        {
          title: 'Deposit WETH',
          label: 'to my balance',
          action: 'Deposit WETH to my balance',
        },
        { title: 'Check', label: 'balance', action: 'Check balance' },
      ],
    },
    {
      id: 'ember-camelot' as const,
      name: 'Trading',
      description: 'Camelot Swapping agent',
      suggestedActions: [
        {
          title: 'Swap USDC for ETH',
          label: 'on Arbitrum Network.',
          action: 'Swap USDC for ETH tokens from Arbitrum to Arbitrum.',
        },
        {
          title: 'Buy ARB',
          label: 'on Arbitrum.',
          action: 'Buy ARB token.',
        },
      ],
    },
  ] as const;
  
  export const DEFAULT_SERVER_URLS = new Map<ChatAgentId, string>([
    ['ember-aave', 'http://localhost:3001/sse'], // Your local agent
    ['ember-camelot', 'http://localhost:3005/sse'], // Your local agent
  ]);
  
  export type ChatAgentId = (typeof chatAgents)[number]['id'] | 'all';