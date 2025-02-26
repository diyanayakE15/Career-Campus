"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIRoadmap = async (career, timeline) => {
  if (!career) throw new Error("Career is required");
  if (!timeline || isNaN(parseInt(timeline)) || parseInt(timeline) < 1 || parseInt(timeline) > 24) {
    throw new Error("Valid timeline (1-24 months) is required");
  }

  const timelineNum = parseInt(timeline);
  const useWeeks = timelineNum <= 3;
  const timeUnit = useWeeks ? "weeks" : "months";
  const adjustedTimelineNum = useWeeks ? timelineNum * 4 : timelineNum;

  const prompt = `Create a career roadmap for a ${career} spanning ${adjustedTimelineNum} ${timeUnit}.
  Format each step as "${useWeeks ? `Week X: Skill` : `Month X: Skill`}" 
  (e.g., ${useWeeks ? "Week 1: Git Basics" : "Month 1: Git & GitHub"}).
  Use only 3-4 word phrases for skills, no long descriptions. 
  Distribute the skills evenly over ${adjustedTimelineNum} ${timeUnit}.
  ${useWeeks 
    ? `Ensure each step starts with exactly "Week X:" where X is the week number (1 to ${adjustedTimelineNum}).` 
    : `Ensure each step starts with exactly "Month X:" where X is the month number (1 to ${adjustedTimelineNum}).`} 
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return cleanedText;
};

export async function getCareerRoadmap(career, timeline) {
  if (!career) throw new Error("Career is required");
  if (!timeline || isNaN(parseInt(timeline)) || parseInt(timeline) < 1 || parseInt(timeline) > 24) {
    throw new Error("Valid timeline (1-24 months) is required");
  }

  // Directly generate the roadmap without storing user data
  const roadmap = await generateAIRoadmap(career, timeline);
  
  return roadmap;
}
