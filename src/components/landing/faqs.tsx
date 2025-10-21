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
    id: "what-is-bonding-curve",
    question: "What is a bonding curve?",
    answer: "A bonding curve is a smart contract that automatically prices tokens based on supply and demand. As more tokens are minted, the price increases along a predetermined curve, creating transparent and predictable pricing for funding your onchain strategies."
  },
  {
    id: "how-to-deploy",
    question: "How do I deploy a bonding curve?",
    answer: "Deploying is simple: configure your token parameters, set your bonding curve formula (reserve ratio, initial supply), define vault settings for fund management, and deploy on-chain. Our step-by-step wizard guides you through the entire process."
  },
  {
    id: "security",
    question: "How secure are bonding curves?",
    answer: "All bonding curves run on transparent smart contracts with audited code. Funds are managed through secure vault mechanisms, and token holders have proportional ownership rights. The pricing formula is immutable and verifiable on-chain."
  },
  {
    id: "funding-strategies",
    question: "What can I use bonding curves to fund?",
    answer: "Bonding curves can fund any onchain strategy or protocol. Common uses include DeFi protocols, trading strategies, DAOs, public goods funding, or any project requiring transparent, community-driven capital formation."
  },
  {
    id: "curve-parameters",
    question: "What parameters can I customize?",
    answer: "You can customize token name and symbol, initial supply, maximum supply, reserve ratios for buying and selling, vault configurations, and fee structures. Each parameter affects how your bonding curve behaves and funds your strategy."
  },
  {
    id: "performance-monitoring",
    question: "How can I monitor my bonding curve?",
    answer: "Real-time dashboards show token price, market cap, trading volume, holder distribution, and fund flows. You can track all transactions, view price charts, and analyze your bonding curve's performance through detailed analytics."
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
            Everything you need to know about bonding curves and strategy funding
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
