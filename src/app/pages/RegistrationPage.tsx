import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

import { supabase } from "../../lib/supabase";


interface RegistrationPageProps {
  onNavigate: (page: string) => void;
}

// Validation helper functions
const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required.' };
  }

  // Strict email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g., name@example.com).' };
  }

  // Domain sanity validation for common providers
  const lowerEmail = email.toLowerCase();
  const domainPart = lowerEmail.split('@')[1];
  if (domainPart) {
    const domainName = domainPart.split('.')[0];
    const tld = domainPart.split('.').pop() || '';
    
    const commonProviders = ['gmail', 'yahoo', 'outlook', 'hotmail'];
    if (commonProviders.includes(domainName) && tld.length < 3) {
      return { 
        isValid: false, 
        error: `Please enter a valid email address (e.g., name@${domainName}.com).` 
      };
    }
  }

  return { isValid: true };
};

const validatePhone = (phone: string): boolean => {
  // Must start with + and have 10-15 digits
  const phoneRegex = /^\+[0-9]{10,15}$/;
  const cleanedPhone = phone.replace(/[\s-]/g, '');
  return phoneRegex.test(cleanedPhone);
};

// Field error type
interface FieldErrors {
  name?: string;
  nationality?: string;
  phone?: string;
  email?: string;
  affiliation?: string;
  placeOfAffiliation?: string;
  paperTitle?: string;
  trackNumber?: string;
  paperId?: string;
  amountPaid?: string;
  paymentAccount?: string;
  transactionId?: string;
  paymentProof?: string;
}
}

// Touched fields type
interface TouchedFields {
  [key: string]: boolean;
}

export function RegistrationPage({ onNavigate }: RegistrationPageProps) {
// removed merge conflict marker


  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeField, setShakeField] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
// removed merge conflict marker
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // Initialize from localStorage if available
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('registrationStep');
    return saved ? parseInt(saved) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('registrationFormData');
    return saved ? JSON.parse(saved) : {
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
    };
  });

  // Check for auth errors in URL on mount
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const error = hashParams.get('error');
    const errorDescription = hashParams.get('error_description');
    
    if (error) {
      let errorMessage = 'Authentication failed. ';
      
      if (error === 'access_denied' && errorDescription?.includes('expired')) {
        errorMessage = 'Email verification link has expired. Please request a new one.';
      } else if (errorDescription) {
        errorMessage += errorDescription.replace(/\+/g, ' ');
      }
      
      setAuthError(errorMessage);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setEmailVerified(true);
        setAuthError(null);
        
        // Store email verification status
        localStorage.setItem('emailVerified', 'true');
        localStorage.setItem('verifiedEmail', session.user.email || '');
        
        // Show welcome back message if there's saved progress
        const savedStep = localStorage.getItem('registrationStep');
        if (savedStep && parseInt(savedStep) > 1) {
          setShowWelcomeBack(true);
          setTimeout(() => setShowWelcomeBack(false), 5000);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setEmailVerified(true);
        localStorage.setItem('emailVerified', 'true');
        localStorage.setItem('verifiedEmail', data.session.user.email || '');
      }
    });

    // Check if email was previously verified
    const wasVerified = localStorage.getItem('emailVerified') === 'true';
    const verifiedEmail = localStorage.getItem('verifiedEmail');
    
    if (wasVerified && verifiedEmail && verifiedEmail === formData.email) {
      setEmailVerified(true);
    }
  }, [formData.email]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('registrationFormData', JSON.stringify(formData));
  }, [formData]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('registrationStep', currentStep.toString());
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
        emailRedirectTo: window.location.origin + "./"
      }
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
// removed merge conflict marker

  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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


  const feeOptions = [
    { value: "800", label: "Student (Indian) - Early Bird: ₹800" },
    { value: "1200", label: "Student (Indian) - Regular: ₹1,200" },
    { value: "2000", label: "Faculty/Researcher (Indian) - Early Bird: ₹2,000" },
    { value: "3000-faculty", label: "Faculty/Researcher (Indian) - Regular: ₹3,000" },
    { value: "3000-industry", label: "Industry/Practitioner (Indian) - Early Bird: ₹3,000" },
    { value: "4000", label: "Industry/Practitioner (Indian) - Regular: ₹4,000" },
    { value: "60", label: "Student (International) - Early Bird: $60" },
    { value: "80-student", label: "Student (International) - Regular: $80" },
    { value: "80-faculty", label: "Faculty/Researcher (International) - Early Bird: $80" },
    { value: "100", label: "Faculty/Researcher (International) - Regular: $100" },
    { value: "120", label: "Industry/Practitioner (International) - Early Bird: $120" },
    { value: "150", label: "Industry/Practitioner (International) - Regular: $150" }
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
    setFormData({ ...formData, [field]: value });
    // Mark field as touched (but for email, only mark on blur)
    if (!touched[field] && field !== 'email') {
      setTouched({ ...touched, [field]: true });
    }
    // For email: clear errors while typing, don't validate until blur
    if (field === 'email') {
      // Clear the error when user starts typing
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
      return; // Don't validate email on every keystroke
    }
    // Validate other fields on change
    validateField(field, value);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: any): string | undefined => {
    let error: string | undefined;

    switch (field) {
      case 'name':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'nationality':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'phone':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        } else if (!validatePhone(value)) {
          error = 'Enter a valid phone number with country code (e.g., +91 9876543210)';
        }
        break;
      case 'email':
        const emailValidation = validateEmail(value || '');
        if (!emailValidation.isValid) {
          error = emailValidation.error;
        }
        break;
      case 'affiliation':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'placeOfAffiliation':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'paperTitle':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'trackNumber':
        if (!value) {
          error = 'Please select a research track';
        }
        break;
      case 'paperId':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'amountPaid':
        if (!value) {
          error = 'Please select the amount you paid';
        }
        break;
      case 'paymentAccount':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'transactionId':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'paymentProof':
        if (!value) {
          error = 'Please upload proof of payment';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAllFields = (): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field as keyof FieldErrors] = error;
        isValid = false;
      }
    });

    // Mark all fields as touched
    const allTouched: TouchedFields = {};
    Object.keys(formData).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    setErrors(newErrors);
    return isValid;
  };

  // Check form validity on every change
  useEffect(() => {
    const checkValidity = () => {
      const requiredFields = ['name', 'nationality', 'phone', 'email', 'affiliation', 'placeOfAffiliation', 'paperTitle', 'trackNumber', 'paperId', 'amountPaid', 'paymentAccount', 'transactionId', 'paymentProof'];
      
      for (const field of requiredFields) {
        const value = formData[field as keyof typeof formData];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          setIsFormValid(false);
          return;
        }
      }
      
      // Check specific validations
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
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, paymentProof: 'File size must be less than 5MB' }));
        return;
      }
      setFormData({ ...formData, paymentProof: file });
      setErrors(prev => ({ ...prev, paymentProof: undefined }));
      setTouched({ ...touched, paymentProof: true });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    const isValid = validateAllFields();
    
    if (!isValid) {
      // Find first error field and scroll to it
      const errorFields = Object.keys(errors).filter(key => errors[key as keyof FieldErrors]);
      if (errorFields.length > 0) {
        const firstErrorField = errorFields[0];
        const fieldElement = fieldRefs.current[firstErrorField];
        if (fieldElement) {
          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Trigger shake animation
          setShakeField(firstErrorField);
          setTimeout(() => setShakeField(null), 500);
        }
      }
      setIsSubmitting(false);
      return;
    }
    
    // Success
    alert("Registration submitted successfully! We will verify your payment and send confirmation to your email.");
    setIsSubmitting(false);
  };

  // Get input class based on validation state
  const getInputClassName = (field: string, baseClass: string = "h-10"): string => {
    const hasError = touched[field] && errors[field as keyof FieldErrors];
    const isValid = touched[field] && !errors[field as keyof FieldErrors] && formData[field as keyof typeof formData];
    
    let className = baseClass;
    
    if (hasError) {
      className += " border-[#E53935] bg-[#FFF5F5] focus:border-[#E53935] focus:ring-[#E53935]";
    } else if (isValid) {
      className += " border-[#10B981] focus:border-[#10B981] focus:ring-[#10B981]";
    }
    
    if (shakeField === field) {
      className += " animate-shake";
    }
    
    return className;
  };

  // Get select trigger class based on validation state
  const getSelectClassName = (field: string): string => {
    const hasError = touched[field] && errors[field as keyof FieldErrors];
    const isValid = touched[field] && !errors[field as keyof FieldErrors] && formData[field as keyof typeof formData];
    
    let className = "h-10";
    
    if (hasError) {
      className += " border-[#E53935] bg-[#FFF5F5]";
    } else if (isValid) {
      className += " border-[#10B981]";
    }
    
    if (shakeField === field) {
      className += " animate-shake";
    }
    
    return className;
  };

  // Error message component
  const ErrorMessage = ({ field }: { field: keyof FieldErrors }) => {
    if (!touched[field] || !errors[field]) return null;
    
    return (
      <p className="text-[#E53935] text-[11px] sm:text-[12px] mt-1 flex items-center gap-1" role="alert" aria-live="polite">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {errors[field]}
      </p>
    );
  };

  // Valid indicator component
  const ValidIndicator = ({ field }: { field: string }) => {
    const isValid = touched[field] && !errors[field as keyof FieldErrors] && formData[field as keyof typeof formData];
    
    if (!isValid) return null;
    
    return (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#10B981]">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white text-[28px] sm:text-[36px] lg:text-[44px] font-['Montserrat',sans-serif] font-bold mb-2 sm:mb-3">
              Conference <span className="text-[#F97316]">Registration</span>
            </h1>
            <p className="text-white/90 text-[14px] sm:text-[16px] lg:text-[17px] max-w-[700px] mx-auto">
              Secure your spot at the premier conference on strategic management and digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Fees */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 lg:mb-12"
          >
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-2 text-center">
              Registration <span className="text-[#F97316]">Fees</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] text-center mb-8 lg:mb-10">
              Early bird rates valid until March 20, 2026
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {registrationFees.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F8FAFC] rounded-lg p-5 sm:p-6 border border-[#E2E8F0]"
                >
                  <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] lg:text-[22px] font-['Montserrat',sans-serif] font-bold mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.types.map((type, typeIndex) => (
                      <div key={typeIndex} className="bg-white rounded-md p-3 border border-[#E2E8F0]">
                        <p className="text-[#0F172A] text-[13px] sm:text-[14px] font-semibold mb-2">{type.type}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-center flex-1">
                            <p className="text-[#475569] text-[10px] sm:text-[11px] mb-0.5">Early Bird</p>
                            <p className="text-[#1E4ED8] text-[16px] sm:text-[20px] font-bold">{type.earlyBird}</p>
                          </div>
                          <div className="w-px h-10 bg-[#E2E8F0]" />
                          <div className="text-center flex-1">
                            <p className="text-[#475569] text-[10px] sm:text-[11px] mb-0.5">Regular</p>
                            <p className="text-[#0B1F3A] text-[16px] sm:text-[20px] font-bold">{type.regular}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 bg-[#FFF7ED] border-l-4 border-[#F97316] rounded-md p-4"
            >
              <p className="text-[#0F172A] text-[13px] sm:text-[14px]">
                <strong>Note:</strong> Registration fee includes conference kit, meals, and access to all sessions. At least one author per accepted paper must register. Certificates for co-authors (not registered) will be provided upon payment of Rs. 500 per co-author.
              </p>
            </motion.div>

            {/* Bank Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl p-6 sm:p-8 text-white"
            >
              <h3 className="text-[20px] sm:text-[24px] font-['Montserrat',sans-serif] font-bold mb-6">
                Bank Account Details
              </h3>
              
              {/* Bank Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Account Name</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">BNMIT-MBA</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Bank Name</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">Canara Bank</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Account Number</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">1147101031035</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">IFSC Code</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">CNRB0001147</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Branch Code</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">1147</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">MICR Code</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">560015006</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:col-span-2">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Branch Address</p>
                  <p className="text-white text-[14px] sm:text-[15px] font-semibold">24/25, 27th Cross, Sevakshetra Complex, Banashankari II Stage, Bangalore - 560070</p>
                </div>
              </div>
              
              {/* UPI Note */}
              <div className="mt-6 bg-[#F97316] rounded-lg p-4">
                <p className="text-white text-[14px] sm:text-[15px] font-medium">
                  <strong>Note:</strong> While paying through UPI, please add a note as <span className="underline font-bold">'Towards BNMIT Conference 2026'</span>
                </p>
              </div>
              
              {/* QR Code - Below Bank Details */}
              <div className="mt-6 flex justify-center">
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg inline-block">
                  <img 
                    src="/UPICODE.png" 
                    alt="UPI QR Code for Payment" 
                    className="w-[280px] sm:w-[320px] lg:w-[360px] h-auto mx-auto"
                  />
                  <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold mt-4 text-center">Scan to Pay via UPI</p>
                  <p className="text-[#475569] text-[13px] sm:text-[14px] text-center mt-1">Works with GPay, PhonePe, Paytm & all UPI apps</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="py-10 sm:py-12 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[28px] lg:text-[32px] font-['Montserrat',sans-serif] font-bold mb-6 text-center">
              Cancellation & <span className="text-[#F97316]">Refund Policy</span>
            </h2>
            
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
              {/* Refund Policy Row */}
              <div className="flex flex-col sm:flex-row border-b border-[#E2E8F0]">
                <div className="sm:w-1/4 bg-[#0B1F3A] px-6 py-5 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-[16px] sm:text-[18px]">Refund Policy</span>
                  </div>
                </div>
                <div className="sm:w-3/4 px-6 py-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#334155] text-[14px] sm:text-[15px]">
                      <span className="font-bold text-[#0B1F3A]">Before April 05, 2026:</span> Full refund will be provided (₹1,000 cancellation charges applicable)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-[#334155] text-[14px] sm:text-[15px]">
                      <span className="font-bold text-[#0B1F3A]">After April 05, 2026:</span> No refund will be provided
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Row */}
              <div className="flex flex-col sm:flex-row border-b border-[#E2E8F0]">
                <div className="sm:w-1/4 bg-[#0B1F3A] px-6 py-5 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-[16px] sm:text-[18px]">Contact</span>
                  </div>
                </div>
                <div className="sm:w-3/4 px-6 py-5 flex items-center">
                  <p className="text-[#334155] text-[14px] sm:text-[15px]">
                    Submit cancellation requests in writing to <a href="mailto:bnmitconference@bnmit.in" className="text-[#1E4ED8] font-bold hover:underline">bnmitconference@bnmit.in</a>
                  </p>
                </div>
              </div>

              {/* No-Show Row */}
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4 bg-[#0B1F3A] px-6 py-5 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-[16px] sm:text-[18px]">No-Show</span>
                  </div>
                </div>
                <div className="sm:w-3/4 px-6 py-5 flex items-center">
                  <p className="text-[#334155] text-[14px] sm:text-[15px]">
                    No refunds will be provided for attendees who fail to attend the conference without prior cancellation
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="py-12 sm:py-16 lg:py-20 bg-white border-t border-[#E2E8F0]"
      >
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.h2
            variants={fadeInUp}
            className="text-[#0B1F3A] text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-6 text-center"
          >
            Registration <span className="text-[#F97316]">Form</span>
          </motion.h2>

          {/* Form Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#F8FAFC] rounded-lg p-5 sm:p-6 lg:p-8 border border-[#E2E8F0]"
          >
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
              {/* Personal Information Section */}
              <div className="border-b border-[#E2E8F0] pb-5">
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2" ref={(el) => { fieldRefs.current['name'] = el; }}>
                    <Label htmlFor="name" className="text-[13px]">Full Name *</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="Enter your full name"
                        className={getInputClassName("name")}
                        aria-invalid={touched.name && !!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      <ValidIndicator field="name" />
                    </div>
                    <ErrorMessage field="name" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['nationality'] = el; }}>
                    <Label htmlFor="nationality" className="text-[13px]">Nationality *</Label>
                    <div className="relative">
                      <Input
                        id="nationality"
                        value={formData.nationality}
                        onChange={(e) => handleInputChange("nationality", e.target.value)}
                        onBlur={() => handleBlur("nationality")}
                        placeholder="e.g., Indian"
                        className={getInputClassName("nationality")}
                        aria-invalid={touched.nationality && !!errors.nationality}
                        aria-describedby={errors.nationality ? "nationality-error" : undefined}
                      />
                      <ValidIndicator field="nationality" />
                    </div>
                    <ErrorMessage field="nationality" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['phone'] = el; }}>
                    <Label htmlFor="phone" className="text-[13px]">Phone Number (with country code) *</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="+91 9876543210"
                        className={getInputClassName("phone")}
                        aria-invalid={touched.phone && !!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      <ValidIndicator field="phone" />
                    </div>
                    <ErrorMessage field="phone" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2" ref={(el) => { fieldRefs.current['email'] = el; }}>
                    <Label htmlFor="email" className="text-[13px]">Email ID *</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="your.email@example.com"
                        className={getInputClassName("email")}
                        aria-invalid={touched.email && !!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      <ValidIndicator field="email" />
                    </div>
                    <ErrorMessage field="email" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['affiliation'] = el; }}>
                    <Label htmlFor="affiliation" className="text-[13px]">Affiliation *</Label>
                    <div className="relative">
                      <Input
                        id="affiliation"
                        value={formData.affiliation}
                        onChange={(e) => handleInputChange("affiliation", e.target.value)}
                        onBlur={() => handleBlur("affiliation")}
                        placeholder="e.g., BNM Institute of Technology"
                        className={getInputClassName("affiliation")}
                        aria-invalid={touched.affiliation && !!errors.affiliation}
                        aria-describedby={errors.affiliation ? "affiliation-error" : undefined}
                      />
                      <ValidIndicator field="affiliation" />
                    </div>
                    <ErrorMessage field="affiliation" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['placeOfAffiliation'] = el; }}>
                    <Label htmlFor="placeOfAffiliation" className="text-[13px]">Place of Affiliation *</Label>
                    <div className="relative">
                      <Input
                        id="placeOfAffiliation"
                        value={formData.placeOfAffiliation}
                        onChange={(e) => handleInputChange("placeOfAffiliation", e.target.value)}
                        onBlur={() => handleBlur("placeOfAffiliation")}
                        placeholder="e.g., Bangalore, Karnataka, India"
                        className={getInputClassName("placeOfAffiliation")}
                        aria-invalid={touched.placeOfAffiliation && !!errors.placeOfAffiliation}
                        aria-describedby={errors.placeOfAffiliation ? "placeOfAffiliation-error" : undefined}
                      />
                      <ValidIndicator field="placeOfAffiliation" />
                    </div>
                    <ErrorMessage field="placeOfAffiliation" />
                  </div>
                </div>
<<<<<<< HEAD
              </div>
=======
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>

                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled={emailVerified}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-12"
                  />

                  {!emailVerified ? (
                    <button
                      type="button"
                      onClick={sendMagicLink}
                      disabled={isSendingLink}
                      className="text-sm text-[#1E4ED8] font-semibold hover:underline"
                    >
                      {isSendingLink ? "Sending verification link..." : "Verify email"}
                    </button>
                  ) : (
                    <p className="text-green-600 text-sm font-semibold">
                      ✓ Email verified
                    </p>
                  )}
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
>>>>>>> d8d9962665b5be0570078128bc4ae96cca23f498

              {/* Paper Details Section */}
              <div className="border-b border-[#E2E8F0] pb-5">
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-4">
                  Paper Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2" ref={(el) => { fieldRefs.current['paperTitle'] = el; }}>
                    <Label htmlFor="paperTitle" className="text-[13px]">Title of the Paper *</Label>
                    <div className="relative">
                      <Input
                        id="paperTitle"
                        value={formData.paperTitle}
                        onChange={(e) => handleInputChange("paperTitle", e.target.value)}
                        onBlur={() => handleBlur("paperTitle")}
                        placeholder="Enter your paper title"
                        className={getInputClassName("paperTitle")}
                        aria-invalid={touched.paperTitle && !!errors.paperTitle}
                        aria-describedby={errors.paperTitle ? "paperTitle-error" : undefined}
                      />
                      <ValidIndicator field="paperTitle" />
                    </div>
                    <ErrorMessage field="paperTitle" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['trackNumber'] = el; }}>
                    <Label htmlFor="trackNumber" className="text-[13px]">Sub-Theme Track *</Label>
                    <Select 
                      value={formData.trackNumber} 
                      onValueChange={(value: string) => {
                        handleInputChange("trackNumber", value);
                        setTouched({ ...touched, trackNumber: true });
                      }}
                    >
                      <SelectTrigger 
                        className={getSelectClassName("trackNumber")}
                        aria-invalid={touched.trackNumber && !!errors.trackNumber}
                      >
                        <SelectValue placeholder="Select research track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="track1">Track 1: Digital Transformation & Strategic Management</SelectItem>
                        <SelectItem value="track2">Track 2: Artificial Intelligence, Data & Decision-Making</SelectItem>
                        <SelectItem value="track3">Track 3: Innovation, Sustainability & Emerging Technologies</SelectItem>
                        <SelectItem value="track4">Track 4: Human Capital & Future of Work</SelectItem>
                        <SelectItem value="track5">Track 5: Digital Marketing, Platforms & Consumer Behavior</SelectItem>
                        <SelectItem value="track6">Track 6: Governance, Ethics & Risk in Tech-Driven Management</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorMessage field="trackNumber" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['paperId'] = el; }}>
                    <Label htmlFor="paperId" className="text-[13px]">Paper ID/Code *</Label>
                    <div className="relative">
                      <Input
                        id="paperId"
                        value={formData.paperId}
                        onChange={(e) => handleInputChange("paperId", e.target.value)}
                        onBlur={() => handleBlur("paperId")}
                        placeholder="e.g., ICSAR-2026-001"
                        className={getInputClassName("paperId")}
                        aria-invalid={touched.paperId && !!errors.paperId}
                        aria-describedby={errors.paperId ? "paperId-error" : undefined}
                      />
                      <ValidIndicator field="paperId" />
                    </div>
                    <ErrorMessage field="paperId" />
                  </div>
                </div>
              </div>

              {/* Payment Details Section */}
              <div className="border-b border-[#E2E8F0] pb-5">
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-4">
                  Payment Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['amountPaid'] = el; }}>
                    <Label htmlFor="amountPaid" className="text-[13px]">Amount Paid *</Label>
                    <Select 
                      value={formData.amountPaid} 
                      onValueChange={(value: string) => {
                        handleInputChange("amountPaid", value);
                        setTouched({ ...touched, amountPaid: true });
                      }}
                    >
                      <SelectTrigger 
                        className={getSelectClassName("amountPaid")}
                        aria-invalid={touched.amountPaid && !!errors.amountPaid}
                      >
                        <SelectValue placeholder="Select the amount you paid" />
                      </SelectTrigger>
                      <SelectContent>
                        {feeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage field="amountPaid" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5" ref={(el) => { fieldRefs.current['paymentAccount'] = el; }}>
                      <Label htmlFor="paymentAccount" className="text-[13px]">Account No. / UPI ID *</Label>
                      <div className="relative">
                        <Input
                          id="paymentAccount"
                          value={formData.paymentAccount}
                          onChange={(e) => handleInputChange("paymentAccount", e.target.value)}
                          onBlur={() => handleBlur("paymentAccount")}
                          placeholder="e.g., 1234567890 or yourname@upi"
                          className={getInputClassName("paymentAccount")}
                          aria-invalid={touched.paymentAccount && !!errors.paymentAccount}
                          aria-describedby={errors.paymentAccount ? "paymentAccount-error" : undefined}
                        />
                        <ValidIndicator field="paymentAccount" />
                      </div>
                      <ErrorMessage field="paymentAccount" />
                    </div>
                    <div className="space-y-1.5" ref={(el) => { fieldRefs.current['transactionId'] = el; }}>
                      <Label htmlFor="transactionId" className="text-[13px]">Transaction ID *</Label>
                      <div className="relative">
                        <Input
                          id="transactionId"
                          value={formData.transactionId}
                          onChange={(e) => handleInputChange("transactionId", e.target.value)}
                          onBlur={() => handleBlur("transactionId")}
                          placeholder="Enter your payment transaction ID"
                          className={getInputClassName("transactionId")}
                          aria-invalid={touched.transactionId && !!errors.transactionId}
                          aria-describedby={errors.transactionId ? "transactionId-error" : undefined}
                        />
                        <ValidIndicator field="transactionId" />
                      </div>
                      <ErrorMessage field="transactionId" />
                    </div>
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['paymentProof'] = el; }}>
                    <Label htmlFor="paymentProof" className="text-[13px]">Upload Proof of Payment *</Label>
                    <div className={`relative ${touched.paymentProof && errors.paymentProof ? 'border-[#E53935] bg-[#FFF5F5]' : ''} rounded-md`}>
                      <input
                        type="file"
                        id="paymentProof"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className={`block w-full text-[13px] text-[#475569] file:mr-3 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-[13px] file:font-semibold file:bg-[#1E4ED8] file:text-white hover:file:bg-[#1a3eb3] file:cursor-pointer cursor-pointer border rounded-md transition-colors duration-200 ${
                          touched.paymentProof && errors.paymentProof 
                            ? 'border-[#E53935] bg-[#FFF5F5]' 
                            : touched.paymentProof && formData.paymentProof 
                              ? 'border-[#10B981]' 
                              : 'border-[#E2E8F0]'
                        }`}
                        aria-invalid={touched.paymentProof && !!errors.paymentProof}
                      />
                    </div>
                    <p className="text-[11px] text-[#475569]">
                      Accepted: JPG, PNG, PDF (Max 5MB)
                    </p>
                    <ErrorMessage field="paymentProof" />
                    {formData.paymentProof && !errors.paymentProof && (
                      <p className="text-[13px] text-[#10B981] font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        File: {formData.paymentProof.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="button"
                  disabled
                  className="w-full py-3.5 rounded-md font-semibold text-[15px] transition-all duration-200 bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  CMT submission link will be coming shortly
                </motion.button>
                <p className="text-center text-[12px] text-[#475569] mt-3">
                  By submitting, you agree to our terms and conditions. We will verify your payment and send confirmation to your email.
                </p>
              </div>
<<<<<<< HEAD
            </form>
=======
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={currentStep === 4 ? submitRegistration : handleNext}
                className="bg-[#F97316] text-white px-8 py-3 rounded-lg font-semibold text-[16px] hover:bg-[#ea580c] transition-colors shadow-lg"
              >
                {currentStep === 4 ? "Proceed to Payment" : "Next"}
              </motion.button>
            </div>
>>>>>>> d8d9962665b5be0570078128bc4ae96cca23f498
