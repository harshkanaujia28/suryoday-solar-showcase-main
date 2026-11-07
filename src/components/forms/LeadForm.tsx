import { useState } from "react";
import { toast } from "sonner";
import { STATES } from "@/data/content";

type Field = "name" | "phone" | "email" | "city" | "state" | "bill" | "message";

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
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setTimeout(() => {
      const leads = JSON.parse(localStorage.getItem("suryoday_leads") || "[]");
      leads.push({ ...data, source, at: new Date().toISOString() });
      localStorage.setItem("suryoday_leads", JSON.stringify(leads));
      toast.success("Thank you! Our solar expert will call you within 30 minutes.");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
    }, 600);
  }

  const inputClass =
    variant === "dark"
      ? "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none focus:border-[var(--color-solar-yellow)] transition"
      : "w-full rounded-xl border border-white/15 bg-background px-4 py-3 text-sm outline-none focus:border-[var(--color-solar-yellow)] focus:ring-2 focus:ring-[var(--color-solar-yellow)]/15 transition";

  return (
    <form
      onSubmit={handle}
      className={
        variant === "card"
          ? "rounded-3xl border border-white/10 bg-card p-6 shadow-premium sm:p-7"
          : variant === "dark"
          ? "rounded-3xl glass-dark p-6 sm:p-7"
          : ""
      }
    >
      {variant === "card" && (
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-solar-yellow/10 px-3 py-1 text-xs font-semibold text-solar-yellow">
            ⚡ Free Site Visit · No Obligation
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold">Get Your Free Solar Proposal</h3>
          <p className="text-sm text-muted-foreground">Compare savings, subsidy and ROI in 24 hours.</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.includes("name") && (
          <input name="name" required placeholder="Full Name" className={`${inputClass} sm:col-span-2`} />
        )}
        {fields.includes("phone") && (
          <input name="phone" required type="tel" pattern="[0-9]{10}" placeholder="10-digit Phone" className={inputClass} />
        )}
        {fields.includes("email") && (
          <input name="email" type="email" placeholder="Email Address" className={inputClass} />
        )}
        {fields.includes("city") && (
          <input name="city" required placeholder="City" className={inputClass} />
        )}
        {fields.includes("state") && (
          <select name="state" required className={inputClass} defaultValue="">
            <option value="" disabled>Select State</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
        {fields.includes("bill") && (
          <select name="bill" required className={`${inputClass} ${fields.includes("city") ? "" : "sm:col-span-2"}`} defaultValue="">
            <option value="" disabled>Monthly Electricity Bill</option>
            <option>₹1,000 – ₹2,500</option>
            <option>₹2,500 – ₹5,000</option>
            <option>₹5,000 – ₹10,000</option>
            <option>₹10,000 – ₹25,000</option>
            <option>₹25,000+</option>
          </select>
        )}
        {fields.includes("message") && (
          <textarea name="message" rows={3} placeholder="Tell us about your needs..." className={`${inputClass} sm:col-span-2`} />
        )}
      </div>

      <button
        disabled={loading}
        className="mt-4 w-full rounded-full gradient-sunrise px-6 py-3.5 text-sm font-bold text-white shadow-premium transition-all hover:shadow-glow hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Sending..." : cta + " →"}
      </button>
      <p className={`mt-3 text-center text-[11px] ${variant === "dark" ? "text-white/70" : "text-muted-foreground"}`}>
        🔒 100% safe. We never share your details.
      </p>
    </form>
  );
}
