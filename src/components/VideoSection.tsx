import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((error) => {
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
    <section className="relative w-full overflow-hidden bg-[#003D35] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">

      <div className="mx-auto w-full max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-10"
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-solar-yellow)]">
            Suryoday Solar Energy
          </span>

          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            हर घर बनेगा <span className="text-[var(--color-solar-yellow)]">सोलर घर</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
            A step towards a brighter future with clean energy,
            reliable solar solutions and greater electricity savings.
          </p>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl sm:rounded-2xl"
        >
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
        </motion.div>

      </div>
    </section>
  );
}