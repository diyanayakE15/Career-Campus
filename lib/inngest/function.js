import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ event, step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return await model.generateContent(p);
        },
        prompt
      );

      const text = res.response.candidates[0].content.parts[0].text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      const insights = JSON.parse(cleanedText);

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);

const genAI1 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY1 || "");

export const generateRoadmap = inngest.createFunction(
  { 
    id: "generate-roadmap",
    name: "Generate Career Roadmap" 
  },
  { event: "app/generate.roadmap" },  
  async ({ event, step }) => {
    try {
      const { career, timeline } = event.data;
      
      if (!career) {
        throw new Error("Career is required");
      }
      if (!timeline || isNaN(parseInt(timeline)) || parseInt(timeline) < 1 || parseInt(timeline) > 24) {
        throw new Error("Valid timeline (1-24 months) is required");
      }

      const timelineNum = parseInt(timeline);
      const useWeeks = timelineNum <= 3;
      const timeUnit = useWeeks ? "weeks" : "months";
      const adjustedTimelineNum = useWeeks ? timelineNum * 4 : timelineNum;
      
      const model1 = genAI1.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Create a career roadmap for a ${career} spanning ${adjustedTimelineNum} ${timeUnit}.
      Format each step as "${useWeeks ? `Week X: Skill` : `Month X: Skill`}" 
      (e.g., ${useWeeks ? "Week 1: Git Basics" : "Month 1: Git & GitHub"}).
      Use only 3-4 word phrases for skills, no long descriptions. 
      Distribute the skills evenly over ${adjustedTimelineNum} ${timeUnit}. 
      ${useWeeks 
        ? `Ensure each step starts with exactly "Week X:" where X is the week number (1 to ${adjustedTimelineNum}).` 
        : `Ensure each step starts with exactly "Month X:" where X is the month number (1 to ${adjustedTimelineNum}).`} 
      `;

      const result = await step.run("generate-content", async () => {
        return await model1.generateContent(prompt);
      });

      let roadmap = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      roadmap = roadmap
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .map((line) => {
          if (useWeeks) {
            const weekMatch = line.match(/^Week (\d+):/);
            if (!weekMatch || parseInt(weekMatch[1]) > adjustedTimelineNum) {
              return `Week ${parseInt(weekMatch?.[1] || "1")}: ${line.split(":")[1]?.trim() || "Basic Skill"}`;
            }
            return line;
          } else {
            const monthMatch = line.match(/^Month (\d+):/);
            if (!monthMatch || parseInt(monthMatch[1]) > adjustedTimelineNum) {
              return `Month ${parseInt(monthMatch?.[1] || "1")}: ${line.split(":")[1]?.trim() || "Basic Skill"}`;
            }
            return line;
          }
        })
        .join("\n");

      if (!roadmap) {
        throw new Error("Failed to generate roadmap");
      }

      return { text: roadmap };
    } catch (error) {
      return { error: error.message };
    }
  }
);
