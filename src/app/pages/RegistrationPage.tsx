import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { supabase } from "@/lib/supabase";


interface RegistrationPageProps {
  onNavigate: (page: string) => void;
}

export function RegistrationPage({ onNavigate }: RegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    registrationType: "",
    participantType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    country: "",
    paperTitle: "",
    trackNumber: "",
    dietaryRequirements: "",
    accommodation: false
  });

  const submitRegistration = async () => {
  // Basic required field validation
  if (
    !formData.registrationType ||
    !formData.participantType ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phone ||
    !formData.institution ||
    !formData.country
  ) {
    alert("Please fill all required fields.");
    return;
  }

  // Author-specific validation
  if (
    formData.registrationType === "author" &&
    (!formData.paperTitle || !formData.trackNumber)
  ) {
    alert("Paper title and track are required for authors.");
    return;
  }

  try {
    const { error } = await supabase
      .from("conference_registrations")
      .insert([
        {
          registration_type: formData.registrationType,
          participant_type: formData.participantType,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution,
          country: formData.country,
          paper_title:
            formData.registrationType === "author"
              ? formData.paperTitle
              : null,
          track_number:
            formData.registrationType === "author"
              ? formData.trackNumber
              : null,
          dietary_requirements: formData.dietaryRequirements,
          accommodation: formData.accommodation,
          payment_status: "pending"
        }
      ]);

    if (error) throw error;

    // ✅ Success → move to payment page
    onNavigate("payment");
  } catch (err) {
    console.error(err);
    alert("Registration failed. Please try again.");
  }
};

  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const registrationFees = [
    {
      category: "Indian Participants",
      types: [
        { type: "Student (Indian)", earlyBird: "₹800", regular: "₹1,200" },
        { type: "Faculty/Researcher (Indian)", earlyBird: "₹2,000", regular: "₹3,000" },
        { type: "Industry/Practitioner (Indian)", earlyBird: "₹3,000", regular: "₹4,000" }
      ]
    },
    {
      category: "International Participants",
      types: [
        { type: "Student (International)", earlyBird: "$60", regular: "$80" },
        { type: "Faculty/Researcher (International)", earlyBird: "$80", regular: "$100" },
        { type: "Industry/Practitioner (International)", earlyBird: "$120", regular: "$150" }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const steps = [
    { number: 1, title: "Registration Type", description: "Select your category" },
    { number: 2, title: "Personal Information", description: "Your details" },
    { number: 3, title: "Paper & Preferences", description: "Submission info" },
    { number: 4, title: "Review & Payment", description: "Confirm & pay" }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[36px] sm:text-[48px] lg:text-[64px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Conference <span className="text-[#F97316]">Registration</span>
            </h1>
            <p className="text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] max-w-[800px] mx-auto leading-relaxed">
              Secure your spot at the premier conference on strategic management and digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Fees */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16"
          >
            <h2 className="text-[#0B1F3A] text-[32px] sm:text-[40px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              Registration <span className="text-[#F97316]">Fees</span>
            </h2>
            <p className="text-[#475569] text-[16px] sm:text-[18px] text-center mb-8 lg:mb-12">
              Early bird rates valid until March 31, 2026
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {registrationFees.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-6 sm:p-8 border-2 border-[#E2E8F0] shadow-lg"
                >
                  <h3 className="text-[#0B1F3A] text-[22px] sm:text-[24px] lg:text-[28px] font-['Montserrat',sans-serif] font-bold mb-6">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.types.map((type, typeIndex) => (
                      <div key={typeIndex} className="bg-white rounded-lg p-4 border border-[#E2E8F0]">
                        <p className="text-[#0F172A] text-[14px] sm:text-[16px] font-semibold mb-3">{type.type}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-center flex-1">
                            <p className="text-[#475569] text-[11px] sm:text-[12px] mb-1">Early Bird</p>
                            <p className="text-[#1E4ED8] text-[18px] sm:text-[24px] font-bold">{type.earlyBird}</p>
                          </div>
                          <div className="w-px h-12 bg-[#E2E8F0]" />
                          <div className="text-center flex-1">
                            <p className="text-[#475569] text-[11px] sm:text-[12px] mb-1">Regular</p>
                            <p className="text-[#0B1F3A] text-[18px] sm:text-[24px] font-bold">{type.regular}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 lg:mt-8 bg-[#FFF7ED] border-l-4 border-[#F97316] rounded-lg p-4 sm:p-6"
            >
              <p className="text-[#0F172A] text-[14px] sm:text-[16px]">
                <strong>Note:</strong> Registration fee includes conference kit, meals, and access to all sessions. At least one author per accepted paper must register. Certificates for co-authors (not registered) will be provided upon payment of Rs. 500 per co-author.
              </p>
            </motion.div>

            {/* Bank Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 lg:mt-8 bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-2xl p-6 sm:p-8 text-white"
            >
              <h3 className="text-[22px] sm:text-[26px] font-['Montserrat',sans-serif] font-bold mb-6">
                Bank Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Account Name</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-semibold">BNMIT-MBA</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Bank Name</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-semibold">Canara Bank</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Account Number</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-semibold">1147101031035</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">IFSC Code</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-semibold">CNRB0001147</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:col-span-2">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Branch Address</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-semibold">24/25, 27th Cross, Sevakshetra Complex, Banashankari II Stage, Bangalore - 560070</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Branch Code</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-semibold">1147</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">MICR Code</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-semibold">560015006</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Multi-Step Form */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F8FAFC]"
      >
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.h2
            variants={fadeInUp}
            className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-8 lg:mb-12 text-center"
          >
            Complete Your <span className="text-[#F97316]">Registration</span>
          </motion.h2>

          {/* Progress Steps */}
          <motion.div variants={fadeInUp} className="mb-8 lg:mb-12">
            {/* Mobile Steps */}
            <div className="flex lg:hidden justify-between items-center mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex-1 flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: currentStep === step.number ? 1.1 : 1,
                      backgroundColor: currentStep >= step.number ? "#1E4ED8" : "#E2E8F0"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  >
                    <span className={`text-[14px] font-bold ${currentStep >= step.number ? "text-white" : "text-[#475569]"}`}>
                      {step.number}
                    </span>
                  </motion.div>
                  <p className={`text-[11px] font-medium text-center ${currentStep === step.number ? "text-[#0B1F3A]" : "text-[#94A3B8]"}`}>
                    {step.title.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Desktop Steps */}
            <div className="hidden lg:flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: currentStep === step.number ? 1.1 : 1,
                        backgroundColor: currentStep >= step.number ? "#1E4ED8" : "#E2E8F0"
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 relative z-10"
                    >
                      <span className={`text-[20px] font-bold ${currentStep >= step.number ? "text-white" : "text-[#475569]"}`}>
                        {step.number}
                      </span>
                    </motion.div>
                    <p className={`text-[16px] font-semibold mb-1 text-center ${currentStep === step.number ? "text-[#0B1F3A]" : "text-[#475569]"}`}>
                      {step.title}
                    </p>
                    <p className="text-[12px] text-[#475569] text-center">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[50%] w-full h-1 bg-[#E2E8F0]">
                      <motion.div
                        className="h-full bg-[#1E4ED8]"
                        initial={{ width: 0 }}
                        animate={{ width: currentStep > step.number ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-10 shadow-2xl border border-[#E2E8F0]"
          >
            {/* Step 1: Registration Type */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-[#0B1F3A] text-[28px] font-['Montserrat',sans-serif] font-bold mb-6">
                  Select Registration Type
                </h3>
                <div className="space-y-4">
                  <Label>Are you an author presenting a paper?</Label>
                  <RadioGroup value={formData.registrationType} onValueChange={(value: string) => handleInputChange("registrationType", value)}>
                    <div className="flex items-center space-x-3 bg-[#F8FAFC] p-4 rounded-lg border-2 border-transparent hover:border-[#1E4ED8] transition-all cursor-pointer">
                      <RadioGroupItem value="author" id="author" />
                      <Label htmlFor="author" className="cursor-pointer flex-1">
                        <p className="font-semibold text-[16px]">Author Registration</p>
                        <p className="text-[14px] text-[#475569]">For presenters with accepted papers</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-[#F8FAFC] p-4 rounded-lg border-2 border-transparent hover:border-[#1E4ED8] transition-all cursor-pointer">
                      <RadioGroupItem value="delegate" id="delegate" />
                      <Label htmlFor="delegate" className="cursor-pointer flex-1">
                        <p className="font-semibold text-[16px]">Delegate Registration</p>
                        <p className="text-[14px] text-[#475569]">For attendees without paper presentation</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  <Label>Participant Category</Label>
                  <Select value={formData.participantType} onValueChange={(value: string) => handleInputChange("participantType", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faculty">Faculty/Industry Professional</SelectItem>
                      <SelectItem value="research-scholar">Research Scholar/PhD Student</SelectItem>
                      <SelectItem value="student">Student (UG/PG)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-[#0B1F3A] text-[28px] font-['Montserrat',sans-serif] font-bold mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution/Organization *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                    placeholder="Your institution name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value: string) => handleInputChange("country", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Paper & Preferences */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-[#0B1F3A] text-[28px] font-['Montserrat',sans-serif] font-bold mb-6">
                  Paper Details & Preferences
                </h3>
                {formData.registrationType === "author" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="paperTitle">Paper Title *</Label>
                      <Input
                        id="paperTitle"
                        value={formData.paperTitle}
                        onChange={(e) => handleInputChange("paperTitle", e.target.value)}
                        placeholder="Enter your paper title"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trackNumber">Research Track *</Label>
                      <Select value={formData.trackNumber} onValueChange={(value: string) => handleInputChange("trackNumber", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select research track" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="track1">Track 1: Digital Transformation & Strategic Management</SelectItem>
                          <SelectItem value="track2">Track 2: Technology & Innovation Management</SelectItem>
                          <SelectItem value="track3">Track 3: Sustainability & Resilience</SelectItem>
                          <SelectItem value="track4">Track 4: Human Resource Management</SelectItem>
                          <SelectItem value="track5">Track 5: Financial Management & Fintech</SelectItem>
                          <SelectItem value="track6">Track 6: Marketing & Consumer Behavior</SelectItem>
                          <SelectItem value="track7">Track 7: Operations & Supply Chain</SelectItem>
                          <SelectItem value="track8">Track 8: Entrepreneurship & Strategy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="dietary">Dietary Requirements (if any)</Label>
                  <Input
                    id="dietary"
                    value={formData.dietaryRequirements}
                    onChange={(e) => handleInputChange("dietaryRequirements", e.target.value)}
                    placeholder="Vegetarian, vegan, allergies, etc."
                    className="h-12"
                  />
                </div>
                <div className="flex items-center space-x-3 bg-[#F8FAFC] p-4 rounded-lg">
                  <Checkbox
                    id="accommodation"
                    checked={formData.accommodation}
                    onCheckedChange={(checked: boolean) => handleInputChange("accommodation", checked)}
                  />
                  <Label htmlFor="accommodation" className="cursor-pointer">
                    <p className="font-semibold text-[16px]">I need accommodation assistance</p>
                    <p className="text-[14px] text-[#475569]">We'll provide information about nearby hotels</p>
                  </Label>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Payment */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-[#0B1F3A] text-[28px] font-['Montserrat',sans-serif] font-bold mb-6">
                  Review Your Registration
                </h3>
                <div className="bg-[#F8FAFC] rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#475569] text-[14px] mb-1">Registration Type</p>
                      <p className="text-[#0F172A] text-[16px] font-semibold capitalize">{formData.registrationType || "Not selected"}</p>
                    </div>
                    <div>
                      <p className="text-[#475569] text-[14px] mb-1">Participant Category</p>
                      <p className="text-[#0F172A] text-[16px] font-semibold capitalize">{formData.participantType?.replace("-", " ") || "Not selected"}</p>
                    </div>
                    <div>
                      <p className="text-[#475569] text-[14px] mb-1">Name</p>
                      <p className="text-[#0F172A] text-[16px] font-semibold">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-[#475569] text-[14px] mb-1">Email</p>
                      <p className="text-[#0F172A] text-[16px] font-semibold">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-[#475569] text-[14px] mb-1">Institution</p>
                      <p className="text-[#0F172A] text-[16px] font-semibold">{formData.institution}</p>
                    </div>
                    <div>
                      <p className="text-[#475569] text-[14px] mb-1">Country</p>
                      <p className="text-[#0F172A] text-[16px] font-semibold capitalize">{formData.country}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-lg p-6 text-white">
                  <h4 className="text-[20px] font-bold mb-4">Payment Information</h4>
                  <div className="flex justify-between items-center mb-4">
                    <span>Registration Fee:</span>
                    <span className="text-[28px] font-bold">₹8,000</span>
                  </div>
                  <p className="text-[14px] text-white/80 mb-4">
                    After clicking "Proceed to Payment", you will be redirected to our secure payment gateway.
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-[12px]">
                      <strong>Accepted Payment Methods:</strong> Credit Card, Debit Card, Net Banking, UPI, International Cards
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-[#E2E8F0] mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-8 py-3 rounded-lg font-semibold text-[16px] transition-all ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-[#0B1F3A] border-2 border-[#0B1F3A] hover:bg-[#F8FAFC]"
                }`}
              >
                Previous
              </motion.button>
              <div className="text-center">
                <p className="text-[#475569] text-[14px]">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={currentStep === 4 ? submitRegistration : handleNext}
                className="bg-[#F97316] text-white px-8 py-3 rounded-lg font-semibold text-[16px] hover:bg-[#ea580c] transition-colors shadow-lg"
              >
                {currentStep === 4 ? "Proceed to Payment" : "Next"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
