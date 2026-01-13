import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { techIcons } from "./TechIcons";

const filters = ["All", "Frontend", "Backend", "DevOps"];

function TechItem({ tech, index, scrollYProgress, isAll }) {
  const TechIcon = techIcons[tech.iconName];

  // Pola offset dibuat lebih variatif
  const offsetsAll = [0, 16, 32, 48, 24, 8];
  const offsetsFiltered = [0, 18, 36, 56];

  const offsets = isAll ? offsetsAll : offsetsFiltered;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, offsets[index % offsets.length]]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      style={{ y }}
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 40px rgba(99,102,241,0.35)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="mb-8 break-inside-avoid cursor-pointer"
    >
      <div className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 ${tech.color}`}>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-black/40">
            {TechIcon && <TechIcon className="w-7 h-7" />}
          </div>
          <div>
            <h4 className="font-semibold">{tech.name}</h4>
            <p className="text-xs text-gray-400 uppercase">{tech.type}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack({ title, tools }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef(null);

  const filteredTools =
    activeFilter === "All"
      ? tools
      : tools.filter(
          (t) => t.category?.toLowerCase() === activeFilter.toLowerCase()
        );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="w-full py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <div className="h-1 w-20 rounded-full bg-indigo-500" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                ${
                  activeFilter === filter
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTools.map((tech, index) => (
            <TechItem
                key={tech.id}
                tech={tech}
                index={index}
                scrollYProgress={scrollYProgress}
                isAll={activeFilter === "All"}
            />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
