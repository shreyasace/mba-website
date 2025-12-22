import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";

interface AboutConferencePageProps {
  onNavigate: (page: string) => void;
}

export function AboutConferencePage({ onNavigate }: AboutConferencePageProps) {
  const contentRef = useRef(null);
  const keyInfoRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.1 });
  const isKeyInfoInView = useInView(keyInfoRef, { once: true, amount: 0.2 });

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const keyHighlights = [
    {
      icon: "⚡",
      title: "Strategic Agility",
      description: "Organizations adapting swiftly to market changes and disruptions"
    },
    {
      icon: "🔄",
      title: "Resilience",
      description: "Building capacity to absorb disruptions and emerge stronger"
    },
    {
      icon: "🌐",
      title: "Global Exchange",
      description: "Researchers, industry leaders and policymakers sharing insights"
    }
  ];

  const conferenceFeatures = [
    { icon: "🌍", label: "Global Delegates" },
    { icon: "📚", label: "Peer-Reviewed Research" },
    { icon: "🤝", label: "Industry-Academia Bridge" },
    { icon: "💡", label: "Innovation Showcase" }
  ];

  const whoShouldAttend = [
    "Academic Researchers & Faculty",
    "Industry Professionals & Managers",
    "PhD Scholars & Research Students",
    "Policy Makers & Consultants",
    "Entrepreneurs & Startup Founders",
    "Technology Leaders & CXOs"
  ];

  return (
    <div className="w-full bg-[#FAFBFC]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1a3a6e] to-[#0B1F3A] py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#F97316]/20 backdrop-blur-sm border border-[#F97316]/30 rounded-full px-5 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse"></span>
              <span className="text-[#F97316] text-sm sm:text-base font-semibold">2nd Edition · April 2026</span>
            </motion.div>

            <h1 className="text-white text-[36px] sm:text-[48px] lg:text-[64px] xl:text-[72px] font-['Montserrat',sans-serif] font-bold mb-6 leading-tight">
              About the <span className="text-[#F97316]">Conference</span>
            </h1>
            
            <p className="text-white/80 text-[17px] sm:text-[20px] lg:text-[22px] max-w-[850px] mx-auto leading-relaxed">
              Discover the vision, purpose, and global impact of ICSAR 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef} className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            
            {/* Left Content - 2 columns */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="lg:col-span-2 space-y-10"
            >
              {/* Highlight Strip */}
              <motion.div
                variants={fadeInUp}
                className="relative bg-gradient-to-r from-[#0B1F3A]/5 via-[#F97316]/5 to-transparent rounded-xl p-6 border-l-4 border-[#F97316]"
              >
                <p className="text-[#0B1F3A] text-[18px] sm:text-[20px] lg:text-[22px] font-medium leading-relaxed">
                  A global platform bridging <span className="text-[#F97316] font-semibold">strategy</span>, <span className="text-[#F97316] font-semibold">technology</span>, and <span className="text-[#F97316] font-semibold">resilience</span> in a digital-first world.
                </p>
              </motion.div>

              {/* Introduction */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-[#0F172A] text-[17px] sm:text-[18px] leading-[1.8] first-letter:text-[40px] first-letter:font-bold first-letter:text-[#0B1F3A] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                  The International Conference on <strong className="text-[#0B1F3A]">Strategic Agility and Resilience</strong> (ICSAR 2026) brings together thought leaders, researchers, and practitioners from across the globe to explore how organizations can thrive in an era of unprecedented <strong className="text-[#0B1F3A]">digital transformation</strong>.
                </p>
              </motion.div>

              {/* Why This Conference Matters */}
              <motion.div variants={fadeInUp} className="space-y-5">
                <h2 className="text-[#0B1F3A] text-[24px] sm:text-[28px] font-['Montserrat',sans-serif] font-bold flex items-center gap-3">
                  <span className="w-10 h-1 bg-[#F97316] rounded-full"></span>
                  Why This Conference Matters
                </h2>
                <p className="text-[#475569] text-[16px] sm:text-[17px] leading-[1.8]">
                  In today's volatile business environment, organizations must develop the capability to anticipate change, respond swiftly, and recover from setbacks. ICSAR 2026 addresses these critical needs by creating a platform for sharing cutting-edge research, best practices, and innovative strategies.
                </p>
              </motion.div>

              {/* Key Concepts - Icon + Text Rows */}
              <motion.div variants={fadeInUp} className="space-y-5">
                <h2 className="text-[#0B1F3A] text-[24px] sm:text-[28px] font-['Montserrat',sans-serif] font-bold flex items-center gap-3">
                  <span className="w-10 h-1 bg-[#F97316] rounded-full"></span>
                  Core Themes
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {keyHighlights.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#F97316]/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] flex items-center justify-center text-2xl mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-[#0B1F3A] text-[16px] sm:text-[17px] font-bold mb-2">{item.title}</h3>
                      <p className="text-[#64748B] text-[14px] leading-relaxed">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Conference Features - Horizontal Strip */}
              <motion.div variants={fadeInUp}>
                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1a3a6e] rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {conferenceFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl sm:text-4xl mb-2">{feature.icon}</div>
                        <p className="text-white/90 text-[13px] sm:text-[14px] font-medium">{feature.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* What Participants Gain */}
              <motion.div variants={fadeInUp} className="space-y-5">
                <h2 className="text-[#0B1F3A] text-[24px] sm:text-[28px] font-['Montserrat',sans-serif] font-bold flex items-center gap-3">
                  <span className="w-10 h-1 bg-[#F97316] rounded-full"></span>
                  What You'll Gain
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Exposure to cutting-edge research and trends",
                    "Networking with global academics and industry leaders",
                    "Publication opportunities in reputed journals",
                    "Insights into best practices across industries",
                    "Collaborative research opportunities",
                    "Certificate of participation and presentation"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInLeft}
                      className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[#E2E8F0] hover:border-[#F97316]/30 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#F97316] text-sm">✓</span>
                      </div>
                      <span className="text-[#0F172A] text-[15px] leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Who Should Attend */}
              <motion.div variants={fadeInUp} className="space-y-5">
                <h2 className="text-[#0B1F3A] text-[24px] sm:text-[28px] font-['Montserrat',sans-serif] font-bold flex items-center gap-3">
                  <span className="w-10 h-1 bg-[#F97316] rounded-full"></span>
                  Who Should Attend
                </h2>
                <div className="flex flex-wrap gap-3">
                  {whoShouldAttend.map((item, index) => (
                    <motion.span
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-2 text-[14px] sm:text-[15px] text-[#0F172A] font-medium hover:border-[#F97316] hover:bg-[#F97316]/5 transition-all cursor-default"
                    >
                      <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full"></span>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Sidebar - Key Information (Sticky) */}
            <motion.div
              ref={keyInfoRef}
              initial="hidden"
              animate={isKeyInfoInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="lg:col-span-1"
            >
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Key Information Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#E2E8F0] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#F97316]"></div>
                  
                  <h3 className="text-[#0B1F3A] text-[20px] sm:text-[22px] font-['Montserrat',sans-serif] font-bold mb-6">
                    Key Information
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📅</span>
                      </div>
                      <div>
                        <p className="text-[#64748B] text-[13px] font-medium uppercase tracking-wide mb-1">Conference Dates</p>
                        <p className="text-[#0B1F3A] text-[16px] font-bold">April 16-17, 2026</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#1E4ED8]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🏛️</span>
                      </div>
                      <div>
                        <p className="text-[#64748B] text-[13px] font-medium uppercase tracking-wide mb-1">Pre-Conference Workshop</p>
                        <p className="text-[#0B1F3A] text-[16px] font-bold">April 15, 2026</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📍</span>
                      </div>
                      <div>
                        <p className="text-[#64748B] text-[13px] font-medium uppercase tracking-wide mb-1">Venue</p>
                        <p className="text-[#0B1F3A] text-[16px] font-bold">BNMIT, Bengaluru</p>
                        <p className="text-[#64748B] text-[13px]">Karnataka, India</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">💻</span>
                      </div>
                      <div>
                        <p className="text-[#64748B] text-[13px] font-medium uppercase tracking-wide mb-1">Format</p>
                        <p className="text-[#0B1F3A] text-[16px] font-bold">Hybrid Mode</p>
                        <p className="text-[#64748B] text-[13px]">In-person & Virtual</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#E2E8F0] my-6"></div>

                  <div className="space-y-3">
                    <h4 className="text-[#0B1F3A] text-[15px] font-bold flex items-center gap-2">
                      <span className="text-[#F97316]">⏰</span>
                      Key Deadlines
                    </h4>
                    <div className="space-y-2 text-[14px]">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Paper Submission</span>
                        <span className="text-[#0B1F3A] font-semibold">Feb 27, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Notification</span>
                        <span className="text-[#0B1F3A] font-semibold">Mar 18, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Camera Ready</span>
                        <span className="text-[#0B1F3A] font-semibold">Mar 30, 2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate("registration")}
                    className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-[16px]"
                  >
                    Register Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate("submission")}
                    className="w-full bg-white border-2 border-[#0B1F3A] text-[#0B1F3A] font-bold py-4 rounded-xl hover:bg-[#0B1F3A] hover:text-white transition-all text-[16px]"
                  >
                    Submit Paper
                  </motion.button>
                </div>

                {/* Quick Links */}
                <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#E2E8F0]">
                  <h4 className="text-[#0B1F3A] text-[15px] font-bold mb-4">Quick Links</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Conference Tracks", page: "tracks" },
                      { label: "Organizing Committee", page: "committees" },
                      { label: "Venue & Travel", page: "venue" }
                    ].map((link, index) => (
                      <button
                        key={index}
                        onClick={() => onNavigate(link.page)}
                        className="w-full flex items-center justify-between text-[#475569] hover:text-[#F97316] text-[14px] py-2 transition-colors group"
                      >
                        <span>{link.label}</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Organizers Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-['Montserrat',sans-serif] font-bold mb-4">
              About the <span className="text-[#F97316]">Organizers</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#F97316] to-[#F59E0B] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-lg"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] flex items-center justify-center text-2xl">
                  🏛️
                </div>
                <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] font-['Montserrat',sans-serif] font-bold">
                  BNM Institute of Technology
                </h3>
              </div>
              <p className="text-[#475569] text-[15px] sm:text-[16px] leading-relaxed mb-4">
                Established in 2001, BNMIT is an Autonomous Institute approved by AICTE and affiliated to VTU, Belagavi. The institute is known for its academic excellence and industry-oriented programs.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AICTE Approved", "VTU Affiliated", "NAAC Accredited", "NBA Accredited"].map((tag, index) => (
                  <span key={index} className="bg-[#0B1F3A]/5 text-[#0B1F3A] text-[12px] font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-lg"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-2xl">
                  📚
                </div>
                <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] font-['Montserrat',sans-serif] font-bold">
                  Department of MBA
                </h3>
              </div>
              <p className="text-[#475569] text-[15px] sm:text-[16px] leading-relaxed mb-4">
                The Department of Business Administration offers MBA programs with dual specializations, focusing on developing future business leaders with strong analytical and managerial skills.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Dual Specialization", "Industry Connect", "Research Focus", "Placement Record"].map((tag, index) => (
                  <span key={index} className="bg-[#F97316]/10 text-[#F97316] text-[12px] font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
