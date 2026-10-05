import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { comparisonRows, type FeatureValue } from "../../lib/pricingPlans";

const COLUMNS = [
  { key: "starter", label: "Starter" },
  { key: "growth", label: "Growth", popular: true },
  { key: "agency", label: "Agency" },
] as const;

function Cell({ value }: { value: FeatureValue }) {
  if (value === true) return <Check className="w-5 h-5 ml-auto text-[#2a6ff3]" aria-label="Included" />;
  if (value === false) return <Minus className="w-5 h-5 ml-auto text-gray-300" aria-label="Not included" />;
  return <span className="text-gray-900">{value}</span>;
}

/** Full feature comparison of the paid plans. */
export function PricingComparison({ animateOnView = true }: { animateOnView?: boolean }) {
  const reveal = animateOnView
    ? { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.div {...reveal} transition={{ duration: 0.6 }} className="mt-16 lg:mt-20">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">Compare plans</h3>
      <p className="text-gray-500 text-center mb-8">Everything included in each ColdNerd plan.</p>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[560px] max-w-[1000px] mx-auto text-[15px] sm:text-base border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th scope="col" className="text-left font-semibold text-gray-900 py-4 pr-4">Feature</th>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" className="text-right font-semibold text-gray-900 py-4 pl-4 w-[22%]">
                  <span className="inline-flex flex-col items-end gap-1">
                    {"popular" in c && c.popular && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2a6ff3]">Most popular</span>
                    )}
                    {c.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="border-b border-gray-100 last:border-0 hover:bg-[#f8fbff] transition-colors">
                <th scope="row" className="text-left font-normal text-gray-900 py-4 pr-4">{row.feature}</th>
                {COLUMNS.map((c) => (
                  <td key={c.key} className="text-right py-4 pl-4">
                    <Cell value={row[c.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
