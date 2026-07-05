import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for student leads/registrations
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  persona: "student" | "homemaker" | "jobseeker" | "entrepreneur";
  notes?: string;
  createdAt: string;
  status: "pending" | "contacted" | "enrolled";
}

const leads: Lead[] = [
  {
    id: "lead-1",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    phone: "+91 98765 43210",
    persona: "student",
    notes: "Interested in freelance web design. Knows basic HTML.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "contacted"
  },
  {
    id: "lead-2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    persona: "homemaker",
    notes: "Wants to start a remote side hustle while parenting.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "enrolled"
  },
  {
    id: "lead-3",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    persona: "jobseeker",
    notes: "Career switcher from sales. Looking for a tech portfolio.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: "pending"
  }
];

// Lazy-loaded Gemini AI client to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REGISTER API ENDPOINTS FIRST

// 1. Capture/Enroll Lead
app.post("/api/enroll", (req, res) => {
  try {
    const { name, email, phone, persona, notes } = req.body;
    if (!name || !email || !phone || !persona) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name,
      email,
      phone,
      persona,
      notes: notes || "",
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    leads.unshift(newLead);
    res.status(201).json({ success: true, lead: newLead });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to submit enrollment" });
  }
});

// 2. Fetch leads (Admin/dashboard view)
app.get("/api/leads", (req, res) => {
  res.json({ leads });
});

// 3. Update lead status
app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const leadIndex = leads.findIndex((l) => l.id === id);

  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }

  leads[leadIndex].status = status;
  res.json({ success: true, lead: leads[leadIndex] });
});

// 4. Generate AI Ad copy & scripts tailored for targeted audiences
app.post("/api/generate-copy", async (req, res) => {
  try {
    const { persona, tone = "urgent" } = req.body;
    if (!persona) {
      return res.status(400).json({ error: "Please specify target audience persona" });
    }

    const client = getGeminiClient();

    const systemPrompt = `You are an elite, high-converting direct response copywriter and Meta Ads specialist.
Your mission is to write extremely high-converting marketing materials for AK Development's ₹499 Website Development Course.
This course costs exactly ₹499 (INR), teaches full-stack modern website building (HTML, CSS, Tailwind, JS, hosting, freelancing), and is highly practical with a certification.

Structure your response strictly in JSON format as specified in the schema. Do not include markdown codeblocks outside the JSON format.
The output JSON must contain exactly these properties:
- primaryText: A compelling, highly persuasive Meta Ad Primary Text with emojis and bullet points. Must speak directly to the audience segment.
- hook1: A short, punchy 1-line hook to test as hook variant A.
- hook2: A compelling pattern-interrupt hook to test as hook variant B.
- headline: A ultra-clickable ad headline (max 40 chars) summarizing the deal.
- reelScript: An interactive, engaging reels/short-video script containing:
  - hook: 0-3 seconds video hook (scene + voiceover)
  - body: 3-30 seconds quick steps/benefit points (scene + voiceover)
  - cta: Call to action for the ₹499 course (scene + voiceover)
- posterConcept: Canva poster design layout idea, text overlay text, and visual suggestions.
- targetAngleExplain: Why this ad copy converts this specific persona.

Personas to craft for:
- "student": Focus on pocket money, freelancing, modern resume, portfolio creation, breaking into tech.
- "homemaker": Focus on financial independence from home, flexible hours, passive side-income, easy visual website builders, creative control.
- "jobseeker": Focus on highly-paid developer skills, career transition, tech resume upgrade, certification, portfolio building.
- "entrepreneur": Focus on stopping wasting lakhs on agencies, launching landing pages fast independently, testing ideas in hours, controlling marketing.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate high-converting marketing copy for the target persona: "${persona}". Use a "${tone}" tone. Ensure it highlights the ₹499 pricing and AK Development.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object" as any,
          properties: {
            primaryText: { type: "string" as any, description: "Direct-response ad copy with hooks, bullet points, benefits, and CTA." },
            hook1: { type: "string" as any, description: "Short, thumb-stopping hook variant A." },
            hook2: { type: "string" as any, description: "Pattern-interrupt hook variant B." },
            headline: { type: "string" as any, description: "Punchy, action-oriented Meta Ads headline." },
            reelScript: {
              type: "object" as any,
              properties: {
                hook: { type: "string" as any, description: "Scene setting + audio lines for the first 3 seconds." },
                body: { type: "string" as any, description: "Video flow with visual suggestions and voiceover points." },
                cta: { type: "string" as any, description: "Closing CTA highlighting ₹499 registration." }
              },
              required: ["hook", "body", "cta"]
            },
            posterConcept: {
              type: "object" as any,
              properties: {
                headlineText: { type: "string" as any, description: "Main bold text to put on the poster." },
                subText: { type: "string" as any, description: "Supporting text or price tag overlay." },
                visualLayout: { type: "string" as any, description: "Visual and background styling layout guide for Canva." }
              },
              required: ["headlineText", "subText", "visualLayout"]
            },
            targetAngleExplain: { type: "string" as any, description: "Quick strategy explanation for why this works." }
          },
          required: ["primaryText", "hook1", "hook2", "headline", "reelScript", "posterConcept", "targetAngleExplain"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response received from Gemini API");
    }

    res.json(JSON.parse(responseText));
  } catch (error: any) {
    console.error("Gemini copy generation failed:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI copy" });
  }
});

// MOUNT VITE MIDDLEWARE AFTER API ROUTES

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
