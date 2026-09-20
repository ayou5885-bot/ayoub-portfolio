import { useState, type FormEvent } from "react";
import { AlertCircle, CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { services } from "@/data/services";
import { site } from "@/data/site";

type Status = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

// Today's date in the visitor's local timezone, formatted YYYY-MM-DD.
const todayLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const inputBase =
  "w-full rounded-lg border bg-[#f7f6f3] px-4 py-3 text-sm text-[#161513] transition-colors placeholder:text-[#8a8780] focus:outline-none focus:ring-2 focus:ring-[#161513]/15";

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState(emptyForm);

  const update = (key: keyof typeof emptyForm, value: string) => {
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
    if (!form.service) next.service = "Please choose what you need.";
    if (!form.date) next.date = "Please choose a date.";
    else if (form.date < todayLocal())
      next.date = "Please choose today or a future date.";
    if (!form.time) next.time = "Please choose a time.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMsg("");

    const result = await submitToWeb3Forms({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      date: form.date,
      time: form.time,
      subject: `New booking request: ${form.service}`,
      message: form.notes.trim() || "No additional notes.",
    });

    if (result.success) {
      setStatus("success");
      setForm(emptyForm);
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
        <h3 className="text-2xl font-serif text-[#161513]">
          Booking request sent
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#4b4944]">
          Thank you. I'll confirm the date and time by email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 inline-flex items-center justify-center rounded-full border border-[#161513] px-6 py-2.5 text-sm font-medium text-[#161513] transition-colors hover:bg-[#161513] hover:text-[#f7f6f3]"
        >
          Book another call
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
          id="booking-name"
          value={form.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          label="Email"
          id="booking-email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Phone (optional)"
          id="booking-phone"
          type="tel"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          placeholder="Your phone number"
          autoComplete="tel"
        />
        <div>
          <label
            htmlFor="booking-service"
            className="mb-2 block text-sm font-medium text-[#161513]"
          >
            What do you need?
          </label>
          <select
            id="booking-service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "booking-service-error" : undefined}
            className={`${inputBase} ${
              errors.service ? "border-[#b8552f]" : "border-[#e6e3dd]"
            } ${form.service ? "" : "text-[#8a8780]"}`}
          >
            <option value="">Choose one</option>
            {services.map((s) => (
              <option key={s} value={s} className="text-[#161513]">
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="booking-service-error" className="mt-1.5 text-xs text-[#b8552f]">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Preferred date"
          id="booking-date"
          type="date"
          min={todayLocal()}
          value={form.date}
          onChange={(v) => update("date", v)}
          error={errors.date}
        />
        <Field
          label="Preferred time"
          id="booking-time"
          type="time"
          value={form.time}
          onChange={(v) => update("time", v)}
          error={errors.time}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="booking-notes"
          className="mb-2 block text-sm font-medium text-[#161513]"
        >
          Notes (optional)
        </label>
        <textarea
          id="booking-notes"
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Anything I should know before the call?"
          className={`${inputBase} resize-none border-[#e6e3dd]`}
        />
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
            <CalendarCheck size={15} />
            Request booking
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-[#8a8780]">
        Your request goes directly to{" "}
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
  min?: string;
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
  min,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#161513]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputBase} ${
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
