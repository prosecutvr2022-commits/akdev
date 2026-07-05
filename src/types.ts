export type PersonaType = "student" | "homemaker" | "jobseeker" | "entrepreneur";

export interface PersonaContent {
  id: PersonaType;
  title: string;
  badge: string;
  hook: string;
  subHook: string;
  painPoint: string;
  dreamOutcome: string;
  benefits: string[];
  imagePrompt: string; // Used for descriptive visuals
}

export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  description: string;
  lessons: string[];
  highlight: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  persona: PersonaType;
  text: string;
  avatar: string;
  earningNote?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  persona: PersonaType;
  notes?: string;
  createdAt: string;
  status: "pending" | "contacted" | "enrolled";
}

export interface AIMarketingOutput {
  primaryText: string;
  hook1: string;
  hook2: string;
  headline: string;
  reelScript: {
    hook: string;
    body: string;
    cta: string;
  };
  posterConcept: {
    headlineText: string;
    subText: string;
    visualLayout: string;
  };
  targetAngleExplain: string;
}
