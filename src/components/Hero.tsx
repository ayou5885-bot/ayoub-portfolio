import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 md:px-10"
    >
      {/* Faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#161513 1px, transparent 1px), linear-gradient(90deg, #161513 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="reveal is-visible">
          <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[#8a8780]">
            <span className="inline-block h-px w-10 bg-[#8a8780]" />
            Web Developer Portfolio
          </p>

          <h1 className="text-balance text-5xl font-serif leading-[0.95] tracking-tight text-[#161513] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            {site.heroHeadline}
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#4b4944] sm:text-lg md:text-xl">
            {site.heroSubtext}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#161513] px-7 py-3.5 text-sm font-medium text-[#f7f6f3] transition-all duration-300 hover:gap-3 hover:bg-[#000]"
            >
              {site.heroPrimaryCta}
              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#161513] px-7 py-3.5 text-sm font-medium text-[#161513] transition-all duration-300 hover:gap-3 hover:bg-[#161513] hover:text-[#f7f6f3]"
            >
              {site.heroSecondaryCta}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
          Scroll
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-[#8a8780] to-transparent" />
      </div>
    </section>
  );
}
