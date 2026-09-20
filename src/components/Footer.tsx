import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#e6e3dd] px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight text-[#161513]"
        >
          {site.title}
        </a>

        <a
          href={`mailto:${site.email}`}
          className="text-sm text-[#4b4944] underline underline-offset-4 transition-colors hover:text-[#161513]"
        >
          {site.email}
        </a>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 text-sm text-[#8a8780] transition-colors hover:text-[#161513]"
          aria-label="Back to top"
        >
          Back to top
          <ArrowUp
            size={14}
            className="transition-transform group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
