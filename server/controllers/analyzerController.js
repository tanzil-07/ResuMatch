import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { PDFParse } from "pdf-parse";
import Analysis from "../models/Analysis.js";

dotenv.config();

const clampScore = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(number)));
};

const cleanString = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const cleanStringArray = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizePriority = (value) => {
  const priority = String(value || "").toLowerCase().trim();

  if (priority === "high") return "high";
  if (priority === "medium") return "medium";

  return "low";
};

const normalizeImpact = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 1;
  }

  return Math.max(1, Math.min(20, Math.round(number)));
};

const normalizeSectionScores = (sectionScores = {}) => {
  return {
    technicalSkills: clampScore(sectionScores.technicalSkills),
    projects: clampScore(sectionScores.projects),
    experience: clampScore(sectionScores.experience),
    education: clampScore(sectionScores.education),
    jobRelevance: clampScore(sectionScores.jobRelevance),
  };
};

const normalizeImprovementPlan = (plan) => {
  if (!Array.isArray(plan)) {
    return [];
  }

  return plan
    .map((item) => ({
      title: cleanString(item?.title),
      description: cleanString(item?.description),
      impact: normalizeImpact(item?.impact),
      priority: normalizePriority(item?.priority),
    }))
    .filter((item) => item.title && item.description)
    .slice(0, 5);
};

const normalizeJobComparison = (comparison = {}) => {
  const normalizeItems = (items) => {
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .map((item) => {
        if (typeof item === "string") {
          return {
            name: item.trim(),
            evidence: "",
            status: "missing",
          };
        }

        const status = String(item?.status || "")
          .toLowerCase()
          .trim();

        let normalizedStatus = "missing";

        if (
          status === "matched" ||
          status === "match" ||
          status === "strong"
        ) {
          normalizedStatus = "matched";
        } else if (
          status === "partial" ||
          status === "partially matched"
        ) {
          normalizedStatus = "partial";
        }

        return {
          name: cleanString(item?.name),
          evidence: cleanString(item?.evidence),
          status: normalizedStatus,
        };
      })
      .filter((item) => item.name);
  };

  return {
    matchPercentage: clampScore(comparison.matchPercentage),

    resumeHighlights: cleanStringArray(comparison.resumeHighlights),

    targetRequirements: cleanStringArray(
      comparison.targetRequirements
    ),

    matchedSkills: normalizeItems(comparison.matchedSkills),

    partialMatches: normalizeItems(comparison.partialMatches),

    missingSkills: normalizeItems(comparison.missingSkills),

    relevantExperience: cleanStringArray(
      comparison.relevantExperience
    ),

    relevantProjects: cleanStringArray(
      comparison.relevantProjects
    ),

    criticalGaps: cleanStringArray(comparison.criticalGaps),

    recommendations: cleanStringArray(
      comparison.recommendations
    ),
  };
};

const analyzeResume = async (req, res) => {
  try {
    const {
      jobDescription = "",
      resumeLabel = "Resume",
      jobLabel = "Target Job",
    } = req.body;

    let extractedResumeText = "";

    /*
     * ---------------------------------------------------------
     * 1. Extract resume text from uploaded PDF
     * ---------------------------------------------------------
     */

    if (req.file) {
      try {
        const parser = new PDFParse({
          data: req.file.buffer,
        });

        const result = await parser.getText();

        extractedResumeText = result.text || "";

        await parser.destroy();
      } catch (pdfError) {
        console.error("PDF extraction error:", pdfError);

        return res.status(400).json({
          success: false,
          message: "Could not read the uploaded PDF.",
        });
      }
    }

    if (!extractedResumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: "No readable text was found in the resume.",
      });
    }

    /*
     * ---------------------------------------------------------
     * 2. Check Gemini API key
     * ---------------------------------------------------------
     */

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured.",
      });
    }

    /*
     * ---------------------------------------------------------
     * 3. Initialize Gemini
     * ---------------------------------------------------------
     */

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    /*
     * ---------------------------------------------------------
     * 4. Build AI prompt
     * ---------------------------------------------------------
     */

    const prompt = `
You are an expert ATS resume analyzer, recruiter, and career coach.

Analyze the candidate's resume against the target job description.

IMPORTANT RULES:
1. Do NOT invent experience, projects, skills, certifications, tools, achievements, or education.
2. Only claim something is present if it is supported by the resume.
3. If something is required by the job but not present in the resume, classify it as missing.
4. If the resume shows related but incomplete evidence, classify it as partial.
5. Scores must be realistic, not overly generous.
6. All scores must be integers from 0 to 100.
7. The improvement impact values are estimated potential improvements, NOT guaranteed score increases.
8. If a recommendation requires learning a new technology or skill, clearly state that it requires learning/building first.
9. Prioritize practical changes that genuinely improve the resume.
10. Return ONLY valid JSON. No markdown. No explanation outside JSON.

==================================================
RESUME
==================================================

${extractedResumeText}

==================================================
TARGET JOB DESCRIPTION
==================================================

${jobDescription || "No specific job description was provided."}

==================================================
RETURN EXACTLY THIS JSON STRUCTURE
==================================================

{
  "overallScore": 0,
  "atsMatchScore": 0,

  "summary": "",

  "sectionScores": {
    "technicalSkills": 0,
    "projects": 0,
    "experience": 0,
    "education": 0,
    "jobRelevance": 0
  },

  "improvementPlan": [
    {
      "title": "",
      "description": "",
      "impact": 1,
      "priority": "high"
    }
  ],

  "strengths": [],
  "weaknesses": [],

  "matchedKeywords": [],
  "missingKeywords": [],

  "atsSuggestions": [],
  "suggestions": [],

  "jobComparison": {
    "matchPercentage": 0,

    "resumeHighlights": [],

    "targetRequirements": [],

    "matchedSkills": [
      {
        "name": "",
        "evidence": "",
        "status": "matched"
      }
    ],

    "partialMatches": [
      {
        "name": "",
        "evidence": "",
        "status": "partial"
      }
    ],

    "missingSkills": [
      {
        "name": "",
        "evidence": "",
        "status": "missing"
      }
    ],

    "relevantExperience": [],

    "relevantProjects": [],

    "criticalGaps": [],

    "recommendations": []
  }
}

==================================================
FIELD INSTRUCTIONS
==================================================

overallScore:
Give the resume's overall quality score from 0-100.

atsMatchScore:
Estimate how well this resume matches the TARGET JOB specifically.

summary:
Write a concise recruiter-style assessment.

sectionScores:
Score each section independently:
- technicalSkills
- projects
- experience
- education
- jobRelevance

improvementPlan:
Return 3-5 highest-impact improvements.
Use:
- priority = high, medium, or low
- impact = estimated possible score improvement from 1-20

strengths:
List the strongest genuine qualities in the resume.

weaknesses:
List the most important weaknesses.

matchedKeywords:
Keywords/technologies genuinely present in both the resume and job.

missingKeywords:
Important job keywords that are not supported by the resume.

atsSuggestions:
Suggestions specifically related to ATS compatibility.

suggestions:
General actionable resume/career suggestions.

==================================================
JOB COMPARISON
==================================================

matchPercentage:
A 0-100 estimate of resume-to-job fit.

resumeHighlights:
List the strongest parts of the resume that are relevant to THIS job.

targetRequirements:
List the most important requirements explicitly or strongly implied by the job description.

matchedSkills:
Skills/tools/concepts where the resume provides genuine evidence and the job also wants them.

For every item:
- name = skill/tool/concept
- evidence = short explanation of what the resume shows
- status = "matched"

partialMatches:
Skills where the resume has related knowledge but does not fully satisfy the job requirement.

For every item:
- name
- evidence
- status = "partial"

missingSkills:
Important requirements from the job that are not supported by the resume.

For every item:
- name
- evidence = explain briefly that there is no sufficient evidence in the resume
- status = "missing"

relevantExperience:
Only include actual resume experience that is relevant to the target job.

relevantProjects:
Only include actual projects from the resume that are relevant to the target job.

criticalGaps:
List the biggest gaps preventing the candidate from being a strong match.

recommendations:
Give practical actions to improve the candidate's fit for THIS job.

Do not pretend that learning a missing skill means the candidate already has it.

==================================================
IMPORTANT
==================================================

If there is no job description:
- atsMatchScore should reflect limited job-specific matching information.
- jobComparison.matchPercentage should be conservative.
- targetRequirements and missingSkills can be empty or explain that no target requirements were supplied.

Again: RETURN ONLY VALID JSON.
`;

    /*
     * ---------------------------------------------------------
     * 5. Call Gemini
     * ---------------------------------------------------------
     */


    const response = await ai.models.generateContent({
  model: "gemini-3.5-flash-lite",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
  },
});
    /*
     * ---------------------------------------------------------
     * 6. Get AI response text
     * ---------------------------------------------------------
     */

    let responseText = "";

    if (typeof response?.text === "string") {
      responseText = response.text;
    } else if (typeof response?.text === "function") {
      responseText = response.text();
    } else if (response?.response?.text) {
      responseText =
        typeof response.response.text === "function"
          ? response.response.text()
          : response.response.text;
    }

    responseText = String(responseText || "").trim();

    if (!responseText) {
      console.error("Gemini returned an empty response.");

      return res.status(500).json({
        success: false,
        message: "AI returned an empty response.",
      });
    }

    /*
     * ---------------------------------------------------------
     * 7. Parse JSON
     * ---------------------------------------------------------
     */

    let parsedAnalysis;

    try {
      parsedAnalysis = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("Gemini JSON parsing error:", jsonError);
      console.error("Raw Gemini response:", responseText);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid analysis data.",
      });
    }

    /*
     * ---------------------------------------------------------
     * 8. Normalize + validate AI result
     * ---------------------------------------------------------
     */

    const sectionScores = normalizeSectionScores(
      parsedAnalysis.sectionScores
    );

    const improvementPlan = normalizeImprovementPlan(
      parsedAnalysis.improvementPlan
    );

    const jobComparison = normalizeJobComparison(
      parsedAnalysis.jobComparison
    );

    const analysis = {
      overallScore: clampScore(parsedAnalysis.overallScore),

      atsMatchScore: clampScore(
        parsedAnalysis.atsMatchScore
      ),

      summary:
        cleanString(parsedAnalysis.summary) ||
        "No summary was generated.",

      sectionScores,

      improvementPlan,

      strengths: cleanStringArray(
        parsedAnalysis.strengths
      ),

      weaknesses: cleanStringArray(
        parsedAnalysis.weaknesses
      ),

      matchedKeywords: cleanStringArray(
        parsedAnalysis.matchedKeywords
      ),

      missingKeywords: cleanStringArray(
        parsedAnalysis.missingKeywords
      ),

      atsSuggestions: cleanStringArray(
        parsedAnalysis.atsSuggestions
      ),

      suggestions: cleanStringArray(
        parsedAnalysis.suggestions
      ),

      jobComparison,
    };

    /*
     * ---------------------------------------------------------
     * 9. Send result to frontend
     * ---------------------------------------------------------
     */

    return res.status(200).json({
      success: true,

      analysis,

      resumeText: extractedResumeText,

      jobDescription,

      resumeLabel,

      jobLabel,

      originalFileName: req.file
        ? req.file.originalname
        : null,
    });
  } catch (error) {
    console.error("Analyze resume error:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Something went wrong while analyzing the resume.",
    });
  }
};

/*
 * ============================================================
 * SAVE ANALYSIS
 * ============================================================
 */

const saveAnalysis = async (req, res) => {
  try {
    const {
      analysis,
      resumeText,
      jobDescription,
      resumeLabel,
      jobLabel,
      originalFileName,
    } = req.body;

    if (!analysis) {
      return res.status(400).json({
        success: false,
        message: "Analysis data is required.",
      });
    }

    const savedAnalysis = await Analysis.create({
      userId: req.user.id,
      analysis,
      resumeText: resumeText || "",
      jobDescription: jobDescription || "",
      resumeLabel: resumeLabel || "Resume",
      jobLabel: jobLabel || "Target Job",
      originalFileName: originalFileName || null,
    });

    return res.status(201).json({
      success: true,
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.error("Save analysis error:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Could not save analysis.",
    });
  }
};

/*
 * ============================================================
 * GET USER ANALYSES
 * ============================================================
 */

const getUserAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      analyses,
    });
  } catch (error) {
    console.error("Get analyses error:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Could not retrieve analyses.",
    });
  }
};

/*
 * ============================================================
 * DELETE ANALYSIS
 * ============================================================
 */

const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnalysis =
      await Analysis.findOneAndDelete({
        _id: id,
        userId: req.user.id,
      });

    if (!deletedAnalysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Analysis deleted successfully.",
    });
  } catch (error) {
    console.error("Delete analysis error:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Could not delete analysis.",
    });
  }
};

export {
  analyzeResume,
  saveAnalysis,
  getUserAnalyses,
  deleteAnalysis,
};