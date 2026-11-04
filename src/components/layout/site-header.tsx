import Link from "next/link";
import { QrCode } from "lucide-react";
import { ThemeToggle } from "@/components/common/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <QrCode className="size-5" />
          QR Studio
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/history"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            History
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}