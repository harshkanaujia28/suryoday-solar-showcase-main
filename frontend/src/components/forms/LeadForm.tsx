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

export function LeadForm({
  fields = ["name", "phone", "city", "bill"],
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

  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setTimeout(() => {
      const leads = JSON.parse(
        localStorage.getItem("suryoday_leads") || "[]"
      );

      leads.push({
        ...data,
        source,
        at: new Date().toISOString(),
      });

      localStorage.setItem("suryoday_leads", JSON.stringify(leads));

      toast.success(
        "Thank you! Our solar expert will call you within 30 minutes."
      );

      form.reset();
      setLoading(false);
    }, 600);
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
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="10-digit Phone"
            className={inputClass}
          />
        )}

        {fields.includes("email") && (
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            className={inputClass}
          />
        )}

        {fields.includes("city") && (
          <input
            name="city"
            required
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
            placeholder="Tell us about your needs..."
            className={`${inputClass} min-h-[100px] resize-y sm:col-span-2`}
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 sm:mt-5 min-h-[48px] w-full rounded-full gradient-sunrise px-5 sm:px-6 py-3.5 text-sm font-bold text-white shadow-premium transition-all hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
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