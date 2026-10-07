import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Activity } from "lucide-react";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return { count, ref };
}

function StatCard({ icon: Icon, value, label, suffix = "" }: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#2a6ff3]" />
        </div>
        <div>
          {/* The invisible final value reserves the width, so the card never
              changes size while counting up (that resize made scrolling stutter). */}
          <p className="relative text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
            <span className="invisible" aria-hidden="true">{value}{suffix}</span>
            <span className="absolute inset-0">{count}{suffix}</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ChartBar({ height, delay, label }: { height: number; delay: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
        className="w-full bg-gradient-to-t from-[#2a6ff3] to-[#6c9dff] rounded-t-lg min-h-[20px]"
        style={{ maxHeight: height }}
      />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export function AnalyticsSection() {
  const chartData = [
    { height: 60, label: "Jan" },
    { height: 80, label: "Feb" },
    { height: 45, label: "Mar" },
    { height: 90, label: "Apr" },
    { height: 70, label: "May" },
    { height: 100, label: "Jun" },
    { height: 85, label: "Jul" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#2a6ff3] text-sm font-medium mb-4">
              Analytics
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Track Every Message, Campaign, and Conversion
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Get complete visibility into your outreach performance. Analyze response rates, monitor warmups, and adjust strategies instantly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={Users} value={900} label="Active Accounts" suffix="+" />
              <StatCard icon={TrendingUp} value={320} label="Avg. Growth Rate" suffix="%" />
              <StatCard icon={Activity} value={24} label="Smart Monitoring" suffix="/7" />
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-5 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900">Monthly Growth</h3>
                  <p className="text-sm text-gray-500">Jan 13, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#2a6ff3]" />
                  <span className="text-sm text-gray-600">Followers</span>
                </div>
              </div>

              <div className="h-40 sm:h-48 flex items-end gap-2 sm:gap-3 mb-6">
                {chartData.map((data, index) => (
                  <ChartBar key={index} height={data.height * 1.5} delay={index * 0.1} label={data.label} />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div><p className="text-xl sm:text-2xl font-bold text-gray-900">10K</p><p className="text-xs text-gray-500">Followers Targeted</p></div>
                <div><p className="text-xl sm:text-2xl font-bold text-gray-900">7K</p><p className="text-xs text-gray-500">Profile Visits</p></div>
                <div><p className="text-xl sm:text-2xl font-bold text-[#2a6ff3]">5.2%</p><p className="text-xs text-gray-500">Engagement Rate</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
