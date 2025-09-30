import { Button } from "@/components/ui/button"
import { BsGithub, BsTwitterX } from "react-icons/bs"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <a
            href="/"
            className="flex items-center gap-x-2"
            aria-label="Agent Launchpad"
          >
            <Image src={"/logo-white.png"}
              alt=""
              width={150}
              height={150}
            />
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {[
              {
                icon: <BsGithub className="h-5 w-5" />,
                href: "https://github.com",
                label: "GitHub",
              },
              {
                icon: <BsTwitterX className="h-5 w-5" />,
                href: "https://twitter.com",
                label: "Twitter",
              },
            ].map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {[
                { href: "/create", label: "Create Agent" },
                { href: "/", label: "Marketplace" },
                { href: "/analytics", label: "Analytics" },
                { href: "/docs", label: "Documentation" },
              ].map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>© 2024 Agent Launchpad</div>
            <div>Built for the future of autonomous trading</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
