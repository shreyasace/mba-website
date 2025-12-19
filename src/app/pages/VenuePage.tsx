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

  const hotels = [
    {
      name: "The Chancery Pavilion",
      category: "5-Star",
      distance: "1.5 km",
      price: "₹6,500 - 8,500",
      features: ["Free WiFi", "Breakfast", "Pool", "Conference Rate Available"]
    },
    {
      name: "Ramada Bangalore",
      category: "4-Star",
      distance: "2 km",
      price: "₹4,500 - 6,000",
      features: ["Free WiFi", "Breakfast", "Gym", "Special Rate"]
    },
    {
      name: "Lemon Tree Hotel",
      category: "4-Star",
      distance: "1 km",
      price: "₹3,500 - 5,000",
      features: ["Free WiFi", "Breakfast", "Conference Rate"]
    },
    {
      name: "Fairfield by Marriott",
      category: "4-Star",
      distance: "3 km",
      price: "₹5,000 - 7,000",
      features: ["Free WiFi", "Breakfast", "Pool", "Gym"]
    },
    {
      name: "Comfort Inn",
      category: "3-Star",
      distance: "1.5 km",
      price: "₹2,500 - 3,500",
      features: ["Free WiFi", "Breakfast", "Budget Friendly"]
    },
    {
      name: "Treebo Hotels",
      category: "3-Star",
      distance: "800 m",
      price: "₹2,000 - 3,000",
      features: ["Free WiFi", "Breakfast", "Walking Distance"]
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
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[64px] font-['Montserrat',sans-serif] font-bold mb-6">
              Venue & <span className="text-[#F97316]">Travel</span>
            </h1>
            <p className="text-white/90 text-[20px] max-w-[800px] mx-auto leading-relaxed">
              All you need to know about reaching the conference venue and exploring Bangalore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Venue Details */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-2xl p-12 text-white">
              <div className="grid grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-[48px] font-['Montserrat',sans-serif] font-bold mb-6">
                    BNM Institute of Technology
                  </h2>
                  <div className="space-y-4 text-[18px]">
                    <p className="flex items-start gap-3">
                      <span className="text-[#F97316] text-[24px]">📍</span>
                      <span>27th Main, BSK II Stage, Banashankari, Bangalore - 560070, Karnataka, India</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-[#F97316] text-[24px]">📞</span>
                      <span>+91 80 2861 1426</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-[#F97316] text-[24px]">✉️</span>
                      <span>conference@bnmit.ac.in</span>
                    </p>
                  </div>
                  <div className="mt-8 flex gap-4">
                  <motion.a
                    href="https://maps.app.goo.gl/TTJqSdLEynZtzHoG6"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#F97316] text-white px-8 py-4 rounded-lg font-semibold text-[16px] shadow-lg hover:bg-[#ea580c] transition-colors inline-block"
                  >
                    Open in Google Maps
                  </motion.a>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.613395373512!2d77.56699307507752!3d12.92500791591416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e2bdf3d8c9%3A0x1b3aee4d8d4e1c6f!2sBNM%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1736940000000"
                    className="w-full h-full rounded-lg"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
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
            <h2 className="text-[#0B1F3A] text-[48px] font-['Montserrat',sans-serif] font-bold mb-12 text-center">
              How to <span className="text-[#F97316]">Reach</span>
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {travelInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-8 border-2 border-[#E2E8F0] shadow-lg hover:border-[#F97316] hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-[48px]">{info.icon}</div>
                    <h3 className="text-[#0B1F3A] text-[28px] font-['Montserrat',sans-serif] font-bold">
                      {info.mode}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {info.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <span className="text-[#F97316] mt-1">•</span>
                        <span className="text-[#0F172A] text-[15px]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              Recommended <span className="text-[#F97316]">Hotels</span>
            </h2>
            <p className="text-[#475569] text-[18px] text-center mb-12">
              Special conference rates available at partner hotels. Mention conference code when booking.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#E2E8F0] hover:border-[#F97316] hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1E4ED8] text-white px-3 py-1 rounded-full inline-block mb-4">
                    <p className="text-[12px] font-semibold">{hotel.category}</p>
                  </div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-['Montserrat',sans-serif] font-bold mb-2">
                    {hotel.name}
                  </h3>
                  <p className="text-[#475569] text-[14px] mb-4">📍 {hotel.distance} from venue</p>
                  <p className="text-[#1E4ED8] text-[20px] font-bold mb-4">{hotel.price}<span className="text-[14px] font-normal text-[#475569]">/night</span></p>
                  <div className="space-y-2">
                    {hotel.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <span className="text-[#F97316]">✓</span>
                        <span className="text-[#0F172A] text-[14px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-[#FFF7ED] border-l-4 border-[#F97316] rounded-lg p-6">
              <p className="text-[#0F172A] text-[16px]">
                <strong>Note:</strong> Please mention "BNMIT Conference 2026" when booking to avail special rates. Book early as rooms are limited during conference dates.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              Explore <span className="text-[#F97316]">Bangalore</span>
            </h2>
            <p className="text-[#475569] text-[18px] text-center mb-12">
              Take some time to explore the Garden City's attractions
            </p>

            <div className="grid grid-cols-3 gap-6">
              {nearbyAttractions.map((attraction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl p-6 border-2 border-[#E2E8F0] shadow-lg hover:border-[#F97316] hover:shadow-xl transition-all"
                >
                  <div className="text-[48px] mb-4 text-center">{attraction.icon}</div>
                  <h3 className="text-[#0B1F3A] text-[20px] font-['Montserrat',sans-serif] font-bold mb-2 text-center">
                    {attraction.name}
                  </h3>
                  <p className="text-[#1E4ED8] text-[14px] font-semibold mb-3 text-center">{attraction.distance}</p>
                  <p className="text-[#475569] text-[14px] text-center leading-relaxed">
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
