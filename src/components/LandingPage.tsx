import React, { useState } from "react";
import { 
  Sparkles, BookOpen, Laptop, Code, Award, CheckCircle2, 
  ChevronDown, ChevronUp, ArrowRight, ShieldCheck, HelpCircle, 
  Send, Users, GraduationCap, Briefcase, Home, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PersonaType, CourseModule, Testimonial } from "../types";

// Static data tailored to target audiences
const PERSONAS_DATA = {
  student: {
    id: "student" as PersonaType,
    title: "Students & Graduates",
    badge: "Pocket Money & Career Boost",
    hook: "Launch Your Freelance Career Before Graduation",
    subHook: "Don't wait for placements. Learn to build premium, client-ready websites and earn ₹15,000+ monthly from your hostel room.",
    painPoint: "Struggling to build a resume that stands out, or seeking high-paying freelance work instead of low-paying interns.",
    dreamOutcome: "Getting hired as a frontend developer, building a solid portfolio, and making passive pocket-money coding websites.",
    benefits: [
      "Build a portfolio with 5+ real-world web projects",
      "Syllabus on freelancing: How to bid and win high-paying clients on Upwork/Fiverr",
      "Earn ₹5,000 to ₹10,000 per website you build",
      "Certificate of Completion from AK Development to add to your LinkedIn"
    ],
    imagePrompt: "A young Indian student coding on a laptop with a modern, cozy hostel background, looking excited."
  },
  homemaker: {
    id: "homemaker" as PersonaType,
    title: "Homemakers & Parents",
    badge: "Financial Independence",
    hook: "Start a Flexible Side-Hustle Right From Your Home",
    subHook: "You don't need a 9-to-5 job to earn. Learn modern website development, work 2 hours a day, and achieve financial independence.",
    painPoint: "Wanting to build an independent career with flexible hours that balance perfectly with family and parenting.",
    dreamOutcome: "Running a home-based design micro-agency, earning independently, and managing clients on your own time.",
    benefits: [
      "100% self-paced learning - study when the kids are asleep",
      "No complex coding required: Master visual layouts, styles, and web hosting",
      "Full guidance on setting up a remote website consulting business",
      "Join a supportive community of like-minded women coders"
    ],
    imagePrompt: "An Indian woman working on a laptop on her dining table with a smiling baby or a clean, warm living room context."
  },
  jobseeker: {
    id: "jobseeker" as PersonaType,
    title: "Job Seekers & Career Switchers",
    badge: "High-Demand Skill",
    hook: "Transition Into a High-Paying Tech Career in 30 Days",
    subHook: "The IT industry is booming, and React/Tailwind developers are in massive demand. Switch from non-tech to tech easily.",
    painPoint: "Stuck in stagnant fields, experiencing career gaps, or struggling to crack interviews due to lack of practical tech skills.",
    dreamOutcome: "Unlocking stable, well-paying frontend or full-stack roles with hands-on, industry-vetted project portfolios.",
    benefits: [
      "Learn HTML, CSS, Tailwind CSS, and core JavaScript fundamentals",
      "Build live-deployed websites that prove your competence to hiring managers",
      "Resume preparation templates and core technical interview questions",
      "Personalized mentorship guidance and lifetime course access"
    ],
    imagePrompt: "A professional job seeker analyzing code charts on a dual-monitor setup, looking confident."
  },
  entrepreneur: {
    id: "entrepreneur" as PersonaType,
    title: "Entrepreneurs & Business Owners",
    badge: "Agency Cost Saver",
    hook: "Stop Wasting Lakhs on Lazy Web Agencies & Developers",
    subHook: "Take control of your digital presence. Learn to build, host, and optimize your own high-converting websites in hours.",
    painPoint: "Spending ₹30,000+ for every small website, waiting weeks for developers to edit text, and losing potential customers.",
    dreamOutcome: "Instantly building, testing, and modifying your websites, tracking ads yourself, and dominating Google.",
    benefits: [
      "Build lightning-fast websites optimized for Meta/Google Ads",
      "Save ₹1,00,000+ yearly in developer fees and custom hosting plans",
      "Master layout hacks and dynamic lead-capture forms that convert traffic",
      "Connect custom domains, set up emails, and run real business sites"
    ],
    imagePrompt: "A dynamic small business owner presenting a new website on a tablet to a customer."
  }
};

const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: "Module 1: Web Architecture & Core Setup",
    duration: "Day 1",
    description: "Learn how the internet works, what hosting and domains are, and set up your ultimate developer workspace.",
    lessons: [
      "How browser requests work (DNS, Servers, and Clients)",
      "Vite, Node.js, and VS Code terminal wizardry",
      "Setting up a Git repository and tracking your development",
      "Understanding modern web layouts (Flexbox & CSS Grid)"
    ],
    highlight: "Workspace Setup"
  },
  {
    id: 2,
    title: "Module 2: High-Converting UI with HTML & Tailwind CSS",
    duration: "Day 2",
    description: "Forget ugly HTML. Design gorgeous, modern, ultra-responsive website components with utility-first Tailwind CSS.",
    lessons: [
      "Semantic HTML tags for search engine optimization (SEO)",
      "Tailwind layout primitives, margins, and absolute positioning",
      "Color theory, premium typography pairings, and clean shadow overlays",
      "Creating sticky navigation bars and interactive pricing tables"
    ],
    highlight: "Sleek Designs"
  },
  {
    id: 3,
    title: "Module 3: JavaScript Core & Interactive Elements",
    duration: "Day 3",
    description: "Bring your static designs to life. Master DOM manipulation, state variables, event triggers, and dark-mode toggles.",
    lessons: [
      "Variables, conditions, and modern ES6 functions in JS",
      "Triggering actions with events (Clicks, hovers, scroll triggers)",
      "Building responsive mobile menu drawers and accordion FAQs",
      "Form validation: Ensuring lead data is clean before submission"
    ],
    highlight: "Interaction"
  },
  {
    id: 4,
    title: "Module 4: Dynamic API Integration & Fetching",
    duration: "Day 4",
    description: "Connect your website to the cloud. Learn how to interact with database endpoints, fetch weather, and store data.",
    lessons: [
      "Understanding JSON, REST APIs, and HTTP request verbs",
      "Using standard Fetch API to load real-time content",
      "Handling asynchronous actions with async/await and promises",
      "Creating seamless lead capture integrations using webhooks"
    ],
    highlight: "Cloud API"
  },
  {
    id: 5,
    title: "Module 5: Mobile-First Responsive Engineering",
    duration: "Day 5",
    description: "90% of your Meta Ads traffic comes from mobile. Learn the absolute secrets of fluid layouts and touch-friendly interfaces.",
    lessons: [
      "Tailwind responsive modifiers (sm:, md:, lg:, xl:)",
      "Setting up standard mobile touch-target sizing (min 44px)",
      "Creating multi-column grid layouts that collapse beautifully on phones",
      "Debugging viewport overflows and horizontal scroll bugs"
    ],
    highlight: "Mobile King"
  },
  {
    id: 6,
    title: "Module 6: Instant 1-Click Hosting & Deployment",
    duration: "Day 6",
    description: "Get your website online in under 60 seconds completely free! Master cloud hosting with custom domain connections.",
    lessons: [
      "Deploying to Vercel and Netlify directly from Git",
      "Configuring free HTTPS SSL certificates for security and trust",
      "Mapping custom domains (e.g., yourname.com) easily",
      "Optimizing build assets for lightning-fast 0.5s load times"
    ],
    highlight: "Going Live"
  },
  {
    id: 7,
    title: "Module 7: Client Acquisition & Freelancing Systems",
    duration: "Day 7",
    description: "Learn how to convert your technical skills into hard cash. We teach you exactly how to find, pitch, and sign ₹25,000+ clients.",
    lessons: [
      "Building an irresistible online freelancing profile on Upwork and Fiverr",
      "The exact cold-pitch scripts that won us ₹1 Lakh worth of contracts",
      "Pricing your service: Fixed-rate vs hourly vs monthly retaining fees",
      "Setting up professional invoices, proposals, and client contracts"
    ],
    highlight: "Earning Engine"
  },
  {
    id: 8,
    title: "Module 8: Capstone - Build and Launch Your Portfolio",
    duration: "Day 7",
    description: "Synthesize everything. Build a multi-project developer portfolio showcasing your skills, and launch it to the world.",
    lessons: [
      "Designing your professional biography, skill lists, and contact portal",
      "Showcasing responsive projects with interactive image carousels",
      "Integrating a custom, functional contact form with automated email alerts",
      "Graduation ceremony and certificate award"
    ],
    highlight: "Portfolio Day"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Aryan Kapoor",
    role: "B.Tech Student (2nd Year)",
    persona: "student",
    text: "Before AK Development, I was lost in theory. For ₹499, I learned Tailwind and JS in 2 weeks. I pitched a local bakery and built their site for ₹12,000. This course paid for itself 24 times over!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    earningNote: "Earned ₹12k on first gig"
  },
  {
    id: 2,
    name: "Sunita Deshmukh",
    role: "Homemaker & Mom of Two",
    persona: "homemaker",
    text: "I wanted to contribute to our family income but couldn't leave home. Learning here was incredibly easy. I now design 2-3 landing pages a month freelancing from my dining table, working only when my kids are asleep.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    earningNote: "Earning ₹25k+/mo remote"
  },
  {
    id: 3,
    name: "Vikram Rathore",
    role: "Career Switcher (Ex-Sales Exec)",
    persona: "jobseeker",
    text: "I spent 4 years in sales with zero growth. At 28, switching to IT felt impossible. AK Development taught me practical development and portfolio secrets. I cracked a Frontend interview last week and joined a startup!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    earningNote: "Hired as Frontend Developer"
  },
  {
    id: 4,
    name: "Kartik Mehta",
    role: "E-commerce Store Owner",
    persona: "entrepreneur",
    text: "I used to pay web agencies ₹20,000 for every single promotional landing page. Now, I design and host my own promo landing pages in 2 hours. This course saves me huge cash and gives me instant agility.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    earningNote: "Saved ₹1.5 Lakhs in dev fees"
  }
];

interface LandingPageProps {
  // No longer needed
}

export default function LandingPage() {
  const [activePersona, setActivePersona] = useState<PersonaType>("student");
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [enrollForm, setEnrollForm] = useState({
    name: "",
    email: "",
    phone: "",
    persona: "student" as PersonaType,
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; msg: string; lead?: any } | null>(null);

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollForm)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          msg: "Congratulations! Your seat is provisionally reserved. Click the button below to complete your secure payment of ₹499 on Razorpay. We are also redirecting you automatically...",
          lead: data.lead
        });
        setEnrollForm({ name: "", email: "", phone: "", persona: "student", notes: "" });
        
        // Auto-redirect to Razorpay payment link
        setTimeout(() => {
          window.location.href = "https://rzp.io/rzp/FNQ3oSH";
        }, 1500);
      } else {
        setSubmitResult({
          success: false,
          msg: data.error || "Failed to submit. Please try again."
        });
      }
    } catch (err) {
      setSubmitResult({
        success: false,
        msg: "Server is booting or offline. Please retry in a few seconds."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPersonaInfo = PERSONAS_DATA[activePersona];

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen font-sans selection:bg-[#FFDD00] selection:text-black border-4 sm:border-8 border-[#1A1A1A]">
      {/* 1. HERO SECTION */}
      <header className="relative overflow-hidden border-b border-white/10 pt-20 pb-24 md:pt-28 md:pb-36" id="hero-section">
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-[#1A1A1A] border border-white/10 text-xs text-[#FFDD00] mb-6 font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDD00]" />
            Empowering 15,000+ Students, Homemakers, & Professionals
          </div>

          {/* High Impact Hook Heading */}
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-[0.95]">
            Build Your <span className="text-[#FFDD00] italic font-serif">Future</span> <br className="hidden md:inline" />
            from Scratch.
          </h1>

          {/* Core Selling Points */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            AK Development presents the complete, practical blueprint to design beautiful websites, host them for free, and secure freelancing contracts. Learn professional website development in 7 days.
          </p>

          {/* Price Tag & Main CTA Button Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="https://rzp.io/rzp/FNQ3oSH" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-none bg-[#FFDD00] hover:bg-white text-black font-black text-lg tracking-wider uppercase transition-colors flex items-center justify-center gap-2 group transform active:scale-95"
              id="cta-enroll-hero"
            >
              Enroll Now for Just ₹499
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#opportunity-section"
              className="w-full sm:w-auto px-6 py-4 rounded-none bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 text-white/90 hover:text-white font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 group transform active:scale-95"
              id="cta-opportunity-hero"
            >
              View Earning Potential
              <Sparkles className="w-4 h-4 text-[#FFDD00] group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          {/* Social Proof Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10">
            <div className="p-4 rounded-none bg-[#141414] border border-white/5">
              <div className="text-3xl font-black text-white tracking-tighter">₹499</div>
              <div className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-bold">One-Time Fee</div>
            </div>
            <div className="p-4 rounded-none bg-[#141414] border border-white/5">
              <div className="text-3xl font-black text-[#FFDD00] tracking-tighter">100%</div>
              <div className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-bold">Practical Training</div>
            </div>
            <div className="p-4 rounded-none bg-[#141414] border border-white/5">
              <div className="text-3xl font-black text-white tracking-tighter">50+</div>
              <div className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-bold">Portfolio Projects</div>
            </div>
            <div className="p-4 rounded-none bg-[#141414] border border-white/5">
              <div className="text-3xl font-black text-[#FFDD00] tracking-tighter">24/7</div>
              <div className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-bold">Community Chat Access</div>
            </div>
          </div>

        </div>
      </header>

      {/* EXCLUSIVE GOOGLE MARKET OPPORTUNITY SECTION (FROM ATTACHED MEDIA) */}
      <section className="py-20 bg-[#0A0A0A] border-b border-white/10 relative overflow-hidden" id="opportunity-section">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-none bg-[#FFDD00]/10 border border-[#FFDD00]/30 text-[10px] font-bold text-[#FFDD00] uppercase tracking-[0.25em] mb-4 inline-block">
              Demand Outlook & Potential
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1] mb-4">
              நீங்கள் <span className="text-[#FFDD00] italic font-serif">Website Design</span> Learn செய்து <br className="hidden md:inline" />
              (Zero Investment) Business செய்ய விருப்பமா?
            </h2>
            <p className="text-white/60 text-base font-light max-w-2xl mx-auto mt-2">
              Learn a high-income digital skill today. Build stunning custom websites and start a lucrative online design business with zero initial software overhead.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-stretch mb-12">
            
            {/* Left Box: Earnings Potential based on Google results */}
            <div className="md:col-span-7 bg-[#141414] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#FFDD00] text-black text-[9px] uppercase tracking-widest font-black px-4 py-1.5 font-mono">
                Today Only
              </div>
              
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#FFDD00] font-black font-mono block mb-4">
                  ★ As Per Google Results
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-8">
                  What Clients Pay for Website Design:
                </h3>

                <div className="space-y-6">
                  <div className="p-5 bg-[#0A0A0A] border-l-4 border-[#FFDD00] border border-white/5">
                    <span className="block text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Small Business Websites</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-black text-white">₹10,000</span>
                      <span className="text-sm text-white/40">to</span>
                      <span className="text-3xl md:text-4xl font-black text-[#FFDD00]">₹80,000</span>
                    </div>
                  </div>

                  <div className="p-5 bg-[#0A0A0A] border-l-4 border-white border border-white/5">
                    <span className="block text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Corporate Websites (High-End Design, Advanced Features)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-black text-white">₹1,50,000</span>
                      <span className="text-sm text-white/40">to</span>
                      <span className="text-3xl md:text-4xl font-black text-[#FFDD00]">₹10,00,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40 font-mono flex flex-wrap gap-4 uppercase justify-between">
                <span>⚡ Immediate Access</span>
                <span>📋 Practice Assignments Included</span>
              </div>
            </div>

            {/* Right Box: Online Training structure details */}
            <div className="md:col-span-5 bg-[#141414] border border-white/10 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-black block mb-4">
                  The Blueprint
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                  Very Detailed &amp; Practical Online Training
                </h3>
                <p className="text-xs text-white/60 font-light mb-6">
                  Build confidence under guided guidance. No complex theoretical jargon, only pure skill development.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-lg font-bold text-[#FFDD00] italic font-serif">01.</span>
                    <div>
                      <span className="block font-bold text-sm text-white uppercase tracking-wider">Website Development</span>
                      <span className="text-xs text-white/60">Master coding high-converting landing pages from absolute scratch.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg font-bold text-white italic font-serif">02.</span>
                    <div>
                      <span className="block font-bold text-sm text-white uppercase tracking-wider">Lead Generation</span>
                      <span className="text-xs text-white/60">Learn exactly how to pitch to premium corporate prospects.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg font-bold text-[#FFDD00] italic font-serif">03.</span>
                    <div>
                      <span className="block font-bold text-sm text-white uppercase tracking-wider">Business Automation</span>
                      <span className="text-xs text-white/60">Set up automatic proposal followups and client onboardings.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-white/40">Limited Seats Available</span>
                    <span className="text-xs text-white font-bold font-mono">₹499 <span className="line-through text-white/30 text-[10px]">₹5,000</span></span>
                  </div>
                  <a 
                    href="https://rzp.io/rzp/FNQ3oSH" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FFDD00] hover:bg-white text-black text-xs font-black uppercase tracking-wider transition-colors"
                  >
                    Join Today
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Footer list of eligible profiles / "Who Applies" */}
          <div className="p-4 bg-[#141414] border border-white/10 text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#FFDD00] block mb-2">
              Who Should Apply &amp; Start Today
            </span>
            <p className="text-xs text-white font-mono tracking-tight uppercase flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span>👤 Job Seekers</span>
              <span className="text-white/20">•</span>
              <span>🎓 Students</span>
              <span className="text-white/20">•</span>
              <span>🏡 Home Makers</span>
              <span className="text-white/20">•</span>
              <span>💼 Business Owners</span>
              <span className="text-white/20">•</span>
              <span>✨ Interested Peoples</span>
            </p>
          </div>

        </div>
      </section>

      {/* 2. PERSONA-SPECIFIC SECTION (HIGHLY TARGETED COPY) */}
      <section className="py-24 bg-[#141414]/40 border-b border-white/10" id="audiences-section">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Select Your Profile to See <br />
              How This Course Works For You
            </h2>
            <p className="text-slate-400">
              We design specific learning routes tailored to who you are and what you want to achieve.
            </p>
          </div>

          {/* Profile Switcher Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-10 max-w-4xl mx-auto">
            {(Object.keys(PERSONAS_DATA) as PersonaType[]).map((key) => {
              const item = PERSONAS_DATA[key];
              const isActive = activePersona === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePersona(key)}
                  className={`px-4 py-3.5 rounded-none border font-bold text-sm transition-all text-center flex flex-col items-center justify-center gap-1 uppercase tracking-wider ${
                    isActive
                      ? "bg-[#FFDD00] border-[#FFDD00] text-black"
                      : "bg-[#141414] border-white/5 text-white/60 hover:border-white/15 hover:text-white"
                  }`}
                  id={`tab-${key}`}
                >
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${isActive ? "text-black/80" : "text-[#FFDD00]"}`}>
                    {item.badge}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Profile Active Card View */}
          <div className="bg-[#141414] rounded-none border border-white/10 p-6 md:p-10 shadow-xl relative overflow-hidden">
            <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column Text details */}
              <div className="md:col-span-7">
                <span className="px-3 py-1 rounded-none bg-[#1A1A1A] border border-white/10 text-xs font-bold text-[#FFDD00] tracking-widest uppercase mb-4 inline-block">
                  Tailored For {currentPersonaInfo.title}
                </span>

                <h3 className="text-2xl md:text-4xl font-black text-white mt-1 mb-4 leading-tight uppercase tracking-tight">
                  {currentPersonaInfo.hook}
                </h3>

                <p className="text-white/80 leading-relaxed mb-6 font-light">
                  {currentPersonaInfo.subHook}
                </p>

                {/* Pain point vs Dream match */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-none bg-[#0A0A0A] border border-white/5">
                    <div className="text-[10px] text-[#FFDD00] font-bold uppercase tracking-widest mb-1">Your Pain Point:</div>
                    <div className="text-sm text-white/70 font-medium">{currentPersonaInfo.painPoint}</div>
                  </div>
                  <div className="p-4 rounded-none bg-[#0A0A0A] border border-white/5">
                    <div className="text-[10px] text-[#FFDD00] font-bold uppercase tracking-widest mb-1 font-serif italic">Your Dream Outcome:</div>
                    <div className="text-sm text-white font-bold">{currentPersonaInfo.dreamOutcome}</div>
                  </div>
                </div>

                {/* Tailored Benefits Check List */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">
                    What You Get in This Course:
                  </h4>
                  <div className="space-y-2.5">
                    {currentPersonaInfo.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-[#FFDD00] shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instant CTA to jump to form */}
                <div className="mt-8">
                  <a
                    href="https://rzp.io/rzp/FNQ3oSH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none bg-[#FFDD00] hover:bg-white text-black font-black uppercase tracking-wider text-xs transition-all"
                  >
                    Reserve My Seat for ₹499
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {/* Right Column illustrative card */}
              <div className="md:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-none border border-white/10 bg-[#0A0A0A] p-6 relative overflow-hidden shadow-lg">
                  
                  {/* Dynamic Persona Avatar Icon representation */}
                  <div className="w-14 h-14 rounded-none bg-[#FFDD00]/10 flex items-center justify-center border border-[#FFDD00]/20 mb-6 text-[#FFDD00]">
                    {activePersona === "student" && <GraduationCap className="w-7 h-7" />}
                    {activePersona === "homemaker" && <Home className="w-7 h-7" />}
                    {activePersona === "jobseeker" && <Briefcase className="w-7 h-7" />}
                    {activePersona === "entrepreneur" && <Globe className="w-7 h-7" />}
                  </div>

                  <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Our Pledge for This Class:</h4>
                  <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                    "AK Development's goal is to remove technical barriers. We built this curriculum after consulting hiring agencies, successful freelance parents, and student gig workers."
                  </p>

                  <div className="space-y-4 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-xs font-black text-[#FFDD00]">1</div>
                      <div className="text-xs">
                        <div className="font-bold text-white uppercase tracking-wider">Full-lifetime access</div>
                        <div className="text-white/50">Learn at your own rhythm</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-xs font-black text-white">2</div>
                      <div className="text-xs">
                        <div className="font-bold text-white uppercase tracking-wider">Live project building</div>
                        <div className="text-white/50">Not just listening, real coding</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-xs font-black text-[#FFDD00]">3</div>
                      <div className="text-xs">
                        <div className="font-bold text-white uppercase tracking-wider">Interactive Q&A</div>
                        <div className="text-white/50">Direct query solving inside the group</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. SYLLABUS / CURRICULUM ACCORDION */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10" id="syllabus-section">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-none bg-[#141414] border border-white/10 text-[10px] font-bold text-[#FFDD00] uppercase tracking-[0.25em]">
              Course Structure
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-4 uppercase tracking-tight">
              7 Days. 8 Modules.
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm font-light">
              An action-oriented, zero-fluff syllabus compiled to make you highly capable, responsive, and confident in web design and freelancing.
            </p>
          </div>

          {/* Module Accordions */}
          <div className="space-y-3">
            {COURSE_MODULES.map((module) => {
              const isExpanded = expandedModule === module.id;
              return (
                <div 
                  key={module.id} 
                  className={`rounded-none border transition-all ${
                    isExpanded 
                      ? "bg-[#141414] border-white/20 shadow-md" 
                      : "bg-[#141414]/40 border-white/5 hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-white"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] px-2.5 py-1 rounded-none bg-[#0A0A0A] border border-white/10 text-[#FFDD00] font-bold uppercase tracking-wider">
                        {module.duration}
                      </span>
                      <span className="text-base md:text-lg tracking-tight font-black uppercase">{module.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-[10px] bg-[#FFDD00]/10 border border-[#FFDD00]/25 text-[#FFDD00] px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider">
                        {module.highlight}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-white/60" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/60" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-white/10 mt-2 text-sm text-white/80">
                          <p className="mb-4 text-white/50 leading-relaxed italic font-serif">{module.description}</p>
                          
                          <div className="bg-[#0A0A0A] rounded-none p-4 border border-white/10">
                            <h4 className="text-xs font-bold text-[#FFDD00] uppercase tracking-widest mb-2.5 font-sans">
                              Lessons Covered:
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-2.5">
                              {module.lessons.map((lesson, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <span className="text-[#FFDD00] text-xs shrink-0 mt-0.5">✦</span>
                                  <span className="text-xs text-white/80 leading-normal font-light">{lesson}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Note about freelancing and no code tools */}
          <div className="mt-8 p-4 rounded-none bg-[#141414] border border-white/10 flex items-start gap-3.5 max-w-3xl mx-auto">
            <Sparkles className="w-5 h-5 text-[#FFDD00] shrink-0 mt-0.5" />
            <div className="text-xs text-white/80 leading-relaxed font-light">
              <span className="font-bold text-white uppercase tracking-wider">Bonus Masterclass Included:</span> Learn how to find design templates, import preset components to save time, and craft a complete brand portfolio without writing a thousand lines of manual backend code.
            </div>
          </div>

        </div>
      </section>

      {/* 4. REAL STUDENT TESTIMONIALS */}
      <section className="py-24 bg-[#141414]/30 border-b border-white/10" id="testimonials-section">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-none bg-[#141414] border border-white/10 text-[10px] font-bold text-[#FFDD00] uppercase tracking-[0.25em]">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-4 uppercase tracking-tight">
              Real Impact. Real Earnings.
            </h2>
            <p className="text-white/60 font-light text-sm">
              Read how people just like you transformed their lives using simple modern web development training.
            </p>
          </div>

          {/* Testimonial Grids */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="bg-[#141414] p-6 rounded-none border border-white/10 flex flex-col justify-between hover:border-[#FFDD00]/40 transition-colors shadow-lg group"
              >
                <div>
                  {/* Earnings highlight badge */}
                  {t.earningNote && (
                    <div className="inline-block px-2.5 py-1 rounded-none bg-[#FFDD00]/10 border border-[#FFDD00]/30 text-[10px] font-bold text-[#FFDD00] uppercase tracking-wider mb-4 group-hover:scale-105 transition-transform">
                      {t.earningNote}
                    </div>
                  )}
                  
                  <p className="text-sm text-white/80 leading-relaxed italic mb-6 font-serif">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-none object-cover border border-white/10" 
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{t.name}</h4>
                    <span className="text-[11px] text-white/50">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE COURSE REGISTRATION / ENROLLMENT FORM */}
      <section className="py-24 relative overflow-hidden" id="enroll-section">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-[#141414] border border-white/10 rounded-none p-6 md:p-12 shadow-2xl">
            
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* Form details, pricing card and trust */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs px-2.5 py-1 rounded-none bg-[#1A1A1A] border border-white/10 text-[#FFDD00] font-bold tracking-widest uppercase">
                    Reserved Intake Open
                  </span>
                  <h3 className="text-3xl font-black text-white mt-4 mb-2 uppercase tracking-tight">₹499 Complete</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                    A secure seat reservation. No hidden fees, no subscriptions. Get immediate access to community chat upon entry.
                  </p>
                </div>

                <div className="space-y-4 bg-[#0A0A0A] p-4 rounded-none border border-white/5 mb-6 md:mb-0">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#FFDD00]" />
                    <span className="text-xs font-semibold text-white/80">100% Risk-Free Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span className="text-xs font-semibold text-white/80">Full Certification & Mentor Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#FFDD00]" />
                    <span className="text-xs font-semibold text-white/80">Join 15,000+ Alumni</span>
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                
                {submitResult ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-none border ${
                      submitResult.success 
                        ? "bg-[#FFDD00]/10 border-[#FFDD00]/30 text-white" 
                        : "bg-red-950/40 border-red-500/30 text-red-200"
                    }`}
                  >
                    <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight flex items-center gap-2">
                      {submitResult.success ? "🎉 Registration Received!" : "⚠️ Error Occurred"}
                    </h4>
                    <p className="text-sm leading-relaxed mb-6 font-light">{submitResult.msg}</p>
                    
                    {submitResult.success && submitResult.lead && (
                      <div className="space-y-4 mb-6">
                        <div className="bg-[#0A0A0A] p-4 rounded-none border border-white/10 space-y-2">
                          <div className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Your Booking Ticket:</div>
                          <div className="text-xs text-white/80"><span className="font-bold text-white uppercase tracking-wider">Name:</span> {submitResult.lead.name}</div>
                          <div className="text-xs text-white/80"><span className="font-bold text-white uppercase tracking-wider">Email:</span> {submitResult.lead.email}</div>
                          <div className="text-xs text-white/80"><span className="font-bold text-white uppercase tracking-wider">Selected Profile:</span> {PERSONAS_DATA[submitResult.lead.persona as PersonaType]?.title}</div>
                          <div className="text-[10px] text-[#FFDD00] font-bold uppercase tracking-wider mt-1">✓ Seat Provisional - Price locked at ₹499</div>
                        </div>

                        <a 
                          href="https://rzp.io/rzp/FNQ3oSH"
                          className="block w-full text-center px-6 py-4 rounded-none bg-[#FFDD00] hover:bg-white text-black font-black uppercase tracking-wider text-sm transition-colors shadow-md shadow-[#FFDD00]/10"
                        >
                          Complete Payment on Razorpay (₹499) ➔
                        </a>
                      </div>
                    )}

                    <button 
                      onClick={() => setSubmitResult(null)}
                      className="px-4 py-2 rounded-none bg-[#FFDD00] hover:bg-white font-black text-black text-xs uppercase tracking-wider transition-colors"
                    >
                      Enroll Another Student
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleEnrollSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
                        Full Name <span className="text-[#FFDD00]">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={enrollForm.name}
                        onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                        placeholder="Rohan Sharma" 
                        className="w-full px-4 py-3 rounded-none bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-[#FFDD00] text-sm transition-colors"
                        id="enroll-name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
                          Email Address <span className="text-[#FFDD00]">*</span>
                        </label>
                        <input 
                          type="email" 
                          required
                          value={enrollForm.email}
                          onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                          placeholder="rohan@example.com" 
                          className="w-full px-4 py-3 rounded-none bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-[#FFDD00] text-sm transition-colors"
                          id="enroll-email"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
                          WhatsApp Phone <span className="text-[#FFDD00]">*</span>
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={enrollForm.phone}
                          onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                          placeholder="+91 98765 43210" 
                          className="w-full px-4 py-3 rounded-none bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-[#FFDD00] text-sm transition-colors"
                          id="enroll-phone"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
                        Select Your Profile <span className="text-[#FFDD00]">*</span>
                      </label>
                      <select 
                        value={enrollForm.persona}
                        onChange={(e) => setEnrollForm({ ...enrollForm, persona: e.target.value as PersonaType })}
                        className="w-full px-4 py-3 rounded-none bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-[#FFDD00] text-sm transition-colors"
                        id="enroll-persona"
                      >
                        <option value="student">Student / Graduate (Job Prep)</option>
                        <option value="homemaker">Homemaker / Parent (Work from Home)</option>
                        <option value="jobseeker">Job Seeker (Skill Transition)</option>
                        <option value="entrepreneur">Entrepreneur (Save Development Costs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
                        Any questions or expectations? (Optional)
                      </label>
                      <textarea 
                        rows={3}
                        value={enrollForm.notes}
                        onChange={(e) => setEnrollForm({ ...enrollForm, notes: e.target.value })}
                        placeholder="e.g., I want to build a website for my local retail business..."
                        className="w-full px-4 py-3 rounded-none bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:border-[#FFDD00] text-sm transition-colors resize-none"
                        id="enroll-notes"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4.5 rounded-none bg-[#FFDD00] hover:bg-white font-black text-black text-base tracking-wider uppercase transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                      id="enroll-submit-button"
                    >
                      {isSubmitting ? "Processing Reservation..." : "Submit Reservation & Claim Seats (₹499)"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-[10px] text-center text-white/40 mt-2 tracking-wide font-light">
                      🔒 Secured via SSL encryption. We never share your phone number. No spam pledge.
                    </p>
                  </form>
                )}

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. COHESIVE ACCORDION FAQ */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/10" id="faq-section">
        <div className="max-w-3xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-[#FFDD00] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Frequently Asked Questions</h2>
            <p className="text-white/60 mt-2 font-light">Everything you need to know about AK Development's web course.</p>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-[#141414] rounded-none border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Is this class really for ₹499? Are there hidden fees?</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Yes, it is exactly ₹499. No recurring charges, subscriptions, or forced software fees. We cover 100% of the lessons, provide downloadable project resources, and host websites on free cloud platforms.
              </p>
            </div>
            <div className="p-6 bg-[#141414] rounded-none border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">I have zero technical background. Can I join?</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light font-serif italic">
                Absolutely. More than 60% of our successful alumni include homemakers, students, and sales experts who had never written a single line of code before joining. We explain concepts using everyday analogies.
              </p>
            </div>
            <div className="p-6 bg-[#141414] rounded-none border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">How long will I have access to the course material?</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                You get lifetime access. You can watch the video modules, download resource codekits, read freelancing pitch proposals, and join community updates at any time, even years from now.
              </p>
            </div>
            <div className="p-6 bg-[#141414] rounded-none border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">How do I get the certificate?</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Once you finish compiling and hosting your custom Capstone Portfolio website, you submit the live URL link. Upon vetting, we generate a high-res digital certificate from AK Development that you can embed on LinkedIn.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0A0A0A] border-t border-white/10 text-center text-white/40 text-xs">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="text-sm font-bold text-white uppercase tracking-widest">AK Development</div>
          <p className="font-light">© 2026 AK Development Co. All rights reserved. Empowering modern creators, freelancers, and designers.</p>
          <div className="flex justify-center gap-6">
            <a href="#hero-section" className="hover:text-[#FFDD00] transition-colors uppercase tracking-wider text-[10px]">Hero</a>
            <a href="#audiences-section" className="hover:text-[#FFDD00] transition-colors uppercase tracking-wider text-[10px]">Profiles</a>
            <a href="#syllabus-section" className="hover:text-[#FFDD00] transition-colors uppercase tracking-wider text-[10px]">Syllabus</a>
            <a href="https://rzp.io/rzp/FNQ3oSH" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFDD00] transition-colors uppercase tracking-wider text-[10px]">Register</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
