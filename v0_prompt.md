# Agent Token Launchpad - v0 Prompt

Create a comprehensive agent token launchpad application with a modern, techy design using Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components. The application should have a dark theme with purple/pink accent colors and extensive use of monospace fonts for a technical aesthetic.

## Core User Flow (4 Steps)

### Step 1/4: Create an Agent
**Page: `/create`**
- **Header**: "Create an agent" with subtitle "Your agent's trading bio, visible to everyone. Begin building your agent by setting its identity, including a name, personality and strategy."
- **Form Fields**:
  - **Name**: Input field with placeholder "Display name for the agent and token"
  - **Ticker**: Input field with placeholder "Your agent's token $TICKER" (monospace font)
  - **Trading personality**: Large textarea with placeholder "Type your message here."
  - **Strategy funding slider**: 60% to LP, 40% to Stablecoins for Strategy with orange/purple gradient
- **Agent Preview Card**: 
  - Circular avatar placeholder with "+" icon
  - Name and $TICKER display (monospace for ticker)
  - "Your agent's trading bio, visible to everyone"
- **Navigation**: "Next" button to proceed to Step 2

### Step 2a/4: Agent Strategy (Risk & Base Strategy)
**Page: `/strategy`**
- **Header**: "Agent strategy" with subtitle "Only you can see and edit this strategy. Begin building your agent by setting its..."
- **Risk Appetite**: Three buttons - "Ape", "Middle" (selected/purple), "Safe"
- **Asset Type**: Pills for "memes", "altcoins" (selected/purple), "bluechips" with arrow for more
- **MCP Tools for Agent**: Pills for "Trendmoon", "Allora", "Gaia Quant", "Quill" with "+" button
- **Protocols**: Pills for "Ethereum", "Aave", "Euler"
- **Agent Strategy**: Large textarea with placeholder text and AI sparkle icon
- **Current agent portfolio**: Progress bar showing USDC (purple) and $AGENT LP (yellow) distribution

### Step 2b/4: Agent Strategy (Parameters & Servers)
**Page: `/strategy/advanced`**
- **Base strategy**: Pills for "mean reversion", "momentum scalper" (selected), "leveraged long", "yield farmer", "clmm manager"
- **Parameters section**:
  - **Watching**: "ETH/USDC" (monospace)
  - **RSI Period**: "14" (monospace)
  - **RSI Thresholds**: "70 / 30" (monospace)
  - **SL/TP**: "5% / 10%" (monospace)
- **Connected MCP servers**: Pills for "Ethereum", "Aave", "Euler" with arrow for more
- **Current agent portfolio**: Same progress bar as 2a

### Step 3/4: Vault Policies
**Page: `/vault`**
- **Header**: "Vault policies" with subtitle "Your agent's vault policies, visible to everyone."
- **Profit split slider**: 55% Reinvested, 45% Distribute with orange gradient
- **Profit Distribution token**: 
  - Radio options: "Stablecoins" (unchecked) and "Agent Token" (checked/purple)
  - Descriptions for each option
- **Vault access**:
  - "Locked" (selected): "Only the agent controls funds"
  - "Deployer": "You can add and remove funds"
- **Performance fees**: "15%" display

### Step 4/4: Deployment
**Page: `/deploy`**
- **Header**: "Deployment" with subtitle "Customize your token and vault launch"
- **Initial Token Buy**: "0.005 ETH" (monospace)
- **Funding Goal**: "10 ETH" (monospace) 
- **Large orange "Launch" button**

## Technical Requirements

### Design System
- **Color Palette**:
  - Background: Very dark gray/black (#0a0a0a, #1a1a1a)
  - Cards: Dark gray (#2a2a2a, #3a3a3a)
  - Primary accent: Purple/magenta (#a855f7, #d946ef)
  - Secondary accent: Orange (#f97316)
  - Text: White (#ffffff), Light gray (#a1a1aa)
- **Typography**:
  - Primary: Geist Sans
  - **Monospace**: Geist Mono for all technical elements (tickers, percentages, addresses, parameters)
  - Use `font-mono` class extensively for technical data
- **Components**: Use shadcn/ui components throughout

### Key UI Elements
- **Progress Steps**: Top navigation showing "Step X/4" with current step highlighted
- **Form Controls**:
  - Modern input fields with dark backgrounds
  - Custom sliders with gradient fills
  - Pill-style selection buttons
  - Toggle switches for radio options
- **Cards**: Rounded corners, subtle shadows, dark backgrounds
- **Buttons**: Rounded, with hover effects and proper focus states

### Pages Structure
```
/create          - Step 1: Agent creation form
/strategy        - Step 2a: Basic strategy settings
/strategy/advanced - Step 2b: Advanced parameters
/vault           - Step 3: Vault policies
/deploy          - Step 4: Deployment settings
/               - Landing page with "Create Agent" CTA
```

### State Management
- Use React Context or Zustand for form state persistence across steps
- Form validation with proper error states
- Progress saving between steps

### Responsive Design
- Mobile-first approach
- Collapsible navigation on mobile
- Adaptive layouts for tablets and desktop
- Touch-friendly controls

### Interactive Elements
- **Sliders**: Custom styled with gradient fills
- **Multi-select pills**: Toggle states with smooth animations
- **Progress indicators**: Visual feedback for completion
- **Hover effects**: Subtle animations on interactive elements
- **Form validation**: Real-time feedback with error states

### Technical Features
- **TypeScript**: Full type safety
- **Form handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icons
- **Wallet integration**: Placeholder for Web3 wallet connection

## Additional Requirements

### Landing Page
Create an attractive landing page with:
- Hero section explaining the agent launchpad concept
- "Create Your Agent" prominent CTA button
- Feature highlights with technical aesthetic
- Dark theme with purple accents

### Navigation
- Persistent header with logo and wallet connection
- Step indicator showing current progress
- Back/Next navigation between steps
- Save draft functionality

### Data Visualization
- Portfolio allocation charts (simple progress bars)
- Parameter displays with monospace formatting
- Real-time preview of agent configuration

### Accessibility
- Proper ARIA labels
- Keyboard navigation
- High contrast ratios
- Screen reader friendly

Build this as a modern, professional DeFi application with a strong technical aesthetic achieved through extensive use of monospace fonts, dark theme, and purple/orange accent colors. Focus on creating an intuitive multi-step flow that guides users through the complex process of creating and deploying an AI trading agent.
