import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, FileText, Mail, Phone, Clock, ChevronRight, ChevronDown, ExternalLink, ArrowRight, Globe, CheckCircle, Users, BookOpen, AlertCircle, Award } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import collegeImage from "@/assets/496994e58c6b88294fb889ef258513b6acea2d5f.png";

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

const conferenceInfo = {
  title: "2nd International Conference on",
  theme: "Strategic Agility and Resilience",
  subtitle: "Best Practices in Technology and Management for a Digital Era",
  dates: "April 9-11, 2026",
  preConference: "Pre-Conference Workshop: April 8, 2026",
  venue: "BNM Institute of Technology, Bengaluru",
  mode: "Hybrid Mode (In-Person & Virtual)",
};

const importantDates = [
  { event: "Submission Deadline", date: "27th February 2026", color: "#2563eb" },
  { event: "Acceptance Notification", date: "18th March 2026", color: "#7c3aed" },
  { event: "Final Paper & Author Registration Closes", date: "30th March 2026", color: "#0891b2" },
  { event: "Conference Dates", date: "16th & 17th April 2026", color: "#059669" },
];

const researchTracks = [
  {
    id: 1,
    title: "Strategic Agility & Organizational Resilience",
    topics: [
      "Building adaptive organizations",
      "Crisis management strategies",
      "Strategic decision-making",
      "Knowledge management",
    ],
  },
  {
    id: 2,
    title: "Digital Transformation & Technology",
    topics: [
      "AI and machine learning",
      "Cloud computing",
      "IoT applications",
      "Blockchain technology",
    ],
  },
  {
    id: 3,
    title: "Innovation & Entrepreneurship",
    topics: [
      "Start-up ecosystems",
      "Innovation management",
      "Disruptive technologies",
      "Social entrepreneurship",
    ],
  },
  {
    id: 4,
    title: "Sustainable Business Practices",
    topics: [
      "ESG integration",
      "Circular economy",
      "Supply chain management",
      "Corporate responsibility",
    ],
  },
  {
    id: 5,
    title: "Human Capital & Leadership",
    topics: [
      "Future of work",
      "Digital leadership",
      "Talent management",
      "Employee well-being",
    ],
  },
  {
    id: 6,
    title: "Financial Technology & Analytics",
    topics: [
      "FinTech innovations",
      "Data analytics",
      "Risk management",
      "Cryptocurrency",
    ],
  },
];

const stats = [
  { number: "50+", label: "Expert Speakers" },
  { number: "500+", label: "Expected Delegates" },
  { number: "6", label: "Research Tracks" },
  { number: "3", label: "Conference Days" },
];

// Floating geometric shapes component
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating hexagons */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-32 h-32 border border-orange-500/20 rotate-12"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        animate={{ 
          rotate: [12, 18, 12],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[25%] right-[20%] w-20 h-20 border border-blue-400/20 rotate-45"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        animate={{ 
          rotate: [45, 55, 45],
          y: [0, 15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating circles */}
      <motion.div
        className="absolute top-[60%] right-[15%] w-4 h-4 rounded-full bg-orange-500/30"
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[40%] right-[8%] w-2 h-2 rounded-full bg-white/40"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="absolute top-[70%] right-[25%] w-3 h-3 rounded-full bg-blue-400/30"
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Connecting lines */}
      <svg className="absolute top-[20%] right-[5%] w-[400px] h-[400px] opacity-20">
        <motion.path
          d="M 50 50 Q 150 100 250 50 T 350 100"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M 30 150 Q 130 200 230 150 T 370 180"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Abstract network nodes */}
      <div className="absolute top-[30%] right-[12%]">
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-6 rounded-full border-2 border-orange-500/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-orange-500/60"></div>
          </div>
        </motion.div>
      </div>

      {/* Large gradient orbs */}
      <motion.div 
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Diagonal lines */}
      <motion.div
        className="absolute top-0 right-[30%] w-px h-[200px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent rotate-[30deg] origin-top"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[10%] right-[35%] w-px h-[150px] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent rotate-[30deg] origin-top"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

// About Section - Editorial Style
type AboutTab = 'bnmit' | 'conference' | 'theme';

const aboutContent = {
  bnmit: {
    title: "BNM Institute of Technology",
    subtitle: "Host Institution",
    paragraphs: [
      "BNM Institute of Technology (BNMIT) was established in 2001 under the aegis of the B.N.M. Educational Institutions, a group that has been at the forefront of promoting quality education in Karnataka for over five decades.",
      "BNMIT became an Autonomous Institution in 2021 under the affiliation of Visvesvaraya Technological University (VTU), Belagavi. The institution offers undergraduate courses in various branches of Engineering and is approved by the All India Council for Technical Education (AICTE), New Delhi.",
      "The Department of Management offers a two-year full-time MBA program affiliated to Visvesvaraya Technological University (VTU), recognized by AICTE, New Delhi, and approved by the Government of Karnataka."
    ],
    sidePanel: {
      items: [
        { label: "Established", value: "2001" },
        { label: "Autonomous Since", value: "2021" },
        { label: "Affiliation", value: "VTU, Belagavi" },
        { label: "Approvals", value: "AICTE, New Delhi" },
      ]
    }
  },
  conference: {
    title: "International Conference on Strategic Agility & Resilience",
    subtitle: "2nd Edition • April 2026",
    paragraphs: [
      "The 2nd International Conference on Strategic Agility and Resilience: Best Practices in Technology and Management for a Digital Era brings together researchers, practitioners, industry leaders, and policymakers from institutions worldwide.",
      "In today's rapidly evolving global business landscape, organizations must continuously adapt to emerging technologies, shifting market dynamics, and evolving stakeholder expectations. Strategic agility—the capacity to sense changes and respond swiftly—combined with organizational resilience—the ability to absorb disruptions and recover effectively—are essential attributes for sustained institutional success.",
      "This conference provides a rigorous academic platform for the exchange of peer-reviewed research, evidence-based practices, and scholarly discourse addressing the challenges and opportunities of digital transformation across sectors."
    ],
    sidePanel: {
      items: [
        { label: "Conference Dates", value: "April 9–11, 2026" },
        { label: "Pre-Conference", value: "April 8, 2026" },
        { label: "Venue", value: "BNMIT, Bengaluru" },
        { label: "Format", value: "Hybrid" },
      ]
    }
  },
  theme: {
    title: "Strategic Agility in the Digital Era",
    subtitle: "Conference Theme & Scope",
    paragraphs: [
      "The conference theme addresses four critical dimensions shaping contemporary organizational strategy:",
      "Digital Transformation — Organizations across sectors are increasingly driven by digital technologies. Understanding how to strategically leverage artificial intelligence, Internet of Things, blockchain, and emerging innovations is essential for institutional advancement.",
      "Sustainability Integration — Academic and industry research increasingly demonstrates that sustainable practices serve not only ethical imperatives but also function as drivers of long-term organizational resilience and stakeholder value.",
      "Workforce Evolution — The nature of professional work is being fundamentally reshaped by distributed collaboration, evolving employment models, and the imperative for continuous professional development.",
      "Global Uncertainty — From supply chain vulnerabilities to geopolitical complexity, organizations must develop robust strategic frameworks to navigate an increasingly uncertain operational environment."
    ],
    sidePanel: {
      items: [
        { label: "Research Tracks", value: "6 Tracks" },
        { label: "Focus Areas", value: "Technology & Management" },
        { label: "Approach", value: "Research-Driven" },
        { label: "Scope", value: "International" },
      ]
    }
  }
};

const tabLabels: Record<AboutTab, string> = {
  bnmit: "Host Institution",
  conference: "The Conference",
  theme: "Theme & Scope"
};

function AboutSection() {
  const [activeTab, setActiveTab] = useState<AboutTab>('conference');

  return (
    <section className="py-14 md:py-24 bg-[#f8f9fa]">
      {/* Top border separator */}
      <div className="border-t border-gray-200" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-14 md:pt-20">
        
        {/* Editorial Tab Navigation */}
        <nav className="mb-10 md:mb-16">
          {/* Desktop: Horizontal tabs */}
          <div className="hidden md:flex justify-center gap-10 border-b border-gray-200">
            {(Object.keys(aboutContent) as AboutTab[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative pb-4 transition-colors"
                >
                  <span className={`text-[15px] tracking-wide transition-all duration-200 ${
                    isActive 
                      ? 'font-semibold text-[#000066]' 
                      : 'font-normal text-[#666] hover:text-[#333]'
                  }`}>
                    {tabLabels[tab]}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="editorialTabLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#000066]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile: Horizontal scroll tabs */}
          <div className="md:hidden overflow-x-auto -mx-4 px-4">
            <div className="flex gap-8 min-w-max pb-3 border-b border-gray-200">
              {(Object.keys(aboutContent) as AboutTab[]).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative pb-3 whitespace-nowrap"
                  >
                    <span className={`text-[14px] tracking-wide transition-all duration-200 ${
                      isActive 
                        ? 'font-semibold text-[#000066]' 
                        : 'font-normal text-[#666]'
                    }`}>
                      {tabLabels[tab]}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="editorialTabLineMobile"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#000066]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Content Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Desktop: Two-column layout */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-12">
              {/* Left: Main Content */}
              <article className="lg:col-span-2">
                <p className="text-[13px] uppercase tracking-wider text-[#777] mb-2 font-medium">
                  {aboutContent[activeTab].subtitle}
                </p>
                <h2 className="text-[24px] md:text-[28px] font-semibold text-[#000066] mb-6" style={{ lineHeight: '1.3' }}>
                  {aboutContent[activeTab].title}
                </h2>
                
                <div className="space-y-4">
                  {aboutContent[activeTab].paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[#444] text-[15px] md:text-[16px]"
                      style={{ lineHeight: '1.65', maxWidth: '60ch' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>

              {/* Right: Information Panel (Desktop only) */}
              <aside className="lg:col-span-1">
                <div 
                  className="rounded-lg p-6 sticky top-24"
                  style={{ 
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    backgroundColor: '#fff'
                  }}
                >
                  <h3 className="text-[12px] uppercase tracking-wider text-[#888] mb-5 font-medium">
                    Key Information
                  </h3>
                  <dl className="space-y-4">
                    {aboutContent[activeTab].sidePanel.items.map((item, index) => (
                      <div key={index} className="flex flex-col pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <dt className="text-[12px] text-[#888] mb-1">
                          {item.label}
                        </dt>
                        <dd className="text-[15px] font-medium text-[#1a1a2e]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>

            {/* Mobile: Stacked layout */}
            <div className="lg:hidden">
              {/* Main Content */}
              <article className="mb-8">
                <p className="text-[12px] uppercase tracking-wider text-[#777] mb-2 font-medium">
                  {aboutContent[activeTab].subtitle}
                </p>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#000066] mb-5" style={{ lineHeight: '1.35' }}>
                  {aboutContent[activeTab].title}
                </h2>
                
                <div className="space-y-4">
                  {aboutContent[activeTab].paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[#444] text-[15px]"
                      style={{ lineHeight: '1.65' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>

              {/* Information Panel (Below content on mobile) */}
              <aside className="pt-6 border-t border-gray-200">
                <h3 className="text-[11px] uppercase tracking-wider text-[#888] mb-4 font-medium">
                  Key Information
                </h3>
                <dl className="grid grid-cols-2 gap-4">
                  {aboutContent[activeTab].sidePanel.items.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <dt className="text-[11px] text-[#888] mb-0.5">
                        {item.label}
                      </dt>
                      <dd className="text-[14px] font-medium text-[#1a1a2e]">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Bottom border separator */}
      <div className="mt-14 md:mt-20 border-b border-gray-200" />
    </section>
  );
}

// Call for Papers Section - Card-Based Layout
const conferenceTracks = [
  {
    id: 1,
    title: "Digital Transformation & Strategic Management",
    subThemes: [
      "Strategic Planning for Digital Transformation",
      "Business Model Innovation and Adaptation",
      "Digital Strategy and Competitive Advantage",
      "Enterprise Technology Integration",
      "Organizational Change Management",
      "Digital Maturity and Capability Building"
    ]
  },
  {
    id: 2,
    title: "Artificial Intelligence, Data & Decision-Making",
    subThemes: [
      "AI and Machine Learning in Business",
      "Data-Driven Decision Making",
      "Predictive Analytics and Forecasting",
      "Business Intelligence Systems",
      "Big Data Management and Analytics",
      "Cognitive Computing Applications"
    ]
  },
  {
    id: 3,
    title: "Innovation, Sustainability & Emerging Technologies",
    subThemes: [
      "Sustainable Innovation Practices",
      "Green Technology and Clean Tech",
      "Circular Economy and Business Models",
      "ESG Integration in Strategy",
      "Blockchain and Distributed Systems",
      "IoT and Smart Systems"
    ]
  },
  {
    id: 4,
    title: "Human Capital & Future of Work",
    subThemes: [
      "Remote Work and Virtual Teams",
      "Digital Leadership Competencies",
      "Talent Management in Digital Era",
      "Employee Well-being and Engagement",
      "Workforce Reskilling and Upskilling",
      "HR Analytics and People Science"
    ]
  },
  {
    id: 5,
    title: "Digital Marketing, Platforms & Consumer Behavior",
    subThemes: [
      "Digital Marketing Strategies",
      "Platform Economics and Business Models",
      "Consumer Behavior in Digital Age",
      "Social Media and Brand Management",
      "E-commerce and Omnichannel Retail",
      "Customer Analytics and Personalization"
    ]
  },
  {
    id: 6,
    title: "Governance, Ethics & Risk in Tech-Driven Management",
    subThemes: [
      "Corporate Governance in Digital Era",
      "AI Ethics and Responsible Technology",
      "Cybersecurity Risk Management",
      "Data Privacy and Compliance",
      "Technology Risk Assessment",
      "Regulatory Technology (RegTech)"
    ]
  }
];

function CallForPapersSection() {
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);

  const handleToggle = (trackId: number) => {
    setExpandedTrack((prev) => (prev === trackId ? null : trackId));
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F6FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#000066] font-semibold mb-2">
            Call for Papers
          </p>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1a1a2e]" style={{ lineHeight: '1.25' }}>
            Conference Tracks & Sub-Themes
          </h2>
        </div>

        {/* Cards Grid - align-start prevents cards from stretching */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 items-start">
          {conferenceTracks.map((track) => {
            const isExpanded = expandedTrack === track.id;
            return (
              <div
                key={track.id}
                className="bg-white rounded-lg border border-[#000066]/15 overflow-hidden"
                style={{ 
                  boxShadow: isExpanded 
                    ? '0 4px 20px rgba(0, 0, 102, 0.08)' 
                    : '0 1px 3px rgba(0, 0, 0, 0.04)',
                  transition: 'box-shadow 0.2s ease'
                }}
              >
                {/* Card Header */}
                <div className="p-5 md:p-6">
                  {/* Track Number */}
                  <span className="text-[11px] uppercase tracking-wider text-[#888] font-medium">
                    Track {track.id}
                  </span>
                  
                  {/* Track Title */}
                  <h3 className="text-[16px] md:text-[18px] font-semibold text-[#000066] mt-1.5 mb-4" style={{ lineHeight: '1.35' }}>
                    {track.title}
                  </h3>
                  
                  {/* Toggle Button */}
                  <button
                    onClick={() => handleToggle(track.id)}
                    className="flex items-center gap-2 text-[13px] font-medium text-[#000066] hover:text-[#000066]/70 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Sub-Themes' : 'View Sub-Themes'}</span>
                    <ChevronDown 
                      className="w-4 h-4 transition-transform duration-200" 
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                </div>

                {/* Sub-themes (Expandable) */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ 
                    maxHeight: isExpanded ? '500px' : '0px',
                    opacity: isExpanded ? 1 : 0
                  }}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <div className="pt-4 border-t border-gray-100">
                      <ul className="space-y-2.5">
                        {track.subThemes.map((theme, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#000066]/40 mt-[7px] flex-shrink-0" />
                            <span className="text-[14px] md:text-[15px] text-[#555]" style={{ lineHeight: '1.5' }}>
                              {theme}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concluding Note */}
        <p className="mt-10 text-center text-[13px] md:text-[14px] text-[#666] italic" style={{ lineHeight: '1.6' }}>
          The above list is indicative but not exhaustive. Interdisciplinary and novel submissions are encouraged.
        </p>
      </div>
    </section>
  );
}

// Submission Guidelines Section - Progressive Disclosure
const submissionGuidelinesData = [
  {
    id: 1,
    icon: CheckCircle,
    title: "General Submission Requirements",
    summary: "Original research, formatting standards, and submission process.",
    content: {
      intro: "All submissions must meet the following criteria to be considered for review:",
      bullets: [
        "Submissions must contain original research that has not been previously presented, published, or under review elsewhere.",
        "Include a short abstract of 200 words, followed by 3–5 keywords.",
        "Use Times New Roman, 12-point font with double-spaced text.",
        "Maintain 1-inch (2.5 cm) margins on all sides, on an 8.5×11 page size.",
        "Include figures, tables, graphs, appendices, and references using standard citation formats.",
        "Submit as a single PDF document (.pdf format only).",
        "Maximum of 3 submissions per participant allowed.",
        "Only one author or co-author may present a paper (Hybrid Mode) at the conference.",
        "Certificates for co-authors (not registered) will be provided upon payment of ₹500 per co-author."
      ],
      note: "All submissions should be emailed to: icsar2026@bnmit.ac.in"
    }
  },
  {
    id: 2,
    icon: FileText,
    title: "Paper Submission Types",
    summary: "Full papers and extended abstracts with specific requirements.",
    content: {
      intro: "Choose the submission type that best fits your research:",
      table: [
        { type: "Full Paper", length: "Maximum 7000 words", includes: "Tables, figures, notes, and references", requirement: "Mandatory for Best Paper Award eligibility" },
        { type: "Extended Abstract", length: "Maximum 2500 words", includes: "Tables, figures, and references", requirement: "Must include methodology, key results, and implications" }
      ],
      note: "Extended abstracts for empirical papers must include methodology, key results, and implications for theory and practice."
    }
  },
  {
    id: 3,
    icon: Users,
    title: "Who Should Participate",
    summary: "Academics, industry professionals, students, and policymakers.",
    content: {
      intro: "This conference is designed for anyone interested in the critical link between technology, strategic management, and organizational endurance in the digital age.",
      participants: [
        { label: "Academics & Researchers", desc: "Faculty and research scholars in management and technology" },
        { label: "Entrepreneurs & Startups", desc: "Founders exploring innovation and digital strategies" },
        { label: "Industry Professionals & Executives", desc: "Leaders driving organizational transformation" },
        { label: "Technology Providers", desc: "Solution architects and tech innovators" },
        { label: "Consultants & Advisors", desc: "Strategy and management consultants" },
        { label: "Non-Profit Organizations & Policymakers", desc: "Leaders shaping policy and social impact" },
        { label: "Students (UG & PG)", desc: "Undergraduate and postgraduate students in relevant fields" }
      ]
    }
  },
  {
    id: 4,
    icon: Award,
    title: "Publication Opportunities",
    summary: "Scopus-indexed and ABDC-listed journals for accepted papers.",
    content: {
      intro: "All papers presented at the conference will be included in the conference proceedings with ISBN number and considered for publication in the following journals:",
      journals: [
        { name: "Review of Management Literature", publisher: "Emerald Publishing", indexing: "Scopus Q2" },
        { name: "South Asian Journal of Business and Management Cases", publisher: "Sage", indexing: "Scopus Q3" },
        { name: "Advances in Emerging Markets and Business Operations", publisher: "Taylor & Francis", indexing: "Peer Reviewed" },
        { name: "European Economic Letters", publisher: "", indexing: "ABDC Listed" },
        { name: "Journal of Informatics Education and Research", publisher: "", indexing: "ABDC Listed" },
        { name: "IUP Journals", publisher: "", indexing: "Peer Reviewed" }
      ],
      note: "Discussions are currently underway with additional journals regarding publication opportunities."
    }
  },
  {
    id: 5,
    icon: AlertCircle,
    title: "Important Notes",
    summary: "Review process, publication criteria, and fee information.",
    content: {
      intro: "Please review these important guidelines before submitting:",
      bullets: [
        "All shortlisted papers will undergo a double-blind peer review process.",
        "Acceptance for presentation at the conference does not guarantee acceptance for publication.",
        "Papers must meet additional, basic publication criteria for journal consideration.",
        "Final publication is subject to further review and acceptance by the respective journal, or the discretion of the Editor.",
        "Registration fees do not include publication fees, which may apply to select publications.",
        "All correspondence regarding publication will be handled separately with the author(s) after the conference."
      ]
    }
  }
];

function SubmissionGuidelinesSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleToggle = (cardId: number) => {
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#000066] font-semibold mb-2">
            Call for Papers
          </p>
          <h2 className="text-[26px] md:text-[32px] font-semibold text-[#1a1a2e] mb-3" style={{ lineHeight: '1.3' }}>
            Submission Guidelines
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#666] max-w-2xl mx-auto" style={{ lineHeight: '1.6' }}>
            The conference invites original, unpublished research papers and extended abstracts aligned with the conference theme. 
            Review each section below for detailed submission requirements.
          </p>
        </div>

        {/* Expandable Cards */}
        <div className="space-y-3">
          {submissionGuidelinesData.map((card) => {
            const isExpanded = expandedCard === card.id;
            const Icon = card.icon;
            
            return (
              <div
                key={card.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isExpanded 
                    ? 'border-[#000066]/30 bg-[#fafbfc]' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                style={{ 
                  boxShadow: isExpanded 
                    ? '0 4px 16px rgba(0, 0, 102, 0.06)' 
                    : '0 1px 3px rgba(0, 0, 0, 0.04)'
                }}
              >
                {/* Card Header - Always Visible */}
                <button
                  onClick={() => handleToggle(card.id)}
                  className="w-full p-4 md:p-5 flex items-start gap-4 text-left"
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isExpanded ? 'bg-[#000066]' : 'bg-[#f0f1f5]'
                  }`}>
                    <Icon className={`w-5 h-5 ${isExpanded ? 'text-white' : 'text-[#000066]'}`} />
                  </div>
                  
                  {/* Title & Summary */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-[15px] md:text-[16px] font-semibold transition-colors ${
                      isExpanded ? 'text-[#000066]' : 'text-[#1a1a2e]'
                    }`}>
                      {card.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-[#666] mt-0.5">
                      {card.summary}
                    </p>
                  </div>
                  
                  {/* Chevron */}
                  <ChevronDown 
                    className={`w-5 h-5 text-[#888] flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Expandable Content */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ 
                    maxHeight: isExpanded ? '800px' : '0px',
                    opacity: isExpanded ? 1 : 0
                  }}
                >
                  <div className="px-4 md:px-5 pb-5 pt-0">
                    <div className="pl-14 border-t border-gray-100 pt-4">
                      
                      {/* Intro text */}
                      {card.content.intro && (
                        <p className="text-[14px] text-[#555] mb-4" style={{ lineHeight: '1.6' }}>
                          {card.content.intro}
                        </p>
                      )}
                      
                      {/* Bullet points */}
                      {card.content.bullets && (
                        <ul className="space-y-2.5 mb-4">
                          {card.content.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#000066]/50 mt-[7px] flex-shrink-0" />
                              <span className="text-[13px] md:text-[14px] text-[#555]" style={{ lineHeight: '1.55' }}>
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Table for Paper Types */}
                      {card.content.table && (
                        <div className="overflow-x-auto -mx-4 md:mx-0 mb-4">
                          <div className="min-w-[500px] md:min-w-0 px-4 md:px-0">
                            <table className="w-full text-[13px] md:text-[14px]">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2.5 pr-4 font-semibold text-[#1a1a2e]">Type</th>
                                  <th className="text-left py-2.5 pr-4 font-semibold text-[#1a1a2e]">Length</th>
                                  <th className="text-left py-2.5 font-semibold text-[#1a1a2e]">Requirement</th>
                                </tr>
                              </thead>
                              <tbody>
                                {card.content.table.map((row, idx) => (
                                  <tr key={idx} className="border-b border-gray-100 last:border-0">
                                    <td className="py-3 pr-4">
                                      <span className="font-medium text-[#000066]">{row.type}</span>
                                    </td>
                                    <td className="py-3 pr-4 text-[#555]">{row.length}</td>
                                    <td className="py-3 text-[#555]">{row.requirement}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {/* Participants list */}
                      {card.content.participants && (
                        <div className="grid sm:grid-cols-2 gap-3 mb-4">
                          {card.content.participants.map((p, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-gray-100">
                              <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-[13px] md:text-[14px] font-medium text-[#1a1a2e] block">
                                  {p.label}
                                </span>
                                <span className="text-[12px] text-[#888]">
                                  {p.desc}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Journals list */}
                      {card.content.journals && (
                        <div className="space-y-2 mb-4">
                          {card.content.journals.map((j, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100">
                              <div className="flex-1 min-w-0">
                                <span className="text-[13px] md:text-[14px] font-medium text-[#1a1a2e] block truncate">
                                  {j.name}
                                </span>
                                {j.publisher && (
                                  <span className="text-[12px] text-[#888]">{j.publisher}</span>
                                )}
                              </div>
                              <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full flex-shrink-0 ml-3 ${
                                j.indexing.includes('Scopus') 
                                  ? 'bg-[#000066]/10 text-[#000066]' 
                                  : j.indexing.includes('ABDC')
                                    ? 'bg-[#7c3aed]/10 text-[#7c3aed]'
                                    : 'bg-gray-100 text-[#666]'
                              }`}>
                                {j.indexing}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Note */}
                      {card.content.note && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-[#fff7ed] border border-[#fed7aa]">
                          <AlertCircle className="w-4 h-4 text-[#ea580c] mt-0.5 flex-shrink-0" />
                          <p className="text-[13px] text-[#9a3412]" style={{ lineHeight: '1.5' }}>
                            {card.content.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <a
            href="mailto:icsar2026@bnmit.ac.in"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#000066] text-white text-[14px] md:text-[15px] font-semibold rounded-lg hover:bg-[#000055] transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            Submit Your Paper
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Campus Background with Content Container */}
      <section className="relative min-h-[90vh] lg:min-h-screen">
        {/* Background Image - More Visible */}
        <div className="absolute inset-0">
          <img
            src={collegeImage}
            alt="BNMIT Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Lighter overlay to show campus image better */}
          <div className="absolute inset-0 bg-[#000066]/50" />
        </div>

        {/* Content with Container */}
        <div className="relative z-10 min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-8 lg:px-16 py-20">
          {/* Glass Container for Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#000066]/80 backdrop-blur-md rounded-2xl p-8 sm:p-10 lg:p-12 max-w-3xl border border-white/10"
          >
            {/* Institution */}
            <div className="mb-6">
              <p className="text-white text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
                BNM Institute of Technology
              </p>
              <p className="text-white/70 text-sm sm:text-base mt-1">
                Department of Business Administration
              </p>
            </div>

            {/* Conference Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              International Conference on{" "}
              <span className="text-[#f7931e]">Strategic Agility and Resilience</span>
            </h1>

            {/* Theme */}
            <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed mb-8">
              Best Practices in Technology and Management for a Digital Era
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/90 text-sm sm:text-base mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#f7931e]" />
                April 16–17, 2026
              </span>
              <span className="text-white/40">|</span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#f7931e]" />
                BNMIT, Bengaluru
              </span>
              <span className="text-white/40">|</span>
              <span className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#f7931e]" />
                Hybrid
              </span>
            </div>

            {/* CTA Button */}
            <a
              href="https://drive.google.com/file/d/15ksXa92VpucB4jakrPrq-ULsaKL9cSms/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f7931e] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#e8820f] transition-colors duration-200"
            >
              <FileText className="w-5 h-5" />
              Download Brochure
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-[#1a2d4a]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#f7931e] mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Premium Tabs */}
      <AboutSection />

      <CallForPapersSection />

      {/* Important Dates - Professional Vertical Timeline */}
      <section className="py-16 md:py-20 bg-[#fafbfc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-[26px] md:text-[32px] font-semibold text-[#1a1a2e]" style={{ lineHeight: '1.3' }}>
              Important Dates
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#666] mt-2">
              Key milestones for paper submission and conference
            </p>
          </div>

          {/* Desktop Timeline - Alternating Left/Right */}
          <div className="hidden md:block relative">
            {/* Center vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#e5e7eb] -translate-x-1/2" />
            
            <div className="relative space-y-8">
              {importantDates.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                    className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 top-6 -translate-x-1/2 z-10">
                      <div 
                        className="w-3 h-3 rounded-full border-[3px] border-white"
                        style={{ backgroundColor: item.color, boxShadow: '0 0 0 2px #e5e7eb' }}
                      />
                    </div>
                    
                    {/* Card */}
                    <div className={`w-[calc(50%-28px)] ${isLeft ? 'pr-0' : 'pl-0'}`}>
                      <div 
                        className="bg-white rounded-xl overflow-hidden"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)' }}
                      >
                        {/* Colored top bar */}
                        <div className="h-[4px]" style={{ backgroundColor: item.color }} />
                        
                        {/* Card content */}
                        <div className="p-5">
                          {/* Event label */}
                          <span 
                            className="inline-block text-[11px] font-semibold uppercase tracking-wide mb-2"
                            style={{ color: item.color }}
                          >
                            {item.event}
                          </span>
                          
                          {/* Date - primary focus */}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#9ca3af]" />
                            <p className="text-[17px] font-medium text-[#1a1a2e]">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline - Left-aligned single column */}
          <div className="md:hidden relative pl-6">
            {/* Left vertical line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-[#e5e7eb]" />
            
            <div className="space-y-4">
              {importantDates.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.06 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-21px] top-5 z-10">
                    <div 
                      className="w-2.5 h-2.5 rounded-full border-[2px] border-white"
                      style={{ backgroundColor: item.color, boxShadow: '0 0 0 2px #e5e7eb' }}
                    />
                  </div>
                  
                  {/* Card */}
                  <div 
                    className="bg-white rounded-lg overflow-hidden"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    {/* Colored top bar */}
                    <div className="h-[3px]" style={{ backgroundColor: item.color }} />
                    
                    {/* Card content */}
                    <div className="p-4">
                      {/* Event label */}
                      <span 
                        className="inline-block text-[10px] font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: item.color }}
                      >
                        {item.event}
                      </span>
                      
                      {/* Date */}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#9ca3af]" />
                        <p className="text-[15px] font-medium text-[#1a1a2e]">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Submission Guidelines - Progressive Disclosure */}
      <SubmissionGuidelinesSection />

      {/* Contact Section - Professional Card-Based Layout */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#f7931e] font-semibold mb-2">
              Get in Touch
            </p>
            <h2 className="text-[26px] md:text-[32px] font-semibold text-[#000066]" style={{ lineHeight: '1.3' }}>
              Contact Us
            </h2>
          </div>

          {/* Contact Cards Container */}
          <div 
            className="rounded-2xl p-6 md:p-8"
            style={{ 
              backgroundColor: '#F9FAFB',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              
              {/* Venue Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group"
              >
                <div 
                  className="h-full bg-white rounded-xl p-5 md:p-6 transition-all duration-200 hover:-translate-y-1"
                  style={{ 
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#fff7ed] flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-[#f7931e]/15">
                    <MapPin className="w-5 h-5 text-[#f7931e]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-[15px] md:text-[16px] font-semibold text-[#000066] mb-2">
                    Venue
                  </h3>
                  
                  {/* Content */}
                  <p className="text-[13px] md:text-[14px] text-[#555]" style={{ lineHeight: '1.6' }}>
                    BNM Institute of Technology<br />
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
                className="group"
              >
                <div 
                  className="h-full bg-white rounded-xl p-5 md:p-6 transition-all duration-200 hover:-translate-y-1"
                  style={{ 
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#fff7ed] flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-[#f7931e]/15">
                    <Mail className="w-5 h-5 text-[#f7931e]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-[15px] md:text-[16px] font-semibold text-[#000066] mb-2">
                    Email
                  </h3>
                  
                  {/* Content */}
                  <a 
                    href="mailto:bnmitconference@bnmit.in" 
                    className="text-[13px] md:text-[14px] text-[#555] hover:text-[#000066] transition-colors"
                    style={{ lineHeight: '1.6' }}
                  >
                    bnmitconference@bnmit.in
                  </a>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.16 }}
                className="group"
              >
                <div 
                  className="h-full bg-white rounded-xl p-5 md:p-6 transition-all duration-200 hover:-translate-y-1"
                  style={{ 
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#fff7ed] flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-[#f7931e]/15">
                    <Phone className="w-5 h-5 text-[#f7931e]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-[15px] md:text-[16px] font-semibold text-[#000066] mb-2">
                    Phone
                  </h3>
                  
                  {/* Content */}
                  <p className="text-[13px] md:text-[14px] text-[#555]" style={{ lineHeight: '1.6' }}>
                    +91-80-2678 4723<br />
                    +91-80-2678 4724
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
