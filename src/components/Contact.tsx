import { useState } from "react";
import { CalendarCheck, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import BookingForm from "@/components/BookingForm";
import { useReveal } from "@/hooks/useReveal";

type Tab = "message" | "booking";

const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
  { id: "message", label: "Send a message", icon: MessageSquare },
  { id: "booking", label: "Book a call", icon: CalendarCheck },
];

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [tab, setTab] = useState<Tab>("message");

  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-36">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-3xl ${visible ? "is-visible" : ""}`}
      >
        <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#161513] sm:text-5xl md:text-6xl">
          Let's work together
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#4b4944] md:text-[15px]">
          Send me a message about your project, or pick a date and time for a
          call. I'll reply by email.
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Contact options"
          className="mt-10 inline-flex rounded-full border border-[#e6e3dd] bg-[#ffffff] p-1"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={active}
                aria-controls={`panel-${id}`}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#161513] text-[#f7f6f3]"
                    : "text-[#4b4944] hover:text-[#161513]"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Both forms stay mounted so typed text isn't lost when switching tabs */}
        <div className="mt-6">
          <div
            role="tabpanel"
            id="panel-message"
            aria-labelledby="tab-message"
            className={tab === "message" ? "" : "hidden"}
          >
            <ContactForm />
          </div>
          <div
            role="tabpanel"
            id="panel-booking"
            aria-labelledby="tab-booking"
            className={tab === "booking" ? "" : "hidden"}
          >
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
