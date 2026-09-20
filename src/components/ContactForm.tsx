import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { site } from "@/data/site";

type Status = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailRegex.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please enter your message.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMsg("");

    const result = await submitToWeb3Forms(form);

    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#e6e3dd] bg-[#ffffff] p-8 text-center md:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#161513]/5">
          <CheckCircle2 size={28} className="text-[#161513]" />
        </div>
        <h3 className="text-2xl font-serif text-[#161513]">Message sent</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#4b4944]">
          Thank you for reaching out. I'll get back to you at the email you
          provided as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 inline-flex items-center justify-center rounded-full border border-[#161513] px-6 py-2.5 text-sm font-medium text-[#161513] transition-colors hover:bg-[#161513] hover:text-[#f7f6f3]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[#e6e3dd] bg-[#ffffff] p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          id="name"
          value={form.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          label="Email"
          id="email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="mt-5">
        <Field
          label="Subject"
          id="subject"
          value={form.subject}
          onChange={(v) => update("subject", v)}
          error={errors.subject}
          placeholder="What's this about?"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-[#161513]"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell me about your project or inquiry..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full resize-none rounded-lg border bg-[#f7f6f3] px-4 py-3 text-sm text-[#161513] transition-colors placeholder:text-[#8a8780] focus:outline-none focus:ring-2 focus:ring-[#161513]/15 ${
            errors.message ? "border-[#b8552f]" : "border-[#e6e3dd]"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-[#b8552f]">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          className="mt-5 flex items-start gap-3 rounded-lg border border-[#b8552f]/30 bg-[#b8552f]/5 px-4 py-3"
          role="alert"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#b8552f]" />
          <p className="text-sm text-[#b8552f]">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#161513] px-7 py-3.5 text-sm font-medium text-[#f7f6f3] transition-all duration-300 hover:gap-3 hover:bg-[#000] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-[#8a8780]">
        Your message goes directly to{" "}
        <a
          href={`mailto:${site.email}`}
          className="underline underline-offset-2 hover:text-[#161513]"
        >
          {site.email}
        </a>
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-[#161513]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg border bg-[#f7f6f3] px-4 py-3 text-sm text-[#161513] transition-colors placeholder:text-[#8a8780] focus:outline-none focus:ring-2 focus:ring-[#161513]/15 ${
          error ? "border-[#b8552f]" : "border-[#e6e3dd]"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[#b8552f]">
          {error}
        </p>
      )}
    </div>
  );
}
