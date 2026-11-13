import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

export function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    const unsub = mv.on("change", (v) => setVal(Math.round(v)));
    return () => { controls.stop(); unsub(); };
  }, [inView, to, duration, mv]);

  return <span ref={ref}>{val.toLocaleString("en-IN")}{suffix}</span>;
}
