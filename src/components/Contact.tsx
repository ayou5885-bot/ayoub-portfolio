import { Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 ${
            visible ? "is-visible" : ""
          } reveal`}
        >
          {/* Left: heading + email */}
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[#8a8780]">
              <span className="inline-block h-px w-10 bg-[#8a8780]" />
              Contact
            </p>
            <h2 className="text-4xl font-serif leading-tight tracking-tight text-[#161513] sm:text-5xl md:text-6xl">
              Let's start a
              <br />
              conversation
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#4b4944]">
              Have a project in mind or a question about my work? Send a message
              and I'll get back to you.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="group mt-10 inline-flex items-center gap-3 text-lg font-medium text-[#161513] md:text-xl"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#161513]/5 transition-colors group-hover:bg-[#161513] group-hover:text-[#f7f6f3]">
                <Mail size={18} />
              </span>
              <span className="border-b border-[#161513]/20 pb-0.5 transition-colors group-hover:border-[#161513]">
                {site.email}
              </span>
              <ArrowUpRight
                size={18}
                className="text-[#8a8780] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#161513]"
              />
            </a>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
