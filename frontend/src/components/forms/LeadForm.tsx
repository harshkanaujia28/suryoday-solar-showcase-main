import { useState } from "react";
import { toast } from "sonner";
import { STATES } from "@/data/content";

type Field =
  | "name"
  | "phone"
  | "email"
  | "city"
  | "state"
  | "bill"
  | "message";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export function LeadForm({
  fields = ["name", "phone", "email", "city", "bill"],
  cta = "Get Free Proposal",
  variant = "card",
  source = "generic",
}: {
  fields?: Field[];
  cta?: string;
  variant?: "card" | "inline" | "dark";
  source?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const payload = {
      name: String(data.name || "").trim(),
      phone: String(data.phone || "").trim(),
      email: String(data.email || "").trim(),
      city: String(data.city || "").trim(),
      state: String(data.state || "").trim(),
      bill: String(data.bill || "").trim(),
      message: String(data.message || "").trim(),
      source,
    };

    // Frontend validation
    if (!payload.name || !payload.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(payload.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      payload.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
    ) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your enquiry. Please try again."
        );
      }

      toast.success(
        result.message ||
          "Thank you! Our solar expert will call you within 30 minutes."
      );

      form.reset();
    } catch (error) {
      console.error("Lead submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    variant === "dark"
      ? "w-full min-w-0 min-h-[48px] rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-base sm:text-sm text-white placeholder:text-white/60 outline-none focus:border-[var(--color-solar-yellow)] focus:ring-2 focus:ring-[var(--color-solar-yellow)]/20 transition"
      : "w-full min-w-0 min-h-[48px] rounded-xl border border-border bg-background px-4 py-3 text-base sm:text-sm text-foreground outline-none focus:border-[var(--color-solar-yellow)] focus:ring-2 focus:ring-[var(--color-solar-yellow)]/15 transition";

  return (
    <form
      onSubmit={handle}
      className={`w-full min-w-0 ${
        variant === "card"
          ? "rounded-2xl sm:rounded-3xl border border-white/10 bg-card p-4 sm:p-6 lg:p-7 shadow-premium"
          : variant === "dark"
          ? "rounded-2xl sm:rounded-3xl glass-dark p-4 sm:p-6 lg:p-7"
          : ""
      }`}
    >
      {variant === "card" && (
        <div className="mb-5 sm:mb-6">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-solar-yellow/10 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-solar-yellow">
            ⚡ Free Site Visit · No Obligation
          </div>

          <h3 className="mt-3 font-display text-xl font-bold leading-tight sm:text-2xl">
            Get Your Free Solar Proposal
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Compare savings, subsidy and ROI in 24 hours.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {fields.includes("name") && (
          <input
            name="name"
            required
            maxLength={100}
            placeholder="Full Name"
            autoComplete="name"
            className={`${inputClass} sm:col-span-2`}
          />
        )}

        {fields.includes("phone") && (
          <input
            name="phone"
            required
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            placeholder="10-digit Phone"
            className={inputClass}
          />
        )}

        {fields.includes("email") && (
          <input
            name="email"
            type="email"
            maxLength={254}
            autoComplete="email"
            placeholder="Email Address"
            className={inputClass}
          />
        )}

        {fields.includes("city") && (
          <input
            name="city"
            required
            maxLength={100}
            placeholder="City"
            autoComplete="address-level2"
            className={inputClass}
          />
        )}

        {fields.includes("state") && (
          <select
            name="state"
            required
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select State
            </option>

            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        {fields.includes("bill") && (
          <select
            name="bill"
            required
            className={`${inputClass} ${
              fields.includes("city") ? "" : "sm:col-span-2"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Monthly Electricity Bill
            </option>
            <option>₹1,000 – ₹2,500</option>
            <option>₹2,500 – ₹5,000</option>
            <option>₹5,000 – ₹10,000</option>
            <option>₹10,000 – ₹25,000</option>
            <option>₹25,000+</option>
          </select>
        )}

        {fields.includes("message") && (
          <textarea
            name="message"
            rows={3}
            maxLength={2000}
            placeholder="Tell us about your needs..."
            className={`${inputClass} min-h-[100px] resize-y sm:col-span-2`}
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 sm:mt-5 min-h-[48px] w-full rounded-full gradient-sunrise px-5 sm:px-6 py-3.5 text-sm font-bold text-white shadow-premium transition-all hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : cta + " →"}
      </button>

      <p
        className={`mt-3 text-center text-[10px] leading-relaxed sm:text-[11px] ${
          variant === "dark"
            ? "text-white/70"
            : "text-muted-foreground"
        }`}
      >
        🔒 100% safe. We never share your details.
      </p>
    </form>
  );
}