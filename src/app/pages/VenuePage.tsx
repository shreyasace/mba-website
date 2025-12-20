import { motion } from "motion/react";

interface VenuePageProps {
  onNavigate: (page: string) => void;
}

export function VenuePage({ onNavigate }: VenuePageProps) {
  const travelInfo = [
    {
      mode: "By Air",
      icon: "✈️",
      details: [
        "Kempegowda International Airport (BLR) - 45 km from venue",
        "Well-connected to major Indian and international cities",
        "Airport taxi/cab services available (approx. ₹800-1200)",
        "Prepaid taxi counters available at airport",
        "BMTC Vayu Vajra buses to various parts of city"
      ]
    },
    {
      mode: "By Train",
      icon: "🚂",
      details: [
        "Bangalore City Railway Station (SBC) - 12 km from venue",
        "Yesvantpur Junction (YPR) - 18 km from venue",
        "Local taxis and metro connectivity available",
        "Auto-rickshaws easily accessible",
        "Approximate fare: ₹250-400 to venue"
      ]
    },
    {
      mode: "By Road",
      icon: "🚗",
      details: [
        "Well-connected via National Highways",
        "Regular bus services from nearby cities",
        "Kempegowda Bus Terminal (Majestic) - 10 km",
        "Private car parking available at venue",
        "Ride-sharing services (Uber, Ola) widely available"
      ]
    },
    {
      mode: "Local Transport",
      icon: "🚇",
      details: [
        "Namma Metro - RV Road Metro Station (2 km from venue)",
        "BMTC bus connectivity to major areas",
        "Auto-rickshaws and cabs readily available",
        "App-based taxi services recommended",
        "Conference shuttle from select hotels (Day 1 & 2)"
      ]
    }
  ];

  const nearbyAttractions = [
    {
      name: "Lalbagh Botanical Garden",
      distance: "5 km",
      description: "Historic botanical garden with glass house and diverse flora",
      icon: "🌳"
    },
    {
      name: "Bangalore Palace",
      distance: "8 km",
      description: "Tudor-style palace with beautiful architecture and gardens",
      icon: "🏰"
    },
    {
      name: "Cubbon Park",
      distance: "7 km",
      description: "Large urban park perfect for morning walks",
      icon: "🌲"
    },
    {
      name: "Commercial Street",
      distance: "9 km",
      description: "Popular shopping destination for traditional and modern goods",
      icon: "🛍️"
    },
    {
      name: "Bannerghatta National Park",
      distance: "20 km",
      description: "Wildlife sanctuary with zoo, safari, and butterfly park",
      icon: "🦁"
    },
    {
      name: "ISKCON Temple",
      distance: "15 km",
      description: "Beautiful temple complex with spiritual ambiance",
      icon: "🕉️"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[32px] sm:text-[48px] lg:text-[64px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Venue & <span className="text-[#F97316]">Travel</span>
            </h1>
            <p className="text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] max-w-[800px] mx-auto leading-relaxed px-4">
              All you need to know about reaching the conference venue and exploring Bangalore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Venue Details */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-[24px] sm:text-[32px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
                    BNM Institute of Technology
                  </h2>
                  <div className="space-y-3 sm:space-y-4 text-[14px] sm:text-[16px] lg:text-[18px]">
                    <p className="flex items-start gap-3">
                      <span className="text-[#F97316] text-[20px] sm:text-[24px]">📍</span>
                      <span>27th Main, BSK II Stage, Banashankari, Bangalore - 560070, Karnataka, India</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-[#F97316] text-[20px] sm:text-[24px]">📞</span>
                      <span>+91 80 2861 1426</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-[#F97316] text-[20px] sm:text-[24px]">✉️</span>
                      <span>conference@bnmit.ac.in</span>
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#F97316] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-[14px] sm:text-[16px] shadow-lg hover:bg-[#ea580c] transition-colors"
                    >
                      Open in Google Maps
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-[14px] sm:text-[16px] border-2 border-white/30 hover:bg-white/20 transition-colors"
                    >
                      Download Directions
                    </motion.button>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                  <div className="aspect-video bg-gradient-to-br from-[#F8FAFC] to-white rounded-lg flex items-center justify-center">
                    <p className="text-[#0B1F3A] text-[14px] sm:text-[18px] font-semibold">Map Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Travel Information */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-8 sm:mb-12 text-center">
              How to <span className="text-[#F97316]">Reach</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {travelInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border-2 border-[#E2E8F0] shadow-lg hover:border-[#F97316] hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-[32px] sm:text-[40px] lg:text-[48px]">{info.icon}</div>
                    <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] lg:text-[28px] font-['Montserrat',sans-serif] font-bold">
                      {info.mode}
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {info.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-[#F97316] mt-1">•</span>
                        <span className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[15px]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Explore <span className="text-[#F97316]">Bangalore</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center mb-8 sm:mb-12 px-4">
              Take some time to explore the Garden City's attractions
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {nearbyAttractions.map((attraction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl p-5 sm:p-6 border-2 border-[#E2E8F0] shadow-lg hover:border-[#F97316] hover:shadow-xl transition-all"
                >
                  <div className="text-[36px] sm:text-[48px] mb-3 sm:mb-4 text-center">{attraction.icon}</div>
                  <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[20px] font-['Montserrat',sans-serif] font-bold mb-2 text-center">
                    {attraction.name}
                  </h3>
                  <p className="text-[#1E4ED8] text-[12px] sm:text-[14px] font-semibold mb-2 sm:mb-3 text-center">{attraction.distance}</p>
                  <p className="text-[#475569] text-[12px] sm:text-[14px] text-center leading-relaxed">
                    {attraction.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
