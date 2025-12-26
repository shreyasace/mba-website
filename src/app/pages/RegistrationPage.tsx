import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { supabase } from "../lib/supabase";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

interface RegistrationPageProps {
  onNavigate: (page: string) => void;
}

const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "Email address is required." };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address (e.g., name@example.com).",
    };
  }

  return { isValid: true };
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+[0-9]{10,15}$/;
  const cleanedPhone = phone.replace(/[\s-]/g, "");
  return phoneRegex.test(cleanedPhone);
};

interface FieldErrors {
  name?: string;
  nationality?: string;
  phone?: string;
  email?: string;
  affiliation?: string;
  placeOfAffiliation?: string;
  institution?: string;
  country?: string;
  paperTitle?: string;
  trackNumber?: string;
  paperId?: string;
  amountPaid?: string;
  paymentAccount?: string;
  transactionId?: string;
  paymentProof?: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

export function RegistrationPage({ onNavigate }: RegistrationPageProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeField, setShakeField] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [emailVerified, setEmailVerified] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem("registrationStep");
    return saved ? parseInt(saved) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("registrationFormData");
    return saved
      ? JSON.parse(saved)
      : {
          registrationType: "",
          participantType: "",
          name: "",
          nationality: "",
          email: "",
          phone: "",
          affiliation: "",
          placeOfAffiliation: "",
          institution: "",
          country: "",
          paperTitle: "",
          trackNumber: "",
          paperId: "",
          amountPaid: "",
          paymentAccount: "",
          transactionId: "",
          paymentProof: null,
          dietaryRequirements: "",
          accommodation: false,
        };
  });

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const error = hashParams.get("error");
    const errorDescription = hashParams.get("error_description");
    if (error) {
      let errorMessage = "Authentication failed. ";
      if (error === "access_denied" && errorDescription?.includes("expired")) {
        errorMessage =
          "Email verification link has expired. Please request a new one.";
      } else if (errorDescription) {
        errorMessage += errorDescription.replace(/\+/g, " ");
      }
      setAuthError(errorMessage);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setEmailVerified(true);
          setAuthError(null);
          localStorage.setItem("emailVerified", "true");
          localStorage.setItem("verifiedEmail", session.user.email || "");

          const savedStep = localStorage.getItem("registrationStep");
          if (savedStep && parseInt(savedStep) > 1) {
            setShowWelcomeBack(true);
            setTimeout(() => setShowWelcomeBack(false), 5000);
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setEmailVerified(true);
        localStorage.setItem("emailVerified", "true");
        localStorage.setItem("verifiedEmail", data.session.user.email || "");
      }
    });

    const wasVerified = localStorage.getItem("emailVerified") === "true";
    const verifiedEmail = localStorage.getItem("verifiedEmail");
    if (wasVerified && verifiedEmail && verifiedEmail === formData.email) {
      setEmailVerified(true);
    }
  }, [formData.email]);

  useEffect(() => {
    localStorage.setItem("registrationFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("registrationStep", currentStep.toString());
  }, [currentStep]);

  const sendMagicLink = async () => {
    if (!formData.email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      setIsSendingLink(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: window.location.origin + "./",
        },
      });

      if (error) throw error;
      alert("Verification link sent! Please check your email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send verification email.");
    } finally {
      setIsSendingLink(false);
    }
  };

  const submitRegistration = async () => {
    if (
      !formData.name ||
      !formData.nationality ||
      !formData.email ||
      !formData.phone ||
      !formData.affiliation ||
      !formData.placeOfAffiliation ||
      !formData.institution ||
      !formData.country
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (
      !formData.paperTitle ||
      !formData.trackNumber ||
      !formData.paperId
    ) {
      alert("Paper title, track, and paper ID are required.");
      return;
    }

    try {
      const { error } = await supabase
        .from("conference_registrations")
        .insert([
          {
            name: formData.name,
            nationality: formData.nationality,
            email: formData.email,
            phone: formData.phone,
            affiliation: formData.affiliation,
            place_of_affiliation: formData.placeOfAffiliation,
            institution: formData.institution,
            country: formData.country,
            paper_title: formData.paperTitle,
            track_number: formData.trackNumber,
            paper_id: formData.paperId,
            amount_paid: formData.amountPaid,
            payment_account: formData.paymentAccount,
            transaction_id: formData.transactionId,
            dietary_requirements: formData.dietaryRequirements,
            accommodation: formData.accommodation,
            payment_status: "pending",
          },
        ]);

      if (error) throw error;
      alert(
        "Registration submitted successfully! We will verify your payment and send confirmation to your email."
      );
      onNavigate("payment");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const registrationFees = [
    {
      category: "Indian Participants",
      types: [
        { type: "Student (Indian)", earlyBird: "₹800", regular: "₹1,200" },
        {
          type: "Faculty/Researcher (Indian)",
          earlyBird: "₹2,000",
          regular: "₹3,000",
        },
        {
          type: "Industry/Practitioner (Indian)",
          earlyBird: "₹3,000",
          regular: "₹4,000",
        },
      ],
    },
    {
      category: "International Participants",
      types: [
        {
          type: "Student (International)",
          earlyBird: "$60",
          regular: "$80",
        },
        {
          type: "Faculty/Researcher (International)",
          earlyBird: "$80",
          regular: "$100",
        },
        {
          type: "Industry/Practitioner (International)",
          earlyBird: "$120",
          regular: "$150",
        },
      ],
    },
  ];

  const feeOptions = [
    { value: "800", label: "Student (Indian) - Early Bird: ₹800" },
    { value: "1200", label: "Student (Indian) - Regular: ₹1,200" },
    { value: "2000", label: "Faculty/Researcher (Indian) - Early Bird: ₹2,000" },
    {
      value: "3000-faculty",
      label: "Faculty/Researcher (Indian) - Regular: ₹3,000",
    },
    {
      value: "3000-industry",
      label: "Industry/Practitioner (Indian) - Early Bird: ₹3,000",
    },
    {
      value: "4000",
      label: "Industry/Practitioner (Indian) - Regular: ₹4,000",
    },
    { value: "60", label: "Student (International) - Early Bird: $60" },
    { value: "80-student", label: "Student (International) - Regular: $80" },
    {
      value: "80-faculty",
      label: "Faculty/Researcher (International) - Early Bird: $80",
    },
    {
      value: "100",
      label: "Faculty/Researcher (International) - Regular: $100",
    },
    {
      value: "120",
      label: "Industry/Practitioner (International) - Early Bird: $120",
    },
    {
      value: "150",
      label: "Industry/Practitioner (International) - Regular: $150",
    },
  ];

  const handleNext = () => {
    if (currentStep === 2 && !emailVerified) {
      alert("Please verify your email before continuing.");
      return;
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (!touched[field] && field !== "email") {
      setTouched({
        ...touched,
        [field]: true,
      });
    }

    if (field === "email") {
      if (errors.email) {
        setErrors((prev) => ({
          ...prev,
          email: undefined,
        }));
      }
      return;
    }

    validateField(field, value);
  };

  const handleBlur = (field: string) => {
    setTouched({
      ...touched,
      [field]: true,
    });
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: any): string | undefined => {
    let error: string | undefined;

    switch (field) {
      case "name":
        if (!value || value.trim() === "") {
          error = "This field is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "nationality":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "phone":
        if (!value || value.trim() === "") {
          error = "This field is required";
        } else if (!validatePhone(value)) {
          error =
            "Enter a valid phone number with country code (e.g., +91 9876543210)";
        }
        break;
      case "email":
        const emailValidation = validateEmail(value || "");
        if (!emailValidation.isValid) {
          error = emailValidation.error;
        }
        break;
      case "affiliation":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "placeOfAffiliation":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "institution":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "country":
        if (!value) {
          error = "Please select a country";
        }
        break;
      case "paperTitle":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "trackNumber":
        if (!value) {
          error = "Please select a research track";
        }
        break;
      case "paperId":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "amountPaid":
        if (!value) {
          error = "Please select the amount you paid";
        }
        break;
      case "paymentAccount":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "transactionId":
        if (!value || value.trim() === "") {
          error = "This field is required";
        }
        break;
      case "paymentProof":
        if (!value) {
          error = "Please upload proof of payment";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
    return error;
  };

  const validateAllFields = (): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;

    const fieldsToValidate = [
      "name",
      "nationality",
      "phone",
      "email",
      "affiliation",
      "placeOfAffiliation",
      "institution",
      "country",
      "paperTitle",
      "trackNumber",
      "paperId",
      "amountPaid",
      "paymentAccount",
      "transactionId",
      "paymentProof",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) {
        newErrors[field as keyof FieldErrors] = error;
        isValid = false;
      }
    });

    const allTouched: TouchedFields = {};
    fieldsToValidate.forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);
    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const checkValidity = () => {
      const requiredFields = [
        "name",
        "nationality",
        "phone",
        "email",
        "affiliation",
        "placeOfAffiliation",
        "institution",
        "country",
        "paperTitle",
        "trackNumber",
        "paperId",
        "amountPaid",
        "paymentAccount",
        "transactionId",
        "paymentProof",
      ];

      for (const field of requiredFields) {
        const value = formData[field as keyof typeof formData];
        if (!value || (typeof value === "string" && value.trim() === "")) {
          setIsFormValid(false);
          return;
        }
      }

      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid || !validatePhone(formData.phone)) {
        setIsFormValid(false);
        return;
      }

      setIsFormValid(true);
    };

    checkValidity();
  }, [formData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          paymentProof: "File size must be less than 5MB",
        }));
        return;
      }

      setFormData({
        ...formData,
        paymentProof: file,
      });
      setErrors((prev) => ({
        ...prev,
        paymentProof: undefined,
      }));
      setTouched({
        ...touched,
        paymentProof: true,
      });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const isValid = validateAllFields();

    if (!isValid) {
      const errorFields = Object.keys(errors).filter(
        (key) => errors[key as keyof FieldErrors]
      );
      if (errorFields.length > 0) {
        const firstErrorField = errorFields[0];
        const fieldElement = fieldRefs.current[firstErrorField];
        if (fieldElement) {
          fieldElement.scrollIntoView({ behavior: "smooth", block: "center" });
          setShakeField(firstErrorField);
          setTimeout(() => setShakeField(null), 500);
        }
      }
      setIsSubmitting(false);
      return;
    }

    submitRegistration();
  };

  const getInputClassName = (
    field: string,
    baseClass: string = "h-10"
  ): string => {
    const hasError = touched[field] && errors[field as keyof FieldErrors];
    const isValid =
      touched[field] &&
      !errors[field as keyof FieldErrors] &&
      formData[field as keyof typeof formData];

    let className = baseClass;
    if (hasError) {
      className +=
        " border-2 border-[#E53935] bg-[#FFF5F5] focus:border-[#E53935] focus:ring-[#E53935]";
    } else if (isValid) {
      className +=
        " border-2 border-[#10B981] focus:border-[#10B981] focus:ring-[#10B981]";
    } else {
      className += " border-2 border-[#E2E8F0]";
    }
    if (shakeField === field) {
      className += " animate-shake";
    }
    return className;
  };

  const getSelectClassName = (field: string): string => {
    const hasError = touched[field] && errors[field as keyof FieldErrors];
    const isValid =
      touched[field] &&
      !errors[field as keyof FieldErrors] &&
      formData[field as keyof typeof formData];

    let className = "h-10";
    if (hasError) {
      className += " border-2 border-[#E53935] bg-[#FFF5F5]";
    } else if (isValid) {
      className += " border-2 border-[#10B981]";
    } else {
      className += " border-2 border-[#E2E8F0]";
    }
    if (shakeField === field) {
      className += " animate-shake";
    }
    return className;
  };

  const ErrorMessage = ({ field }: { field: keyof FieldErrors }) => {
    if (!touched[field] || !errors[field]) return null;
    return <p className="text-sm text-[#E53935] mt-2">{errors[field]}</p>;
  };

  const ValidIndicator = ({ field }: { field: string }) => {
    const isValid =
      touched[field] &&
      !errors[field as keyof FieldErrors] &&
      formData[field as keyof typeof formData];
    if (!isValid) return null;
    return <span className="text-[#10B981] ml-2">✓</span>;
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[32px] sm:text-[42px] lg:text-[56px] xl:text-[64px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Conference <span className="text-[#F97316]">Registration</span>
            </h1>
            <p className="text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] max-w-[800px] mx-auto leading-relaxed">
              Join us for a premier conference on strategic management and digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Fees Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        className="py-12 sm:py-16 lg:py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              Registration <span className="text-[#F97316]">Fees</span>
            </h2>
            <p className="text-[#475569] text-[15px] sm:text-[17px] text-center">
              Early bird rates valid until March 20, 2026
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {registrationFees.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-[#E2E8F0] overflow-hidden shadow-lg hover:shadow-xl hover:border-[#F97316] transition-all"
              >
                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1E4ED8] p-6 sm:p-8">
                  <h3 className="text-white text-[18px] sm:text-[20px] font-['Montserrat',sans-serif] font-bold">
                    {category.category}
                  </h3>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="space-y-4">
                    {category.types.map((type, typeIndex) => (
                      <div
                        key={typeIndex}
                        className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] last:border-0"
                      >
                        <div>
                          <p className="text-[#0B1F3A] text-[15px] sm:text-[16px] font-semibold">
                            {type.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#10B981] text-[14px] sm:text-[15px] font-semibold">
                            {type.earlyBird}
                          </p>
                          <p className="text-[#64748B] text-[13px] sm:text-[14px]">
                            {type.regular}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-8 sm:mt-12 bg-[#F0F9FF] border-2 border-[#0B1F3A]/20 rounded-xl p-6 sm:p-8"
          >
            <p className="text-[#0B1F3A] text-[14px] sm:text-[15px] leading-relaxed">
              <span className="font-semibold">Note:</span> Registration fee includes conference kit, meals, and access to all sessions. At least one author per accepted paper must register. Certificates for co-authors (not registered) will be provided upon payment of Rs. 500 per co-author.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Bank Details Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        className="py-12 sm:py-16 lg:py-24 bg-[#F8FAFC]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              Bank Account <span className="text-[#F97316]">Details</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-[900px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="bg-white rounded-xl border-2 border-[#E2E8F0] p-6 sm:p-8 shadow-lg hover:border-[#F97316] transition-all"
            >
              <p className="text-[#64748B] text-[13px] sm:text-[14px] font-semibold mb-2">
                Account Name
              </p>
              <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold">
                BNMIT-MBA
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl border-2 border-[#E2E8F0] p-6 sm:p-8 shadow-lg hover:border-[#F97316] transition-all"
            >
              <p className="text-[#64748B] text-[13px] sm:text-[14px] font-semibold mb-2">
                Bank Name
              </p>
              <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold">
                Canara Bank
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border-2 border-[#E2E8F0] p-6 sm:p-8 shadow-lg hover:border-[#F97316] transition-all"
            >
              <p className="text-[#64748B] text-[13px] sm:text-[14px] font-semibold mb-2">
                Account Number
              </p>
              <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold">
                1147101031035
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl border-2 border-[#E2E8F0] p-6 sm:p-8 shadow-lg hover:border-[#F97316] transition-all"
            >
              <p className="text-[#64748B] text-[13px] sm:text-[14px] font-semibold mb-2">
                IFSC Code
              </p>
              <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold">
                CNRB0001147
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border-2 border-[#E2E8F0] p-6 sm:p-8 shadow-lg hover:border-[#F97316] transition-all"
            >
              <p className="text-[#64748B] text-[13px] sm:text-[14px] font-semibold mb-2">
                Branch Code
              </p>
              <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold">
                1147
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-xl border-2 border-[#E2E8F0] p-6 sm:p-8 shadow-lg hover:border-[#F97316] transition-all"
            >
              <p className="text-[#64748B] text-[13px] sm:text-[14px] font-semibold mb-2">
                MICR Code
              </p>
              <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold">
                560015006
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border-2 border-[#E2E8F0] p-6 sm:p-8 shadow-lg hover:border-[#F97316] transition-all sm:col-span-2"
            >
              <p className="text-[#64748B] text-[13px] sm:text-[14px] font-semibold mb-2">
                Branch Address
              </p>
              <p className="text-[#0B1F3A] text-[15px] sm:text-[16px] font-bold leading-relaxed">
                24/25, 27th Cross, Sevakshetra Complex, Banashankari II Stage, Bangalore - 560070
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-8 sm:mt-12 bg-[#FFFBEB] border-2 border-[#FCD34D] rounded-xl p-6 sm:p-8"
          >
            <p className="text-[#7C2D12] text-[14px] sm:text-[15px] leading-relaxed">
              <span className="font-semibold">Note:</span> While paying through UPI, please add a note as 'Towards BNMIT Conference 2026'
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Registration Form Section */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="py-12 sm:py-16 lg:py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            variants={fadeInUp}
            className="mb-8 sm:mb-10 lg:mb-12"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Registration <span className="text-[#F97316]">Form</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] text-center max-w-[700px] mx-auto">
              Fill in your details to complete the registration process
            </p>
          </motion.div>

          {showWelcomeBack && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 sm:p-6 bg-[#DCFCE7] border-2 border-[#10B981] rounded-xl"
            >
              <p className="text-[#166534] text-[14px] sm:text-[15px] font-semibold">
                Welcome back! Your progress has been saved.
              </p>
            </motion.div>
          )}

          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 sm:p-6 bg-[#FEE2E2] border-2 border-[#DC2626] rounded-xl"
            >
              <p className="text-[#991B1B] text-[14px] sm:text-[15px] font-semibold">
                {authError}
              </p>
            </motion.div>
          )}

          <motion.form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-2xl border-2 border-[#E2E8F0] p-6 sm:p-8 lg:p-12"
          >
            {/* Personal Information */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] font-['Montserrat',sans-serif] font-bold mb-6 sm:mb-8 pb-4 border-b-2 border-[#F97316]">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div
                  ref={(el) => {
                    fieldRefs.current["name"] = el;
                  }}
                >
                  <Label htmlFor="name" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Enter your full name"
                    className={getInputClassName("name", "mt-2 h-12")}
                  />
                  <ErrorMessage field="name" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["nationality"] = el;
                  }}
                >
                  <Label htmlFor="nationality" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Nationality *
                  </Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    onBlur={() => handleBlur("nationality")}
                    placeholder="e.g., Indian"
                    className={getInputClassName("nationality", "mt-2 h-12")}
                  />
                  <ErrorMessage field="nationality" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["phone"] = el;
                  }}
                >
                  <Label htmlFor="phone" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Phone Number (with country code) *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    onBlur={() => handleBlur("phone")}
                    placeholder="+91 9876543210"
                    className={getInputClassName("phone", "mt-2 h-12")}
                  />
                  <ErrorMessage field="phone" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["email"] = el;
                  }}
                >
                  <Label htmlFor="email" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Email ID * {emailVerified && <span className="text-[#10B981] ml-1">✓</span>}
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onBlur={() => handleBlur("email")}
                      placeholder="your.email@example.com"
                      className={getInputClassName("email", "flex-1 h-12")}
                    />
                    {!emailVerified && (
                      <motion.button
                        type="button"
                        onClick={sendMagicLink}
                        disabled={isSendingLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-semibold text-[13px] sm:text-[14px] hover:bg-[#ea580c] disabled:bg-gray-400 transition-colors whitespace-nowrap"
                      >
                        {isSendingLink ? "Sending..." : "Verify"}
                      </motion.button>
                    )}
                  </div>
                  <ErrorMessage field="email" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["affiliation"] = el;
                  }}
                >
                  <Label htmlFor="affiliation" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Affiliation *
                  </Label>
                  <Input
                    id="affiliation"
                    value={formData.affiliation}
                    onChange={(e) =>
                      handleInputChange("affiliation", e.target.value)
                    }
                    onBlur={() => handleBlur("affiliation")}
                    placeholder="e.g., BNM Institute of Technology"
                    className={getInputClassName("affiliation", "mt-2 h-12")}
                  />
                  <ErrorMessage field="affiliation" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["placeOfAffiliation"] = el;
                  }}
                >
                  <Label htmlFor="placeOfAffiliation" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Place of Affiliation *
                  </Label>
                  <Input
                    id="placeOfAffiliation"
                    value={formData.placeOfAffiliation}
                    onChange={(e) =>
                      handleInputChange("placeOfAffiliation", e.target.value)
                    }
                    onBlur={() => handleBlur("placeOfAffiliation")}
                    placeholder="e.g., Bangalore, Karnataka"
                    className={getInputClassName("placeOfAffiliation", "mt-2 h-12")}
                  />
                  <ErrorMessage field="placeOfAffiliation" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["institution"] = el;
                  }}
                >
                  <Label htmlFor="institution" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Institution/Organization *
                  </Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) =>
                      handleInputChange("institution", e.target.value)
                    }
                    onBlur={() => handleBlur("institution")}
                    placeholder="Your institution name"
                    className={getInputClassName("institution", "mt-2 h-12")}
                  />
                  <ErrorMessage field="institution" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["country"] = el;
                  }}
                >
                  <Label htmlFor="country" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Country *
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => {
                      handleInputChange("country", value);
                      setTouched({ ...touched, country: true });
                    }}
                  >
                    <SelectTrigger
                      id="country"
                      className={getSelectClassName("country") + " mt-2"}
                    >
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage field="country" />
                </div>
              </div>
            </div>

            {/* Paper Details */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] font-['Montserrat',sans-serif] font-bold mb-6 sm:mb-8 pb-4 border-b-2 border-[#F97316]">
                Paper Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div
                  ref={(el) => {
                    fieldRefs.current["paperTitle"] = el;
                  }}
                  className="sm:col-span-2"
                >
                  <Label htmlFor="paperTitle" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Title of the Paper *
                  </Label>
                  <Input
                    id="paperTitle"
                    value={formData.paperTitle}
                    onChange={(e) =>
                      handleInputChange("paperTitle", e.target.value)
                    }
                    onBlur={() => handleBlur("paperTitle")}
                    placeholder="Enter your paper title"
                    className={getInputClassName("paperTitle", "mt-2 h-12")}
                  />
                  <ErrorMessage field="paperTitle" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["trackNumber"] = el;
                  }}
                >
                  <Label htmlFor="trackNumber" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Sub-Theme Track *
                  </Label>
                  <Select
                    value={formData.trackNumber}
                    onValueChange={(value) => {
                      handleInputChange("trackNumber", value);
                      setTouched({ ...touched, trackNumber: true });
                    }}
                  >
                    <SelectTrigger
                      id="trackNumber"
                      className={getSelectClassName("trackNumber") + " mt-2"}
                    >
                      <SelectValue placeholder="Select a track" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="track1">
                        Track 1: Digital Transformation & Strategic Management
                      </SelectItem>
                      <SelectItem value="track2">
                        Track 2: Artificial Intelligence & Data
                      </SelectItem>
                      <SelectItem value="track3">
                        Track 3: Innovation & Sustainability
                      </SelectItem>
                      <SelectItem value="track4">
                        Track 4: Human Capital & Future of Work
                      </SelectItem>
                      <SelectItem value="track5">
                        Track 5: Digital Marketing & Platforms
                      </SelectItem>
                      <SelectItem value="track6">
                        Track 6: Governance & Ethics
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage field="trackNumber" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["paperId"] = el;
                  }}
                >
                  <Label htmlFor="paperId" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Paper ID/Code *
                  </Label>
                  <Input
                    id="paperId"
                    value={formData.paperId}
                    onChange={(e) =>
                      handleInputChange("paperId", e.target.value)
                    }
                    onBlur={() => handleBlur("paperId")}
                    placeholder="e.g., ICSAR-2026-001"
                    className={getInputClassName("paperId", "mt-2 h-12")}
                  />
                  <ErrorMessage field="paperId" />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] font-['Montserrat',sans-serif] font-bold mb-6 sm:mb-8 pb-4 border-b-2 border-[#F97316]">
                Payment Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div
                  ref={(el) => {
                    fieldRefs.current["amountPaid"] = el;
                  }}
                  className="sm:col-span-2"
                >
                  <Label htmlFor="amountPaid" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Amount Paid *
                  </Label>
                  <Select
                    value={formData.amountPaid}
                    onValueChange={(value) => {
                      handleInputChange("amountPaid", value);
                      setTouched({ ...touched, amountPaid: true });
                    }}
                  >
                    <SelectTrigger
                      id="amountPaid"
                      className={getSelectClassName("amountPaid") + " mt-2"}
                    >
                      <SelectValue placeholder="Select the amount you paid" />
                    </SelectTrigger>
                    <SelectContent>
                      {feeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage field="amountPaid" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["paymentAccount"] = el;
                  }}
                >
                  <Label htmlFor="paymentAccount" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Account No. / UPI ID *
                  </Label>
                  <Input
                    id="paymentAccount"
                    value={formData.paymentAccount}
                    onChange={(e) =>
                      handleInputChange("paymentAccount", e.target.value)
                    }
                    onBlur={() => handleBlur("paymentAccount")}
                    placeholder="e.g., 1234567890 or yourname@upi"
                    className={getInputClassName("paymentAccount", "mt-2 h-12")}
                  />
                  <ErrorMessage field="paymentAccount" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["transactionId"] = el;
                  }}
                >
                  <Label htmlFor="transactionId" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Transaction ID *
                  </Label>
                  <Input
                    id="transactionId"
                    value={formData.transactionId}
                    onChange={(e) =>
                      handleInputChange("transactionId", e.target.value)
                    }
                    onBlur={() => handleBlur("transactionId")}
                    placeholder="Enter your transaction ID"
                    className={getInputClassName("transactionId", "mt-2 h-12")}
                  />
                  <ErrorMessage field="transactionId" />
                </div>

                <div
                  ref={(el) => {
                    fieldRefs.current["paymentProof"] = el;
                  }}
                  className="sm:col-span-2"
                >
                  <Label htmlFor="paymentProof" className="text-[#0B1F3A] font-semibold text-[14px] sm:text-[15px]">
                    Upload Proof of Payment *
                  </Label>
                  <input
                    id="paymentProof"
                    type="file"
                    onChange={handleFileChange}
                    onBlur={() => handleBlur("paymentProof")}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className={getInputClassName("paymentProof", "mt-2 h-12")}
                  />
                  <p className="text-[#64748B] text-[12px] sm:text-[13px] mt-2">
                    Accepted: JPG, PNG, PDF (Max 5MB)
                  </p>
                  {formData.paymentProof && !errors.paymentProof && (
                    <p className="text-[#10B981] text-[13px] sm:text-[14px] mt-2 font-semibold">
                      ✓ File: {(formData.paymentProof as File).name}
                    </p>
                  )}
                  <ErrorMessage field="paymentProof" />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="border-t-2 border-[#E2E8F0] pt-6 sm:pt-8">
              <p className="text-[#475569] text-[13px] sm:text-[14px] mb-4 leading-relaxed">
                By submitting, you agree to our terms and conditions. We will verify your payment and send confirmation to your email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-[#0B1F3A] to-[#1E4ED8] text-white px-8 py-3 sm:py-4 rounded-lg font-['Montserrat',sans-serif] font-semibold text-[14px] sm:text-[16px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white text-center"
          >
            <h3 className="text-[24px] sm:text-[32px] lg:text-[40px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Questions About Registration?
            </h3>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-6 sm:mb-8 max-w-[700px] mx-auto opacity-90">
              Contact us at bnmitconference@bnmit.in for any queries or assistance
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}