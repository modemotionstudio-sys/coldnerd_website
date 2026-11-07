import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const imgLogo = "/logo-nav.webp";

const sections = [
  {
    title: "1. Who We Are",
    content: `Cold Nerd ("we", "our", or "us") operates the website coldnerd.com and provides an AI-powered Instagram outreach automation platform ("the Service"). We are the data controller for information collected through our platform.\n\nFor all payment and billing inquiries, Paddle.com Market Limited acts as the Merchant of Record and is an independent data controller for payment-related data.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect the following categories of information:\n\n• Account Information: Name, email address, and password when you register for an account.\n• Instagram Credentials: Instagram account details you provide to connect your account to the Service. These are used solely to operate the automation features on your behalf.\n• Usage Data: Information about how you use the platform, including features accessed, campaigns created, messages sent, and automation settings configured.\n• Technical Data: IP address, browser type, device information, and cookies used for platform functionality and security.\n• Billing Data: Subscription plan and billing history. Note: actual payment card data is collected and held by Paddle, not us.\n• AI Input Data: Content you upload (e.g. CSV files, target usernames, message goals) to generate personalised outreach messages via our AI engine.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:\n\n• Provide, operate, and maintain the Cold Nerd platform and its automation features\n• Process and manage your subscription through Paddle\n• Generate AI-personalised outreach messages on your behalf using OpenAI and Gemini AI\n• Send transactional emails (account verification, password reset, billing confirmations)\n• Monitor platform usage to prevent abuse, fraud, and violations of Instagram's Terms of Service\n• Improve and develop new features of the Service\n• Respond to your support requests and communications\n• Comply with applicable legal obligations`,
  },
  {
    title: "4. Payments & Paddle",
    content: `All subscription payments are processed by Paddle.com Market Limited, our Merchant of Record. Paddle handles:\n\n• Collection and processing of credit/debit card and other payment method details\n• Subscription billing and renewals\n• Invoicing and receipts\n• Refund processing\n• Sales tax and VAT compliance\n\nWhen you purchase a Cold Nerd subscription, you are entering into a transaction facilitated by Paddle. Your payment data is governed by Paddle's Privacy Policy and Paddle's Buyer Terms. Cold Nerd never has access to your full payment card details.`,
  },
  {
    title: "5. Third-Party Services",
    content: `Cold Nerd integrates with the following third-party services to deliver its features. Each operates under their own privacy policy:\n\n• OpenAI (ChatGPT): Used to analyse Instagram profiles and generate personalised DM messages. Data processed: prospect bio text and post captions.\n• Google Gemini AI: Alternative AI engine for message generation.\n• ElevenLabs / HumanAI TTS: Used for optional voice note DM generation.\n• Paddle.com: Payment processing and subscription management.\n• Instagram / Meta: Our platform interfaces with Instagram on your behalf using your credentials. Usage is subject to Instagram's Privacy Policy and Terms of Service.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your personal data for as long as your account is active or as needed to provide the Service. Specifically:\n\n• Account data is retained for the duration of your subscription and deleted within 30 days of account closure upon request\n• AI-generated message data and campaign data may be retained for up to 12 months to provide analytics and history features\n• Billing and transaction records are retained for 7 years to comply with financial and tax regulations\n• You may request deletion of your personal data at any time (see Section 8)`,
  },
  {
    title: "7. Cookies",
    content: `We use cookies and similar tracking technologies to:\n\n• Keep you logged into your account (essential session cookies)\n• Remember your preferences and settings\n• Analyse platform usage to improve the Service (analytics cookies)\n\nYou can control cookies through your browser settings. Disabling essential cookies may affect the functionality of the platform.`,
  },
  {
    title: "8. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:\n\n• Access: Request a copy of the personal data we hold about you\n• Correction: Request correction of inaccurate or incomplete data\n• Deletion: Request deletion of your personal data ("right to be forgotten")\n• Portability: Request your data in a structured, machine-readable format\n• Objection: Object to processing of your data for certain purposes\n• Withdrawal of Consent: Withdraw consent where processing is based on consent\n\nTo exercise any of these rights, contact us at privacy@coldnerd.com. We will respond within 30 days.`,
  },
  {
    title: "9. Data Security",
    content: `We implement industry-standard security measures to protect your personal data, including encrypted data transmission (HTTPS/TLS), secure credential storage, access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your Cold Nerd account.`,
  },
  {
    title: "10. Children's Privacy",
    content: `Cold Nerd is intended for use by businesses and professionals aged 18 and over. We do not knowingly collect personal data from individuals under 18 years of age. If we become aware that a minor has provided us with personal data, we will delete it promptly.`,
  },
  {
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page and, for material changes, notify you by email or via a notice within the platform. Your continued use of the Service after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "12. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out:\n\nCold Nerd — Privacy Inquiries\nEmail: privacy@coldnerd.com\nWebsite: coldnerd.com\n\nFor billing and payment-related data requests, contact Paddle directly at paddle.com/legal/privacy.`,
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#F5F8FF]">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between w-[95%] max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3 rounded-full bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40">
        <Link to="/" className="h-[50px] w-[160px] lg:w-[200px] relative shrink-0 flex items-center no-underline">
          <img alt="ColdNerd Logo" className="h-full w-auto object-contain pointer-events-none" src={imgLogo} />
        </Link>
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <span className="font-['Inter:Bold',sans-serif] font-bold text-[#0d0d0d] text-[20px]">Privacy Policy</span>
        </div>
        <div className="flex gap-[8px] items-center shrink-0">
          <Link to="/pricing" className="flex items-center gap-1 font-semibold text-[#2a6ff3] text-[15px] hover:opacity-80 transition-opacity no-underline">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Pricing</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-32 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#2a6ff3] text-sm font-medium mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-gray-500">
            Last updated: March 24, 2026
          </p>
        </motion.div>
      </div>

      {/* Paddle Notice */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <p className="text-[14px] text-gray-700 leading-relaxed">
            <strong className="text-[#2a6ff3]">Payment Processing Notice:</strong> Cold Nerd uses <strong>Paddle.com</strong> as our Merchant of Record. All payments, billing, and subscription management are handled by Paddle. When you make a purchase, your payment data is processed directly by Paddle under their own Privacy Policy. Cold Nerd does not store your credit card or payment information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-0">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</div>
            </motion.div>
          ))}
        </div>

        {/* Back to Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2a6ff3] text-white font-semibold hover:bg-[#1f5ccf] transition-colors no-underline"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Pricing
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
