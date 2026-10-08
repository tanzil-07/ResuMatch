import { Link } from "react-router-dom";
import { useState } from "react";
import AnalysisCard from "../components/AnalysisCard";
import "./AnalyzerWorkspace.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AnalyzerWorkspace({ demoMode = false }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resumeLabel, setResumeLabel] = useState("");
  const [jobLabel, setJobLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleAnalyze = async () => {
    const trimmedResumeText = resumeText.trim();

    if (!trimmedResumeText && !resumeFile) {
      setError("Please paste your resume or upload a PDF.");
      setAnalysis(null);
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();

      formData.append("resumeText", trimmedResumeText);
      formData.append("jobDescription", jobDescription.trim());
      formData.append("resumeLabel", resumeLabel.trim());
      formData.append("jobLabel", jobLabel.trim());

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }

      const token = localStorage.getItem("token");

      const headers = demoMode
        ? {}
        : {
            Authorization: `Bearer ${token}`,
          };

      const response = await fetch(`${API_BASE_URL}/api/analyzer`, {
        method: "POST",
        headers,
        body: formData,
      });

      const responseText = await response.text();

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            `Server returned an invalid response (${response.status}).`
          );
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setAnalysis({
        analysisResult: data.analysis,
        resumeText: data.resumeText,
        jobDescription: data.jobDescription,
        resumeLabel: data.resumeLabel,
        jobLabel: data.jobLabel,
        originalFileName: data.originalFileName,
      });

      setSaved(false);
    } catch (err) {
      console.error("Analyze error:", err);
      setError(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!analysis || demoMode) return;

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/analyzer/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeText: analysis.resumeText,
          jobDescription: analysis.jobDescription,
          analysisResult: analysis.analysisResult,
          resumeLabel: analysis.resumeLabel,
          jobLabel: analysis.jobLabel,
          originalFileName: analysis.originalFileName,
        }),
      });

      const responseText = await response.text();

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            `Server returned an invalid response (${response.status}).`
          );
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to save analysis.");
      }

      setSaved(true);
    } catch (err) {
      console.error("Save error:", err);
      alert(err.message || "Failed to save analysis.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-5 sm:px-7 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  {demoMode
                    ? "Public Demo Mode"
                    : "AI-Powered Resume Review"}
                </p>
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                AI Resume Analyzer
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {demoMode
                  ? "Analyze your resume instantly without creating an account."
                  : "Get structured feedback, ATS insights, strengths, weaknesses, and actionable improvements."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {/* MODE */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Mode
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-slate-700">
                    {demoMode ? "Demo" : "AI Analysis"}
                  </p>
                </div>
              </div>

              {demoMode ? (
                <>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Back Home
                  </Link>

                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Home
                  </Link>

                  <Link
                    to="/history"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    History
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ANALYZER INPUT */}
        <section className="analyzer-workspace">
          <div className="analyzer-workspace-header">
            <div>
              <p className="analyzer-eyebrow">Resume Input</p>

              <h2>Build your analysis</h2>

              <p>
                Add your resume and optionally provide a target job description
                to get a more accurate ATS comparison.
              </p>
            </div>

            <div className="analyzer-header-badge">
              <span className="analyzer-header-badge-dot" />
              Manual Paste + PDF
            </div>
          </div>

          {/* RESUME NAME + JOB LABEL */}
          <div className="analyzer-label-grid">
            <div className="analyzer-field">
              <label htmlFor="resume-label">Resume Name</label>

              <input
                id="resume-label"
                type="text"
                value={resumeLabel}
                onChange={(e) => setResumeLabel(e.target.value)}
                placeholder="Example: SWE Resume v2"
              />
            </div>

            <div className="analyzer-field">
              <label htmlFor="job-label">Job Label</label>

              <input
                id="job-label"
                type="text"
                value={jobLabel}
                onChange={(e) => setJobLabel(e.target.value)}
                placeholder="Example: Software Developer"
              />
            </div>
          </div>

          {/* RESUME TEXT */}
          <div className="analyzer-field analyzer-resume-field">
            <div className="analyzer-field-heading">
              <label htmlFor="resume-text">Resume Text</label>

              <span>Paste your resume content</span>
            </div>

            <textarea
              id="resume-text"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your complete resume here..."
              className="analyzer-resume-textarea"
            />
          </div>

          {/* PDF + JOB DESCRIPTION */}
          <div className="analyzer-input-grid">
            <div className="analyzer-field analyzer-upload-field">
              <div className="analyzer-field-heading">
                <label htmlFor="resume-file">Resume PDF</label>

                <span>Optional</span>
              </div>

              <label htmlFor="resume-file" className="analyzer-upload-box">
                <div className="analyzer-upload-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 16V4" />
                    <path d="m7 9 5-5 5 5" />
                    <path d="M5 20h14" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p>
                    {resumeFile
                      ? resumeFile.name
                      : "Upload your resume PDF"}
                  </p>

                  <span>
                    {resumeFile
                      ? "PDF selected successfully"
                      : "Click to browse · PDF only"}
                  </span>
                </div>
              </label>

              <input
                id="resume-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) =>
                  setResumeFile(e.target.files?.[0] || null)
                }
                className="hidden"
              />
            </div>

            <div className="analyzer-field">
              <div className="analyzer-field-heading">
                <label htmlFor="job-description">
                  Job Description
                </label>

                <span>Optional · ATS matching</span>
              </div>

              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here..."
                className="analyzer-job-textarea"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="analyzer-error">
              <div className="analyzer-error-icon">!</div>

              <p>{error}</p>
            </div>
          )}

          {/* ANALYZE BUTTON */}
          <div className="analyzer-action-row">
            <div>
              <p className="analyzer-action-title">
                Ready to analyze?
              </p>

              <p className="analyzer-action-description">
                {jobDescription.trim()
                  ? "Your resume will also be compared against the target job description."
                  : "Add a job description above if you want ATS matching and skill-gap analysis."}
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={
                loading ||
                (!resumeText.trim() && !resumeFile)
              }
              className="analyzer-button"
            >
              {loading ? (
                <>
                  <span className="analyzer-spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Resume
                  <span className="analyzer-button-arrow">
                    →
                  </span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* RESULTS */}
        <section className="analyzer-results">
          <div className="analyzer-results-header">
            <div>
              <p className="analyzer-eyebrow">Analysis Result</p>

              <h2>Resume evaluation</h2>

              <p>
                Review your overall score, section breakdown, ATS insights,
                skill gaps, and recommended improvements.
              </p>
            </div>

            {analysis && (
              <div className="analyzer-result-status">
                <span />
                Analysis complete
              </div>
            )}
          </div>

          <div className="analyzer-results-body">
            <AnalysisCard
              analysis={analysis?.analysisResult || null}
              loading={loading}
            />
          </div>

          {/* SAVE */}
          {analysis && (
            <div className="analyzer-save-area">
              {demoMode ? (
                <div className="analyzer-demo-banner">
                  <div className="analyzer-demo-dot" />

                  <div>
                    <p>Demo Mode</p>

                    <span>
                      Save and history features are available after
                      creating an account.
                    </span>
                  </div>

                  <Link
                    to="/signup"
                    className="analyzer-demo-button"
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleSaveAnalysis}
                  disabled={saving || saved}
                  className="analyzer-save-button"
                >
                  {saved
                    ? "Saved ✓"
                    : saving
                      ? "Saving..."
                      : "Save Analysis"}
                </button>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AnalyzerWorkspace;