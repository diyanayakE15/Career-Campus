import Link from "next/link";
import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";

export const features = [
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: "Industry Insights",
    description:
      "Stay ahead with real-time industry trends, salary data, and market analysis.",
    link: "/dashboard", // Redirect path
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
    link: "/interview", // Redirect path
  },
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "Cover Letter Creation",
    description:
      "Generate personalized, job-specific cover letters in seconds with AI-driven writing assistance.",
    link: "/ai-cover-letter", // Redirect path
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
    link: "/resume", // Redirect path
  },
];
