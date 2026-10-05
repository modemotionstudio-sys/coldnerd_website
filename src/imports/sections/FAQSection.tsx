import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  MessageCircle,
  Zap,
  Users,
  Star,
  CreditCard,
  Plus,
  Minus,
} from "lucide-react";

const faqItems = [
  {
    icon: Shield,
    q: "Is ColdNerd safe for my Instagram account?",
    a: "Absolutely. ColdNerd uses advanced humanization technology that mimics natural engagement patterns. Our AI-powered warmup system gradually increases activity, keeping your account safely within Instagram's limits. We use rotating delays, human-like typing indicators, and adaptive rate limiting.",
  },
  {
    icon: MessageCircle,
    q: "How many DMs can I send per day?",
    a: "It depends on your plan. Starter includes 3,000 DMs per month, while Growth and Agency include unlimited DMs. ColdNerd automatically adjusts send rates based on your account health score to maximize volume while staying safe.",
  },
  {
    icon: Zap,
    q: "Do I need any technical knowledge to get started?",
    a: "Not at all! ColdNerd is designed to be beginner-friendly. Simply connect your Instagram account, choose a template or create your own DM sequence, and hit start. Our onboarding wizard guides you through everything in under 5 minutes.",
  },
  {
    icon: Users,
    q: "Can I manage multiple Instagram accounts?",
    a: "Yes! Starter supports 3 Instagram accounts, Growth supports 15, and Agency supports unlimited accounts. You can manage all accounts from a single dashboard with separate campaigns and analytics for each.",
  },
  {
    icon: Star,
    q: "What makes ColdNerd different from other DM tools?",
    a: "ColdNerd stands out with AI-powered humanized messaging, smart account warmup, voice-note automation, and real-time analytics — all in one platform. Unlike competitors, our messages don't sound like bots, resulting in 3x higher response rates.",
  },
  {
    icon: CreditCard,
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel at any time with no hidden fees or long-term commitments. Your account will remain active until the end of your current billing period. We also offer a 14-day money-back guarantee on all plans.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={onToggle}
      className={`rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
        isOpen
          ? "border-[#2a6ff3] bg-blue-50/50 shadow-md shadow-blue-100/50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
        {/* Icon */}
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
            isOpen ? "bg-[#2a6ff3] text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Question + Toggle */}
        <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
          <h3
            className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-300 ${
              isOpen ? "text-[#2a6ff3]" : "text-gray-900"
            }`}
          >
            {item.q}
          </h3>
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              isOpen
                ? "bg-[#2a6ff3] text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {isOpen ? (
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[60px] sm:pl-[68px]">
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const leftColumn = faqItems.slice(0, 3);
  const rightColumn = faqItems.slice(3, 6);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#2a6ff3] text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Everything you need to know about ColdNerd
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((item, i) => (
              <FAQItem
                key={i + 3}
                item={item}
                index={i + 3}
                isOpen={openIndex === i + 3}
                onToggle={() => handleToggle(i + 3)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
