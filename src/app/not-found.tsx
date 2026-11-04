import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-5xl font-bold">404</p>
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        This QR type doesn&apos;t exist. Pick one from the home page.
      </p>
      <Link href="/" className={buttonVariants()}>
        Back to home
      </Link>
    </div>
  );
}