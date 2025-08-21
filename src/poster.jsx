import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Day 2 – DSA Interactive Poster
 * Host on GitHub Pages by dropping this component into a Vite/CRA app.
 * TailwindCSS recommended. All styling uses utility classes.
 * Timezone: uses user's local time (IST for you) for countdowns.
 */

// ---- Config you can tweak daily ---- //
const CONFIG = {
  day: 2,
  title: "DSA Challenge",
  problemTitle: "Min and Max in Array",
  taskLines: [
    "Given an array arr, find the minimum and maximum elements.",
    "Return them as a Pair:",
    "First → Minimum",
    "Second → Maximum",
  ],
  examples: [
    {
      input: [3, 2, 1, 56, 10000, 167],
      output: [1, 10000],
    },
    {
      input: [1, 345, 234, 21, 56789],
      output: [1, 56789],
    },
    {
      input: [56789],
      output: [56789, 56789],
    },
  ],
  deadlineToday: { hour: 18, minute: 0 }, // 6:00 PM
  explainerToday: { hour: 20, minute: 0 }, // 8:00 PM
  quote:
    "Consistency is the key — one problem a day takes you a step closer to mastery.",
};

// ---- Helpers ---- //
function timeUntilToday({ hour, minute }) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  const diff = target.getTime() - now.getTime();
  return diff > 0 ? diff : 0; // 0 if already passed
}

function useCountdown(msInitial) {
  const [msLeft, setMsLeft] = useState(msInitial);
  useEffect(() => {
    const id = setInterval(() => {
      setMsLeft((prev) => (prev > 1000 ? prev - 1000 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const hrs = Math.floor(msLeft / (1000 * 60 * 60));
  const mins = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((msLeft % (1000 * 60)) / 1000);
  return { hrs, mins, secs, msLeft };
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#1782db]/15 px-3 py-1 text-xs font-medium text-[#3c8fe1] ring-1 ring-inset ring-[#1782db]/30">
      {children}
    </span>
  );
}

const ExampleCard = ({ input, output }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="group rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:ring-[#3498db]/50 transition shadow-sm backdrop-blur"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-white/70">Input</div>
          <div className="font-mono text-white">[{input.join(", ")}]</div>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl px-3 py-1.5 text-sm font-semibold bg-[#3498db] text-white hover:bg-[#1782db] shadow"
        >
          {open ? "Hide Output" : "Reveal Output"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 border-t border-white/10 pt-3"
          >
            <div className="text-sm text-white/70">Output</div>
            <div className="font-mono text-[#3c8fe1]">{output[0]} {output[1]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Countdown = ({ label, targetHM }) => {
  const initial = useMemo(() => timeUntilToday(targetHM), [targetHM]);
  const { hrs, mins, secs, msLeft } = useCountdown(initial);
  const reached = msLeft === 0;
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <Pill>{label}</Pill>
      {reached ? (
        <span className="text-sm text-white">Started / Closed</span>
      ) : (
        <div className="flex gap-2 font-mono text-white">
          <span className="rounded-lg bg-black/40 px-2 py-1">{String(hrs).padStart(2, "0")}</span>
          :
          <span className="rounded-lg bg-black/40 px-2 py-1">{String(mins).padStart(2, "0")}</span>
          :
          <span className="rounded-lg bg-black/40 px-2 py-1">{String(secs).padStart(2, "0")}</span>
        </div>
      )}
    </div>
  );
};

export default function DSAPoster() {
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🚀 Day ${CONFIG.day} – ${CONFIG.title}\nProblem: ${
    CONFIG.problemTitle
  }\nDeadline: Today 6:00 PM\nJoin explainer at 8:00 PM!`;

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-white">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#3498db] blur-3xl opacity-20" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#1782db] blur-3xl opacity-20" />

      <main className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <motion.h1
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          >
            <span className="text-[#3c8fe1]">🚀 Day {CONFIG.day}</span> – {CONFIG.title}
          </motion.h1>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setDone((v) => !v)}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold shadow ring-1 ring-white/10 ${
              done ? "bg-emerald-500 text-black" : "bg-white/5 text-white hover:bg-white/10"
            }`}
            title="Mark challenge as done"
          >
            {done ? "✅ Marked Done" : "Mark as Done"}
          </motion.button>
        </div>

        {/* Problem Block */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="mb-2 text-xl font-semibold text-[#3c8fe1]">
            Problem: {CONFIG.problemTitle}
          </h2>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-white/90">
            {CONFIG.taskLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          {/* Examples */}
          <div className="grid gap-3 sm:grid-cols-2">
            {CONFIG.examples.map((ex, i) => (
              <ExampleCard key={i} input={ex.input} output={ex.output} />)
            )}
          </div>
        </section>

        {/* Timers */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Countdown label="⏳ Deadline – Today 6:00 PM" targetHM={CONFIG.deadlineToday} />
          <Countdown label="📖 Explanation – Today 8:00 PM" targetHM={CONFIG.explainerToday} />
        </div>

        {/* Quote + Share */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl rounded-2xl border border-white/10 bg-black/40 p-4 text-white/90"
          >
            <div className="mb-1 text-sm text-white/70">✨ Motivational Quote</div>
            <p className="text-base italic">“{CONFIG.quote}”</p>
          </motion.blockquote>

          <div className="flex items-center gap-3">
            <button
              onClick={copyShare}
              className="rounded-2xl bg-[#3498db] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#1782db]"
            >
              {copied ? "Copied!" : "Share Challenge"}
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
              title="Tip: Edit CONFIG at the top to reuse this poster for Day 3, 4, ..."
            >
              How to use
            </a>
          </div>
        </div>

        {/* Footer mini-help */}
        <p className="mt-4 text-xs text-white/60">
          Tip: Edit the <code>CONFIG</code> at the top for future days. You can also paste this
          component into any React app and deploy with GitHub Pages.
        </p>
      </main>
    </div>
  );
}
