"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "what-are-ai-agents",
    question: "What are AI Trading Agents?",
    answer: "AI Trading Agents are autonomous programs that execute trading strategies on your behalf. They can analyze market data, make trading decisions, and manage risk according to your predefined parameters."
  },
  {
    id: "how-to-create",
    question: "How do I create my own trading agent?",
    answer: "Creating an agent is simple: choose from pre-built strategies, customize parameters like risk tolerance and trading pairs, configure your vault settings, and deploy on-chain. Our step-by-step wizard guides you through the entire process."
  },
  {
    id: "security",
    question: "How secure are the trading agents?",
    answer: "All agents run on-chain with transparent smart contracts. Your funds remain in your control through tokenized ownership, and agents can only execute trades within your predefined risk parameters."
  },
  {
    id: "custom-strategies",
    question: "Can I create custom trading strategies?",
    answer: "Yes! Advanced users can deploy custom strategies through our developer tools. We provide templates, documentation, and support for creating sophisticated trading algorithms."
  },
  {
    id: "risk-management",
    question: "What risk management features are available?",
    answer: "Built-in stop-loss orders, position size limits, maximum drawdown controls, and portfolio diversification rules. You can customize all risk parameters before deployment."
  },
  {
    id: "performance-monitoring",
    question: "How can I monitor my agent's performance?",
    answer: "Real-time dashboards show trading activity, P&L, risk metrics, and strategy effectiveness. You can pause, modify, or terminate agents at any time through the interface."
  }
];

export default function FAQs() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faqs" className=" pt-12 pb-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-normal">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Everything you need to know about AI trading agents
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => {
            const isOpen = openItems.has(faq.id);
            return (
              <Card
                key={faq.id}
                className="bg-card/50 border-white/10 hover:bg-card/70 transition-colors cursor-pointer"
                onClick={() => toggleItem(faq.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-left text-lg font-medium text-white pr-4">
                      {faq.question}
                    </CardTitle>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-white/60" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-white/60" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {isOpen && (
                  <CardContent className="pt-0">
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
