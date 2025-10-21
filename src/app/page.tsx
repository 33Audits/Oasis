import { Footer } from "@/components/ui/footer";
import AgentsTable from "@/components/agents/agents-table";
import Hero from "@/components/landing/hero";
import FAQs from "@/components/landing/faqs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      {/* Bonding Curves Table Section */}
      <section id="bonding-curves" className="py-12 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl">Active Bonding Curves</h2>
            <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
              Explore live bonding curves funding onchain strategies
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto">
            <AgentsTable />
          </div>
        </div>
      </section>

      <FAQs />

      <Footer />
    </div>
  );
}
