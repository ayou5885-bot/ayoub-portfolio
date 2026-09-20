import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f7f6f3]/85 backdrop-blur-xl border-b border-[#e6e3dd]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight text-[#161513]"
          onClick={() => setOpen(false)}
        >
          {site.shortTitle}
          <span className="text-[#b8552f]">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-[#4b4944] transition-colors hover:text-[#161513]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#161513] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${site.email}`}
          className="hidden rounded-full border border-[#161513] px-5 py-2 text-sm font-medium text-[#161513] transition-all duration-300 hover:bg-[#161513] hover:text-[#f7f6f3] md:inline-block"
        >
          Get in touch
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#161513] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 top-16 z-40 bg-[#f7f6f3] transition-all duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 px-6 pt-10">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#e6e3dd] py-5 text-2xl font-serif text-[#161513] transition-all"
                style={{
                  transitionDelay: open ? `${i * 60}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  opacity: open ? 1 : 0,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="mt-8 inline-block rounded-full border border-[#161513] px-5 py-3 text-center text-sm font-medium text-[#161513]"
            >
              {site.email}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
