import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function HomePage() {
  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">SeeMeBetter</div>
        <ModeToggle />
      </div>
      <div className="mt-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Collect anonymous feedback with a single link.
        </h1>
        <p className="mt-3 text-mutedForeground">
          Share your public link and let anyone answer a dynamic set of questions about you.
        </p>
        <div className="mt-6 flex gap-3">
          <Link className={buttonClassName("primary")} href="/feedback">
            Open feedback form
          </Link>
          <Link className={buttonClassName("secondary")} href="/thank-you">
            Thank you page
          </Link>
        </div>
      </div>
    </Container>
  );
}
