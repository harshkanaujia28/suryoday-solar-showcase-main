import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Sun, ShieldCheck } from "lucide-react";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((error: unknown) => {
            console.warn("Video autoplay prevented:", error);
          });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F0F7F2] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#0D9560]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#FDBA24]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0D9560]/15 bg-white px-4 py-2 shadow-sm">
            <Sun className="h-4 w-4 text-[#F36B21]" />

            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#075B3D] sm:text-sm">
              Suryoday Solar Energy
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[#06452F] sm:text-4xl lg:text-5xl">
            हर घर बनेगा{" "}
            <span className="bg-gradient-to-r from-[#0D9560] to-[#38A169] bg-clip-text text-transparent">
              सोलर घर
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#64786C] sm:text-base lg:text-lg">
            A step towards a brighter future with clean energy,
            reliable solar solutions and greater electricity savings.
          </p>

          {/* Trust Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#075B3D]">
              <ShieldCheck className="h-4 w-4 text-[#0D9560]" />
              Clean Energy
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-[#075B3D]">
              <Sun className="h-4 w-4 text-[#F36B21]" />
              Solar Solutions
            </div>
          </div>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-6xl"
        >
          {/* Video Frame */}
          <div className="relative overflow-hidden rounded-2xl border border-[#075B3D]/10 bg-[#06452F] p-1.5 shadow-[0_25px_70px_rgba(6,69,47,0.16)] sm:rounded-3xl sm:p-2">

            <div className="overflow-hidden rounded-xl bg-black sm:rounded-2xl">
              <video
                ref={videoRef}
                controls
                muted
                playsInline
                preload="metadata"
                className="block aspect-video h-auto w-full object-contain"
                aria-label="Suryoday Solar Energy installation video"
              >
                <source
                  src="/videos/suryoday-solar-video.mp4"
                  type="video/mp4"
                />

                Your browser does not support video playback.
              </video>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-[#075B3D]">
            <PlayCircle className="h-4 w-4 text-[#F36B21]" />
            Discover the power of solar energy
          </div>
        </motion.div>

      </div>
    </section>
  );
}