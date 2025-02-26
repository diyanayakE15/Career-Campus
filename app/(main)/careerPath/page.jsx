"use client" 
import { useState } from "react";
import { getCareerRoadmap } from "@/actions/careerPath";

export default function Home() {
  const [career, setCareer] = useState("");
  const [timeline, setTimeline] = useState("12"); // Default to 12 months
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRoadmap = async () => {
    setLoading(true);
    setError("");
    setRoadmap("");

    try {
      const timelineNum = parseInt(timeline);
      if (!career) throw new Error("Career is required");
      if (!timeline || isNaN(timelineNum) || timelineNum < 1 || timelineNum > 24) {
        throw new Error("Valid timeline (1-24 months) is required");
      }

      const roadmapText = await getCareerRoadmap(career, timelineNum);
      if (!roadmapText || roadmapText.trim() === "") {
        throw new Error("Roadmap generation failed or returned empty text.");
      }

      setRoadmap(roadmapText);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const renderFlowchart = (text) => {
    const steps = text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const [timeUnit, task] = line.split(":");
        return { timeUnit: timeUnit.trim(), task: task.trim() };
      });

    const colors = [
      "bg-chart-1",
      "bg-chart-2",
      "bg-chart-3",
      "bg-chart-4",
      "bg-chart-5",
    ]; // Using chart colors from Tailwind config

    return (
      <div className="flex flex-col items-center gap-5 w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center relative">
            {/* Vertical Arrow */}
            {index > 0 && (
              <div
                className="absolute top-[-20px] left-[48%] w-0.5 h-5 bg-muted-foreground"
                style={{ transform: "translateX(-50%)" }}
              />
            )}

            {/* Task Box */}
            <div
              className={`p-2.5 px-5 ${colors[index % colors.length]} border-2 border-foreground rounded-lg min-w-[200px] text-center font-bold text-foreground shadow-md`}
            >
              {step.task}
            </div>

            {/* Time Unit Label on Right (Week or Month) */}
            <div className="ml-2.5 font-bold text-foreground">{step.timeUnit}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-5 max-w-[800px] mx-auto bg-background text-foreground">
      <h1 className="text-3xl font-bold gradient-title mb-5">Career Path Generator</h1>
      <input
        type="text"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
        placeholder="Enter a career (e.g., Software Engineer)"
        className="w-full p-2.5 mb-2.5 border border-input bg-input rounded-lg text-foreground"
      />
      <label htmlFor="timeline" className="mr-2.5 text-foreground">
        Select Timeline (months):
      </label>
      <select
        id="timeline"
        value={timeline}
        onChange={(e) => setTimeline(e.target.value)}
        className="p-2 mb-2.5 border border-input bg-input rounded-lg text-foreground"
      >
        <option value="1">1 Month</option>
        <option value="2">2 Months</option>
        <option value="3">3 Months</option>
        <option value="6">6 Months</option>
        <option value="12">12 Months</option>
        <option value="18">18 Months</option>
        <option value="24">24 Months</option>
      </select>
      <button
        onClick={generateRoadmap}
        disabled={loading}
        className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
      >
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {error && <div className="text-destructive mt-2.5">{error}</div>}

      {roadmap && (
        <div className="mt-5">
          <h2 className="text-2xl font-bold gradient-title mb-2.5">Your Career Roadmap (Text)</h2>
          <pre className="whitespace-pre-wrap bg-card p-2.5 rounded-lg text-card-foreground">{roadmap}</pre>
        </div>
      )}

      {roadmap && (
        <div className="mt-5">
          <h2 className="text-2xl font-bold gradient-title mb-2.5">Visual Roadmap</h2>
          {renderFlowchart(roadmap)}
        </div>
      )}
    </div>
  );
}