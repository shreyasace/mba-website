import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

interface CommitteesPageProps {
  onNavigate: (page: string) => void;
}

export function CommitteesPage({ onNavigate }: CommitteesPageProps) {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const patron = {
    name: "Sri. Narayan Rao R. Maanay",
    designation: "Chairman, Governing Body, BNM Institute of Technology",
    bio: "Visionary leader committed to excellence in education and fostering innovation at BNMIT, Bengaluru."
  };

  const patrons = [
    { name: "Sri. Ashok R. Maanay", designation: "Joint-Secretary, BNMEI, Bengaluru" },
    { name: "Prof. T. J. Rama Murthy", designation: "Director, BNM Institute of Technology" },
    { name: "Dr. S. Y. Kulkarni", designation: "Additional Director & Principal, BNMIT" },
    { name: "Prof. Eishwar N. Maanay", designation: "Dean, BNM Institute of Technology" },
    { name: "Dr. Krishnamurthy G. N.", designation: "Deputy Director, BNMIT" }
  ];

  const chiefMentor = {
    name: "Dr. Pawan Kumar Singh",
    designation: "Director, IIM Trichy",
    role: "Chief Mentor"
  };

  const advisoryBoard = [
    { name: "Dr. Harsh Purohit", affiliation: "Professor, Dean, FMS, WISDOM, Banasthali Vidyapith", country: "Rajasthan, India" },
    { name: "Dr. Balasubramanya", affiliation: "Professor, IISc Bengaluru", country: "Karnataka, India" },
    { name: "Dr. Prakash Singh", affiliation: "Associate Professor, IIM Lucknow", country: "India" },
    { name: "Dr. Mayank Kumar", affiliation: "Assistant Professor, IIM Ranchi", country: "India" },
    { name: "Dr. Avinash Srivastava", affiliation: "Associate Professor, IMI Kolkata", country: "India" },
    { name: "Dr. Amitabh Anand", affiliation: "Associate Professor, Excelia Business School", country: "La Rochelle, France" }
  ];

  const steeringCommittee = [
    { name: "Prof. Eishwar Maanay", designation: "Dean, BNMIT" },
    { name: "Mrs. Vaishnavee Eishwar Maanay", designation: "Head - Media and Marketing, BNMIT" }
  ];

  const organizingCommittee = [
    {
      role: "General Chair",
      members: [
        { name: "Dr. N Mukund Sharma", designation: "Professor & HoD, MBA, BNMIT" }
      ]
    },
    {
      role: "Organizing Chair",
      members: [
        { name: "Dr. Padmalini Singh", designation: "Professor, MBA Department" }
      ]
    },
    {
      role: "Organizing Committee Members",
      members: [
        { name: "Dr. Neetha Mahadev", designation: "Professor" },
        { name: "Dr. Bhavya Vikas", designation: "Professor" },
        { name: "Dr. Charithra C. M.", designation: "Associate Professor" },
        { name: "Dr. Sharath Ambrose", designation: "Assistant Professor" },
        { name: "Dr. Shilu Varghese", designation: "Assistant Professor" },
        { name: "Mr. Santhosh K V", designation: "Assistant Professor" },
        { name: "Mrs. Jasmine Francis", designation: "Assistant Professor" },
        { name: "Mrs. Ranjitha R", designation: "Assistant Professor" },
        { name: "Mrs. Prathyusha P", designation: "Assistant Professor" },
        { name: "Mrs. Vasudha Srivatsa", designation: "Assistant Professor" },
        { name: "Mr. Vikram Balasubramanian", designation: "Assistant Professor" },
        { name: "Mr. Srinivas Bharadwaj R", designation: "Assistant Professor" },
        { name: "Mr. K Nanda Kishore Nadig", designation: "Assistant Professor" },
        { name: "Mrs. Payal Jindal", designation: "Assistant Professor & TPO" }
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[32px] sm:text-[42px] lg:text-[56px] xl:text-[64px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Organizing <span className="text-[#F97316]">Committee</span>
            </h1>
            <p className="text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] max-w-[800px] mx-auto leading-relaxed">
              Meet the distinguished team of academics and professionals making this conference possible
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chief Patron - HRIC Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-8 sm:mb-12 text-center">
              Chief <span className="text-[#F97316]">Patron</span>
            </h2>
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 text-center max-w-[500px] mx-auto shadow-xl border border-[#E2E8F0]">
              {/* Placeholder Photo */}
              <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl w-32 h-40 sm:w-40 sm:h-48 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                <span className="text-[60px] sm:text-[72px]">👤</span>
              </div>
              <h3 className="text-[#0B1F3A] text-[22px] sm:text-[28px] lg:text-[32px] font-['Montserrat',sans-serif] font-bold mb-2">{patron.name}</h3>
              <p className="text-[#F97316] text-[14px] sm:text-[16px] font-semibold mb-4">{patron.designation}</p>
              <p className="text-[#64748B] text-[14px] sm:text-[15px] leading-relaxed mb-4">{patron.bio}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Patrons */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              <span className="text-[#F97316]">Patrons</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {patrons.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-[#E2E8F0] text-center hover:border-[#F97316] transition-all"
              >
                <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-[28px]">👤</span>
                </div>
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold mb-1">{member.name}</h3>
                <p className="text-[#475569] text-[13px] sm:text-[14px]">{member.designation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chief Mentor */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-['Montserrat',sans-serif] font-bold mb-8 text-center">
              Chief <span className="text-[#F97316]">Mentor</span>
            </h2>
            <div className="bg-gradient-to-br from-[#F97316]/10 to-white rounded-2xl p-6 sm:p-8 text-center max-w-[400px] mx-auto shadow-lg border-2 border-[#F97316]">
              <div className="bg-gradient-to-br from-[#F97316] to-[#ea580c] rounded-xl w-24 h-28 sm:w-32 sm:h-36 mx-auto mb-4 flex items-center justify-center">
                <span className="text-[48px] sm:text-[56px]">🎓</span>
              </div>
              <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] font-bold mb-1">{chiefMentor.name}</h3>
              <p className="text-[#F97316] text-[14px] sm:text-[16px] font-semibold mb-1">{chiefMentor.role}</p>
              <p className="text-[#475569] text-[13px] sm:text-[14px]">{chiefMentor.designation}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steering Committee */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              Steering <span className="text-[#F97316]">Committee</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-[800px] mx-auto">
            {steeringCommittee.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#E2E8F0] text-center hover:border-[#F97316] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] flex items-center justify-center mx-auto mb-4 sm:mb-5 overflow-hidden shadow-md">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#F97316]/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] lg:text-[22px] font-['Montserrat',sans-serif] font-bold mb-2">{member.name}</h3>
                <p className="text-[#F97316] text-[14px] sm:text-[15px] font-medium">{member.designation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              International Advisory <span className="text-[#F97316]">Board</span>
            </h2>
            <p className="text-[#475569] text-[15px] sm:text-[17px] lg:text-[18px] text-center max-w-[700px] mx-auto">
              Distinguished academics from leading institutions worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {advisoryBoard.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border-2 border-[#E2E8F0] hover:border-[#F97316] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] flex-shrink-0 flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#F97316]/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-1 truncate">
                      {member.name}
                    </h3>
                    <p className="text-[#F97316] text-[13px] sm:text-[14px] font-medium leading-snug">{member.affiliation}</p>
                    <p className="text-[#64748B] text-[12px] sm:text-[13px] mt-1">{member.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizing Committee */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div variants={fadeInUp} className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Organizing <span className="text-[#F97316]">Committee</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center max-w-[700px] mx-auto px-4">
              Dedicated team members ensuring a successful conference experience
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {organizingCommittee.map((committee, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <AccordionItem
                  value={`committee-${index}`}
                  className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-xl border-2 border-[#E2E8F0] shadow-lg overflow-hidden hover:border-[#F97316] transition-all duration-300"
                >
                  <AccordionTrigger className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 hover:no-underline">
                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                      <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-lg w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[14px] sm:text-[16px] lg:text-[20px] font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[22px] xl:text-[24px] font-['Montserrat',sans-serif] font-bold text-left">
                        {committee.role}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 lg:pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                      {committee.members.map((member, memberIndex) => (
                        <motion.div
                          key={memberIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: memberIndex * 0.05 }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#E2E8F0] shadow-lg hover:shadow-xl hover:border-[#F97316] transition-all duration-300 text-center"
                        >
                          {/* Profile Image Placeholder */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] flex items-center justify-center mx-auto mb-4 sm:mb-5 overflow-hidden shadow-md">
                            <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#F97316]/70" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                          <h4 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[20px] font-['Montserrat',sans-serif] font-bold mb-2">{member.name}</h4>
                          <p className="text-[#F97316] text-[13px] sm:text-[14px] lg:text-[15px] font-medium">{member.designation}</p>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white text-center"
          >
            <h3 className="text-[24px] sm:text-[32px] lg:text-[40px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Join This Prestigious Conference
            </h3>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-6 sm:mb-8 max-w-[700px] mx-auto px-2">
              Be part of an event organized by leading academics and reviewed by expert scholars
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("registration")}
              className="bg-[#F97316] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] shadow-xl hover:bg-[#ea580c] transition-colors"
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
