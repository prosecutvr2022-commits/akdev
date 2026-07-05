import { useState } from "react";
import { 
  Sparkles, Copy, Check, Video, Image, Phone, Tv, 
  MessageSquare, Heart, Share2, Bookmark, RefreshCw, 
  HelpCircle, Megaphone, Layout, FileText, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PersonaType, AIMarketingOutput } from "../types";

// Static High-Converting Presets for offline fallback
const PRESET_MARKETING_ASSETS = {
  student: {
    primaryText: `🚀 ATTENTION STUDENTS: Stop waiting for B.Tech/B.Sc college placements to save you!

While everyone else is memorizing theory, smart college students are building real-world portfolios and making ₹15,000+ per month freelancing from their hostel rooms.

Introducing the ₹499 Website Development Course by AK Development. 🎓

In just 20 days, you'll master:
✅ Semantic HTML & Responsive CSS Layouts
✅ Styling like a pro using Tailwind CSS
✅ Interactive UI widgets using JavaScript
✅ Deploying websites live for FREE on Netlify/Vercel
✅ Freelancing systems: Exactly how to pitch & win ₹10k+ clients

No coding experience needed. Zero boring textbook slides. 100% practical.

👉 Click "Learn More" to claim your seat for ₹499 before the price increases!`,
    hook1: "How I made ₹12,000 in college while my friends were studying theory 🤫",
    hook2: "College placement cell won't tell you this secret coding hack...",
    headline: "Learn Web Dev in 20 Days • ₹499 Only",
    reelScript: {
      hook: "[Scene: Close-up of a student working in a hostel, sipping coffee. Voiceover: 'How I started earning ₹15k a month in college without any tech degree...']",
      body: "[Scene: Split-screen. Left shows an empty lecture hall, right shows a live-designed portfolio website. Voiceover: 'Stop memorizing theory. I spent just ₹499 on AK Development\'s course, learned Tailwind CSS, hosted my designs for free, and landed clients on Upwork!']",
      cta: "[Scene: Student holding their laptop showing a checkout page. Voiceover: 'Don\'t wait. Swipe up to register for ₹499 and build your future!']"
    },
    posterConcept: {
      headlineText: "BYPASS COLLEGE PLACEMENTS",
      subText: "Learn Web Development & Earn ₹15,000/mo Freelancing. Course fee: ₹499",
      visualLayout: "A vibrant dark background with neon blue code terminal highlights. Right side displays a B.Tech student coding with a glowing laptop, left side displays bold typography stating '₹499 Complete'."
    },
    targetAngleExplain: "Focuses on the frustration of theoretical college education, offering a shortcut to financial independence and resume building."
  },
  homemaker: {
    primaryText: `🌸 "I wanted a career, but my family is my priority. How could I do both?"

If you are a homemaker or parent wanting to earn independently without leaving your home, this is for you.

AK Development presents the ₹499 Website Development Masterclass. 🏡

Learn a creative, high-demand skill in your free time, work 2 hours a day from your dining table, and charge clients up to ₹20,000 per website.

What you will achieve:
✨ Build beautiful landing pages with 0 prior experience
✨ Easy step-by-step visual styling (no dry math or equations)
✨ Host business websites online with free cloud plans
✨ Launch a remote web consulting side-hustle on your terms

It's self-paced. Watch while the kids are at school or asleep.

👉 Click "Learn More" to secure your ₹499 seat. Start your journey today!`,
    hook1: "How to earn ₹25,000/month from your dining table (Flexible hours!) 🏡",
    hook2: "I quit my 9-to-5 to be a full-time mom, but I still make an independent income.",
    headline: "Work From Home • Learn Web Dev at ₹499",
    reelScript: {
      hook: "[Scene: A mother happily working on her laptop with a cup of tea, warm sunlight in the living room. Voiceover: 'I wanted to contribute to my family income, but couldn\'t do a 9-to-5. Here\'s my secret...']",
      body: "[Scene: Quick zoom into her laptop screen, showing a beautiful website layout. Voiceover: 'I spent just ₹499 on AK Development\'s course. I learned web design step-by-step. Now, I build landing pages remote in my spare hours.']",
      cta: "[Scene: Smiling mom pointing to the screen with a Swipe Up arrow. Voiceover: 'You can do it too. Tap below to start your home business for just ₹499!']"
    },
    posterConcept: {
      headlineText: "HOMEMAKER TO HOME AGENCY",
      subText: "Earn ₹25,000/mo Remote on Your Own Schedule • Price ₹499",
      visualLayout: "A warm, aesthetic peach-and-white background. Illustrates a happy woman balancing work-life on a desk, with clean, modern website screenshots floating."
    },
    targetAngleExplain: "Leverages the emotional drive for financial independence and self-worth, highlighting the ultimate flexibility of self-paced remote work."
  },
  jobseeker: {
    primaryText: `💼 STUCK IN A LOW-GROWTH JOB OR RECENT CAREER GAP?

Tech is the only industry growing at lightning speed. And you don't need a 4-year CS degree to get in.

Frontend web developers are in extreme demand globally. AK Development's ₹499 Website Development blueprint is designed to get you career-ready in weeks.

Our intensive curriculum covers:
🔥 Modern UI Engineering with Tailwind CSS
🔥 Dynamic interactivity with core JavaScript
🔥 Deployment, cloud hosting & portfolio curation
🔥 Resume templates & tech interview cracking questions

Don't settle for stagnant sales or admin roles. Level up.

👉 Click "Learn More" to claim your ₹499 seat and build a high-demand tech resume.`,
    hook1: "The secret tech skill that got me hired in 30 days (No degree needed) 🤫",
    hook2: "Stuck in sales? Here is how to transition into a tech career fast...",
    headline: "Level Up Your Resume • Web Dev ₹499",
    reelScript: {
      hook: "[Scene: A job seeker looking frustrated at rejection emails, then looking determined. Voiceover: 'Tired of applying to hundreds of jobs with zero callbacks? Let\'s change that.']",
      body: "[Scene: Fast-paced montage of coding blocks, responsive website designs, and a certificate. Voiceover: 'For just ₹499, I learned modern website development from AK Development. I built a live, hosted portfolio showing real-world projects. Hiring managers were blown away.']",
      cta: "[Scene: Confident person walking into an office. Voiceover: 'Stop hoping. Build the skills. Tap below to reserve your seat at ₹499!']"
    },
    posterConcept: {
      headlineText: "UPGRADE TO A TECH CAREER",
      subText: "Crack frontend interviews with real portfolio projects • Only ₹499",
      visualLayout: "High-contrast dark teal and obsidian design. Highlights a glowing digital certificate from AK Development and a live mock tech portfolio."
    },
    targetAngleExplain: "Speaks to the pain of endless rejections and stagnation, presenting a clear, low-cost skill upgrade that yields stable employment."
  },
  entrepreneur: {
    primaryText: `💡 ENTREPRENEURS: Stop paying lazy agencies ₹30,000 for a simple landing page!

As a founder, speed is your ultimate competitive advantage. If you have to wait 5 days for a developer to fix a simple typo or launch a promotion, you are losing sales.

AK Development's ₹499 Web Development Course teaches you to build, host, and optimize your own landing pages in hours.

Save lakhs and launch ideas instantly:
🚀 Design ultra-responsive, ad-optimized sales funnels
🚀 Code and customize your layout with modern Tailwind
🚀 Free cloud hosting with custom domain setups
🚀 Form lead capture engines that sync directly with your sales

Take back control of your business. Code your own MVP.

👉 Click "Learn More" to secure your seat. Best business investment under ₹500!`,
    hook1: "Stop paying web agencies lakhs of rupees for simple landing pages! 🛑",
    hook2: "How I launch and test new business ideas in under 2 hours...",
    headline: "Design Your Own Landing Pages • ₹499",
    reelScript: {
      hook: "[Scene: Business owner looking stressed at an invoice of ₹40,000 from an agency. Voiceover: 'Still paying lakhs to developers just to launch a simple sales page? Stop.']",
      body: "[Scene: Rapidly customizing a page layout using Tailwind classes. Voiceover: 'I spent just ₹499 on AK Development\'s course. Now, I build, host, and update my own sales funnels in under an hour. Speed is money!']",
      cta: "[Scene: Entrepreneur smiling, looking at a stripe/payment notifications chart. Voiceover: 'Invest ₹499 to save lakhs. Tap below to enroll now!']"
    },
    posterConcept: {
      headlineText: "STOP PAYING WEB AGENCIES",
      subText: "Learn to build & host your own landing pages in 2 hours • Just ₹499",
      visualLayout: "A clean, minimalist grid layout reminiscent of modern SaaS landing pages. Displays a comparison card showing 'Agency: ₹30,000' vs 'Do It Yourself: ₹499'."
    },
    targetAngleExplain: "Appeals directly to financial control, business speed, agility, and stopping agency wastage."
  }
};

export default function MarketingHub() {
  const [activePersona, setActivePersona] = useState<PersonaType>("student");
  const [tone, setTone] = useState<string>("urgent");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Custom AI-generated outputs
  const [customAIOutputs, setCustomAIOutputs] = useState<Record<PersonaType, AIMarketingOutput | null>>({
    student: null,
    homemaker: null,
    jobseeker: null,
    entrepreneur: null
  });

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleGenerateAI = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona: activePersona, tone })
      });

      const data = await response.json();
      if (response.ok && !data.error) {
        setCustomAIOutputs({
          ...customAIOutputs,
          [activePersona]: data
        });
      } else {
        setErrorMsg(data.error || "Failed to generate ad assets. Please check backend log.");
      }
    } catch (err) {
      setErrorMsg("Connection to copywriting server failed. Please ensure dev server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentPreset = PRESET_MARKETING_ASSETS[activePersona];
  const currentAI = customAIOutputs[activePersona];

  // Active viewing output (AI if available, else Preset)
  const activePrimaryText = currentAI ? currentAI.primaryText : currentPreset.primaryText;
  const activeHook1 = currentAI ? currentAI.hook1 : currentPreset.hook1;
  const activeHook2 = currentAI ? currentAI.hook2 : currentPreset.hook2;
  const activeHeadline = currentAI ? currentAI.headline : currentPreset.headline;
  const activeReelScript = currentAI ? currentAI.reelScript : currentPreset.reelScript;
  const activePoster = currentAI ? currentAI.posterConcept : currentPreset.posterConcept;
  const activeExplain = currentAI ? currentAI.targetAngleExplain : currentPreset.targetAngleExplain;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-slate-900 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-950/40 border border-indigo-900/60 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Megaphone className="w-3.5 h-3.5" /> Ad Copy & Content Suite
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Course Marketing Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Equip your Meta Ads campaigns, Instagram Reels, print posters, and Canva templates with ready-to-copy, high-converting hooks and structured scripts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-semibold">Gemini Copywriter Online</span>
          </div>
        </div>

        {/* CONTROLS GRID */}
        <div className="grid md:grid-cols-12 gap-8 mb-10">
          
          {/* LEFT: Target Persona Switcher & AI Settings */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Persona Target cards */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center justify-between">
                <span>1. Select Target Audience</span>
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </h3>

              <div className="space-y-2">
                {[
                  { id: "student", label: "Students & Grads", color: "indigo" },
                  { id: "homemaker", label: "Homemakers & Moms", color: "pink" },
                  { id: "jobseeker", label: "Job Seekers / Transition", color: "emerald" },
                  { id: "entrepreneur", label: "Business Owners", color: "amber" }
                ].map((item) => {
                  const isActive = activePersona === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePersona(item.id as PersonaType);
                        setErrorMsg(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border text-left font-bold text-sm transition-all ${
                        isActive
                          ? "bg-slate-950 border-indigo-500 text-white shadow-sm"
                          : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-800"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-indigo-400" : "bg-slate-700"}`}></span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Generator Settings card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 bg-gradient-to-l from-indigo-500/10 to-transparent w-24 h-24 rounded-full blur-lg pointer-events-none"></div>

              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                2. AI Coproducer Playground
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Use Gemini 3.5 Flash on our server to instantly create high-converting copy variants tailored to your target audience.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Select Ad Angle / Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="urgent">FOMO & Urgency (Price rising soon)</option>
                    <option value="emotional">Inspirational & Empowering (Personal growth)</option>
                    <option value="bold">Bold & Disruptive (Pattern-interrupt)</option>
                    <option value="logical">Value-Focused (Bullet points & benefits)</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateAI}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 font-bold text-white text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Crafting Campaign Assets...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Generate Custom AI Copy
                    </>
                  )}
                </button>

                {errorMsg && (
                  <div className="p-2.5 rounded bg-red-950/40 border border-red-900/60 text-[11px] text-red-300 leading-normal">
                    {errorMsg}
                  </div>
                )}

                {currentAI && (
                  <div className="flex items-center justify-between p-2 rounded bg-indigo-950/20 border border-indigo-900/30 text-[10px] text-indigo-300 font-bold">
                    <span>✓ Custom AI Version Active</span>
                    <button 
                      onClick={() => setCustomAIOutputs({ ...customAIOutputs, [activePersona]: null })}
                      className="hover:text-white underline text-[9px] uppercase tracking-wider"
                    >
                      Reset to Preset
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Campaign strategy tip */}
            <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-900 text-xs text-slate-400">
              <span className="font-bold text-slate-300 block mb-1">💡 Meta Ad Tip:</span>
              When setting up campaigns for ₹499 products, target broad locations in India and use interests like "freelance work", "web design", "Canva", or "small business" matching your selected profile.
            </div>

          </div>

          {/* RIGHT: Output Preview panel with tabs (Ad copy, Reels script, Poster concept) */}
          <div className="md:col-span-8 space-y-6">
            
            {/* strategy tag */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
              <Layout className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Strategic Targeting Angle:</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1 italic">
                  "{activeExplain}"
                </p>
              </div>
            </div>

            {/* MAIN COPY AND HOOKS GRID */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 relative">
                <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider mb-1">Hook Variant A</div>
                <p className="text-xs font-bold text-white pr-8 leading-snug">{activeHook1}</p>
                <button 
                  onClick={() => handleCopy(activeHook1, "hook1")}
                  className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
                  title="Copy Hook A"
                >
                  {copiedField === "hook1" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 relative">
                <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider mb-1">Hook Variant B</div>
                <p className="text-xs font-bold text-white pr-8 leading-snug">{activeHook2}</p>
                <button 
                  onClick={() => handleCopy(activeHook2, "hook2")}
                  className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
                  title="Copy Hook B"
                >
                  {copiedField === "hook2" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* AD PREVIEW GRAPHIC INTERFACE MOCKUPS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Creative Mockups & Scripts Preview
                  </span>
                </div>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  Device: Mobile Preview
                </span>
              </div>

              {/* MOCKUP VIEWS CONTAINER */}
              <div className="p-6 grid lg:grid-cols-12 gap-8 items-start bg-slate-950/60">
                
                {/* 1. META FEED AD MOCKUP (Lg: col-span-7) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    Ad Feed Display
                  </h4>

                  <div className="bg-white text-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                    {/* Header */}
                    <div className="p-3 flex items-center gap-2.5 border-b border-slate-100">
                      <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xs">
                        AK
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 hover:underline cursor-pointer flex items-center gap-1">
                          AK Development
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">Sponsored • Paid Outreach</div>
                      </div>
                    </div>

                    {/* Primary Text */}
                    <div className="p-3.5 text-xs text-slate-800 leading-relaxed border-b border-slate-100 relative bg-slate-50/50">
                      <pre className="font-sans whitespace-pre-wrap">{activePrimaryText}</pre>
                      
                      <button 
                        onClick={() => handleCopy(activePrimaryText, "primary")}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 transition-colors shadow-sm"
                        title="Copy Primary Text"
                      >
                        {copiedField === "primary" ? <Check className="w-4.5 h-4.5 text-emerald-500" /> : <Copy className="w-4.5 h-4.5" />}
                      </button>
                    </div>

                    {/* Creative Poster Container (Visual layout preview) */}
                    <div className="p-6 bg-gradient-to-br from-slate-950 to-indigo-950 text-white min-h-[180px] flex flex-col justify-between relative overflow-hidden border-b border-slate-200">
                      <div className="absolute top-0 right-0 p-1 bg-gradient-to-l from-indigo-500/20 to-transparent w-36 h-36 rounded-full blur-xl pointer-events-none"></div>
                      
                      <div>
                        <span className="text-[9px] font-black tracking-widest text-indigo-400 uppercase bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-900">
                          AK DEVELOPMENT • ₹499 COMPLETE
                        </span>
                        <h2 className="text-xl md:text-2xl font-black mt-3 leading-tight tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent uppercase">
                          {activePoster.headlineText}
                        </h2>
                      </div>

                      <div className="pt-4 border-t border-slate-900/80 flex items-end justify-between relative z-10">
                        <div className="text-xs text-slate-300 font-semibold max-w-[200px]">
                          {activePoster.subText}
                        </div>
                        <div className="px-3 py-1.5 rounded bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                          CLAIM FOR ₹499
                        </div>
                      </div>

                      {/* Canva layout instructions helper label */}
                      <div className="absolute bottom-1 right-2 text-[8px] text-slate-600">
                        Template representation
                      </div>
                    </div>

                    {/* Ad Bottom CTA Panel */}
                    <div className="p-3 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                      <div className="max-w-[190px]">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">AK.DEVELOPMENT</div>
                        <div className="text-xs font-bold text-slate-800 truncate leading-tight mt-0.5">
                          {activeHeadline}
                        </div>
                      </div>
                      <a 
                        href="#enroll-section"
                        className="px-4 py-1.5 rounded bg-slate-200 hover:bg-slate-300 border border-slate-300 font-bold text-[11px] text-slate-800 uppercase tracking-wide transition-colors"
                      >
                        Learn More
                      </a>
                    </div>

                  </div>
                </div>

                {/* 2. REELS SCRIPT MOCKUP (Lg: col-span-5) */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-indigo-400" />
                    Short Reels Script
                  </h4>

                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-4 shadow-lg text-xs relative">
                    
                    <button 
                      onClick={() => handleCopy(`${activeReelScript.hook}\n\n${activeReelScript.body}\n\n${activeReelScript.cta}`, "reels")}
                      className="absolute top-3.5 right-3.5 text-slate-500 hover:text-white transition-colors"
                      title="Copy Full Reels Script"
                    >
                      {copiedField === "reels" ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                    </button>

                    <div className="space-y-3 pt-2">
                      <div className="border-l-2 border-amber-500 pl-3">
                        <div className="text-[9px] text-amber-400 font-bold uppercase tracking-wider mb-0.5">Section 1: The Hook (0-3s)</div>
                        <p className="text-slate-200 text-xs leading-relaxed italic">{activeReelScript.hook}</p>
                      </div>

                      <div className="border-l-2 border-indigo-500 pl-3">
                        <div className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider mb-0.5">Section 2: The Body (3-30s)</div>
                        <p className="text-slate-200 text-xs leading-relaxed italic">{activeReelScript.body}</p>
                      </div>

                      <div className="border-l-2 border-emerald-500 pl-3">
                        <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Section 3: The CTA (30-40s)</div>
                        <p className="text-slate-200 text-xs leading-relaxed italic">{activeReelScript.cta}</p>
                      </div>
                    </div>

                  </div>

                  {/* Canva Design layout guide info box */}
                  <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-2">
                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5 text-indigo-400" />
                      Canva / Poster Design Guide
                    </div>
                    <div className="text-xs text-slate-300">
                      <span className="font-bold text-white block mb-1">Visual Layout Instructions:</span>
                      {activePoster.visualLayout}
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                      <span className="font-bold text-slate-300">Text overlay to paste:</span> {activePoster.headlineText} — {activePoster.subText}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
