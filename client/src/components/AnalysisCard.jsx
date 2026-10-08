import React from "react";
import "./AnalysisCard.css";

/* =========================================================
   HELPERS
   ========================================================= */

const clamp = (value, min = 0, max = 100) => {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.min(max, Math.max(min, num));
};

const getScoreLabel = (score) => {
  const value = clamp(score);

  if (value >= 85) return "Excellent";
  if (value >= 70) return "Good";
  if (value >= 50) return "Needs improvement";
  return "Needs attention";
};

const getScoreClass = (score) => {
  const value = clamp(score);

  if (value >= 85) return "excellent";
  if (value >= 70) return "good";
  if (value >= 50) return "average";
  return "poor";
};

const normalizeArray = (value) => {
  if (!Array.isArray(value)) return [];
  return value.filter(Boolean);
};

/* =========================================================
   ICONS
   ========================================================= */

const Icon = ({ name, size = 20, strokeWidth = 1.8 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "analysis-icon",
  };

  switch (name) {
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "warning":
      return (
        <svg {...common}>
          <path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </svg>
      );

    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3-1.2 5.1a4 4 0 0 1-2.9 2.9L3 12l4.9 1.2a4 4 0 0 1 2.9 2.9L12 21l1.2-4.9a4 4 0 0 1 2.9-2.9L21 12l-4.9-1.2a4 4 0 0 1-2.9-2.9L12 3Z" />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );

    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );

    case "project":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 9h8" />
          <path d="M8 13h5" />
          <path d="M8 17h3" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case "code":
      return (
        <svg {...common}>
          <path d="m8 9-3 3 3 3" />
          <path d="m16 9 3 3-3 3" />
          <path d="m14 5-4 14" />
        </svg>
      );

    case "book":
      return (
        <svg {...common}>
          <path d="M4 5a3 3 0 0 1 3-2h13v17H7a3 3 0 0 0-3 3V5Z" />
          <path d="M4 20a3 3 0 0 1 3-3h13" />
        </svg>
      );

    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="m7 15 3-4 3 2 5-7" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );

    case "zap":
      return (
        <svg {...common}>
          <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
};

/* =========================================================
   SCORE CIRCLE
   ========================================================= */

const ScoreCircle = ({ score, label }) => {
  const value = clamp(score);
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (value / 100) * circumference;
  const scoreClass = getScoreClass(value);

  return (
    <div className={`score-circle ${scoreClass}`}>
      <svg className="score-ring" viewBox="0 0 110 110">
        <circle
          className="score-ring-bg"
          cx="55"
          cy="55"
          r="46"
        />

        <circle
          className="score-ring-progress"
          cx="55"
          cy="55"
          r="46"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="score-circle-content">
        <span className="score-number">{value}</span>
        <span className="score-percent">%</span>
      </div>

      {label && <span className="score-circle-label">{label}</span>}
    </div>
  );
};

/* =========================================================
   SECTION SCORE
   ========================================================= */

const SectionScore = ({ name, score, icon }) => {
  const value = clamp(score);
  const scoreClass = getScoreClass(value);

  return (
    <div className="section-score-card">
      <div className={`section-score-icon ${scoreClass}`}>
        <Icon name={icon} size={18} />
      </div>

      <div className="section-score-main">
        <div className="section-score-top">
          <span className="section-score-name">{name}</span>

          <span className={`section-score-value ${scoreClass}`}>
            {value}
          </span>
        </div>

        <div className="section-score-bar">
          <div
            className={`section-score-fill ${scoreClass}`}
            style={{ width: `${value}%` }}
          />
        </div>

        <span className={`section-score-label ${scoreClass}`}>
          {getScoreLabel(value)}
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   ANALYSIS SECTION
   ========================================================= */

const AnalysisSection = ({
  title,
  description,
  icon,
  children,
  className = "",
}) => {
  return (
    <section className={`analysis-section ${className}`}>
      <div className="analysis-section-header">
        <div className="analysis-section-icon">
          <Icon name={icon} size={19} />
        </div>

        <div>
          <h3>{title}</h3>

          {description && (
            <p className="analysis-section-description">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="analysis-section-content">
        {children}
      </div>
    </section>
  );
};

/* =========================================================
   KEYWORD PILL
   ========================================================= */

const KeywordPill = ({ children, type = "default" }) => {
  return (
    <span className={`keyword-pill ${type}`}>
      {type === "matched" && <Icon name="check" size={13} />}
      {type === "missing" && <Icon name="close" size={13} />}
      {children}
    </span>
  );
};

/* =========================================================
   COMPARISON ITEM
   ========================================================= */

const ComparisonItem = ({ item, type }) => {
  if (typeof item === "string") {
    return (
      <div className={`comparison-item ${type}`}>
        <div className="comparison-item-icon">
          <Icon
            name={
              type === "matched"
                ? "check"
                : type === "partial"
                ? "warning"
                : "close"
            }
            size={15}
          />
        </div>

        <div className="comparison-item-body">
          <span className="comparison-item-name">{item}</span>
        </div>
      </div>
    );
  }

  const name = item?.name || item?.skill || item?.title || "Skill";
  const evidence = item?.evidence || item?.description || "";

  return (
    <div className={`comparison-item ${type}`}>
      <div className="comparison-item-icon">
        <Icon
          name={
            type === "matched"
              ? "check"
              : type === "partial"
              ? "warning"
              : "close"
          }
          size={15}
        />
      </div>

      <div className="comparison-item-body">
        <span className="comparison-item-name">{name}</span>

        {evidence && (
          <span className="comparison-item-evidence">
            {evidence}
          </span>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   JOB COMPARISON
   ========================================================= */

const JobComparison = ({ comparison }) => {
  if (!comparison) return null;

  const matchPercentage = clamp(
    comparison.matchPercentage ??
      comparison.matchScore ??
      comparison.score ??
      0
  );

  const matchedSkills = normalizeArray(
    comparison.matchedSkills
  );

  const partialMatches = normalizeArray(
    comparison.partialMatches
  );

  const missingSkills = normalizeArray(
    comparison.missingSkills
  );

  const resumeHighlights = normalizeArray(
    comparison.resumeHighlights
  );

  const targetRequirements = normalizeArray(
    comparison.targetRequirements
  );

  const relevantExperience = normalizeArray(
    comparison.relevantExperience
  );

  const relevantProjects = normalizeArray(
    comparison.relevantProjects
  );

  const criticalGaps = normalizeArray(
    comparison.criticalGaps
  );

  const recommendations = normalizeArray(
    comparison.recommendations
  );

  return (
    <section className="job-comparison-section">
      <div className="section-heading-row">
        <div>
          <div className="eyebrow">
            <Icon name="target" size={14} />
            ROLE MATCH
          </div>

          <h2>How your resume matches the job</h2>

          <p>
            Compare your current resume against the target
            requirements and identify the biggest gaps.
          </p>
        </div>

        <div className="comparison-match-score">
          <span className="comparison-match-number">
            {matchPercentage}%
          </span>
          <span>match</span>
        </div>
      </div>

      <div className="comparison-overview-grid">
        <div className="comparison-overview-card">
          <div className="comparison-card-heading">
            <span className="comparison-card-icon positive">
              <Icon name="check" size={17} />
            </span>

            <div>
              <h3>Your highlights</h3>
              <span>Relevant resume evidence</span>
            </div>
          </div>

          <div className="comparison-list">
            {resumeHighlights.length > 0 ? (
              resumeHighlights.map((item, index) => (
                <div
                  className="highlight-item"
                  key={`highlight-${index}`}
                >
                  <Icon name="check" size={15} />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="empty-analysis">
                No major highlights identified.
              </p>
            )}
          </div>
        </div>

        <div className="comparison-overview-card">
          <div className="comparison-card-heading">
            <span className="comparison-card-icon target">
              <Icon name="target" size={17} />
            </span>

            <div>
              <h3>Target requirements</h3>
              <span>What the role expects</span>
            </div>
          </div>

          <div className="comparison-list">
            {targetRequirements.length > 0 ? (
              targetRequirements.map((item, index) => (
                <div
                  className="requirement-item"
                  key={`requirement-${index}`}
                >
                  <span className="requirement-dot" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="empty-analysis">
                No requirements identified.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="skill-analysis">
        <div className="skill-column">
          <div className="skill-column-header matched">
            <div>
              <span className="skill-column-title">
                Strong matches
              </span>
              <span className="skill-column-count">
                {matchedSkills.length} found
              </span>
            </div>

            <Icon name="check" size={18} />
          </div>

          <div className="comparison-items">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((item, index) => (
                <ComparisonItem
                  key={`matched-${index}`}
                  item={item}
                  type="matched"
                />
              ))
            ) : (
              <p className="empty-analysis">
                No strong matches found.
              </p>
            )}
          </div>
        </div>

        <div className="skill-column">
          <div className="skill-column-header partial">
            <div>
              <span className="skill-column-title">
                Partial matches
              </span>
              <span className="skill-column-count">
                {partialMatches.length} found
              </span>
            </div>

            <Icon name="warning" size={18} />
          </div>

          <div className="comparison-items">
            {partialMatches.length > 0 ? (
              partialMatches.map((item, index) => (
                <ComparisonItem
                  key={`partial-${index}`}
                  item={item}
                  type="partial"
                />
              ))
            ) : (
              <p className="empty-analysis">
                No partial matches found.
              </p>
            )}
          </div>
        </div>

        <div className="skill-column">
          <div className="skill-column-header missing">
            <div>
              <span className="skill-column-title">
                Missing skills
              </span>
              <span className="skill-column-count">
                {missingSkills.length} found
              </span>
            </div>

            <Icon name="close" size={18} />
          </div>

          <div className="comparison-items">
            {missingSkills.length > 0 ? (
              missingSkills.map((item, index) => (
                <ComparisonItem
                  key={`missing-${index}`}
                  item={item}
                  type="missing"
                />
              ))
            ) : (
              <p className="empty-analysis">
                No missing skills identified.
              </p>
            )}
          </div>
        </div>
      </div>

      {(relevantExperience.length > 0 ||
        relevantProjects.length > 0) && (
        <div className="relevance-grid">
          {relevantExperience.length > 0 && (
            <div className="relevance-card">
              <div className="relevance-card-header">
                <Icon name="briefcase" size={18} />
                <h3>Relevant experience</h3>
              </div>

              <ul>
                {relevantExperience.map((item, index) => (
                  <li key={`experience-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {relevantProjects.length > 0 && (
            <div className="relevance-card">
              <div className="relevance-card-header">
                <Icon name="project" size={18} />
                <h3>Relevant projects</h3>
              </div>

              <ul>
                {relevantProjects.map((item, index) => (
                  <li key={`project-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {criticalGaps.length > 0 && (
        <div className="critical-gaps-card">
          <div className="critical-gaps-header">
            <div className="critical-gaps-icon">
              <Icon name="warning" size={18} />
            </div>

            <div>
              <h3>Critical gaps</h3>
              <p>
                These are the areas most likely holding back
                your application.
              </p>
            </div>
          </div>

          <div className="critical-gaps-list">
            {criticalGaps.map((item, index) => (
              <div
                className="critical-gap"
                key={`gap-${index}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="comparison-recommendations">
          <div className="comparison-recommendations-header">
            <Icon name="zap" size={18} />
            <h3>What to do next</h3>
          </div>

          <div className="recommendation-list">
            {recommendations.map((item, index) => (
              <div
                className="recommendation-item"
                key={`recommendation-${index}`}
              >
                <span className="recommendation-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{item}</span>

                <Icon name="arrow" size={16} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   IMPROVEMENT PLAN
   ========================================================= */

const ImprovementPlan = ({ items }) => {
  const plan = normalizeArray(items);

  if (plan.length === 0) return null;

  return (
    <section className="improvement-section">
      <div className="section-heading-row">
        <div>
          <div className="eyebrow">
            <Icon name="zap" size={14} />
            SCORE OPTIMIZATION
          </div>

          <h2>Improve your resume</h2>

          <p>
            Prioritized actions that can make the biggest
            difference to your score.
          </p>
        </div>
      </div>

      <div className="improvement-list">
        {plan.map((item, index) => {
          const title =
            item?.title ||
            item?.name ||
            `Improvement ${index + 1}`;

          const description =
            item?.description ||
            item?.details ||
            "";

          const impact = clamp(
            item?.impact ?? item?.scoreImpact ?? 0,
            0,
            20
          );

          const priority = String(
            item?.priority || "medium"
          ).toLowerCase();

          return (
            <div
              className="improvement-card"
              key={`improvement-${index}`}
            >
              <div className="improvement-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="improvement-content">
                <div className="improvement-top">
                  <h3>{title}</h3>

                  <span
                    className={`priority-badge ${priority}`}
                  >
                    {priority}
                  </span>
                </div>

                {description && (
                  <p>{description}</p>
                )}

                <div className="impact-row">
                  <span>Potential score impact</span>

                  <div className="impact-meter">
                    <div
                      className="impact-meter-fill"
                      style={{
                        width: `${(impact / 20) * 100}%`,
                      }}
                    />
                  </div>

                  <strong>+{impact}</strong>
                </div>
              </div>

              <div className="improvement-arrow">
                <Icon name="arrow" size={17} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const AnalysisCard = ({ analysis, result }) => {
  const data = analysis || result || {};

  const overallScore = clamp(
    data.overallScore ??
      data.resumeScore ??
      data.score ??
      0
  );

  const atsMatchScore = clamp(
    data.atsMatchScore ??
      data.atsScore ??
      0
  );

  const sectionScores = data.sectionScores || {};

  const improvementPlan =
    data.improvementPlan ||
    data.improvements ||
    [];

  const strengths = normalizeArray(data.strengths);

  const weaknesses = normalizeArray(data.weaknesses);

  const matchedKeywords = normalizeArray(
    data.matchedKeywords
  );

  const missingKeywords = normalizeArray(
    data.missingKeywords
  );

  const atsSuggestions = normalizeArray(
    data.atsSuggestions
  );

  const suggestions = normalizeArray(
    data.suggestions
  );

  const summary =
    data.summary ||
    data.assessment ||
    data.aiAssessment ||
    "Your resume has been analyzed successfully.";

  const jobComparison =
    data.jobComparison ||
    data.jobMatch ||
    null;

  const combinedSuggestions = [
    ...atsSuggestions,
    ...suggestions.filter(
      (item) => !atsSuggestions.includes(item)
    ),
  ];

  return (
    <div className="analysis-card-wrapper">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="analysis-hero animate-fade-up">
        <div className="analysis-hero-copy">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            AI RESUME ANALYSIS
          </div>

          <h1>
            Your resume,
            <br />
            <span className="gradient-text">
              decoded.
            </span>
          </h1>

          <p className="analysis-hero-description">
            Here&apos;s how your resume performs across ATS
            compatibility, content quality, and job relevance.
          </p>

          <div className="analysis-status">
            <span className="status-dot" />

            <span>
              Analysis complete
            </span>

            <span className="status-divider" />

            <span>
              Powered by AI
            </span>
          </div>
        </div>

        <div className="hero-score-area">
          <div className="hero-score-card score-glow">
            <div className="hero-score-label">
              RESUME SCORE
            </div>

            <ScoreCircle
              score={overallScore}
              label={getScoreLabel(overallScore)}
            />

            <div
              className={`hero-score-status ${getScoreClass(
                overallScore
              )}`}
            >
              {getScoreLabel(overallScore)}
            </div>
          </div>

          <div className="hero-ats-card">
            <div className="hero-ats-icon">
              <Icon name="shield" size={18} />
            </div>

            <div>
              <span>ATS compatibility</span>

              <strong>
                {atsMatchScore}/100
              </strong>
            </div>

            <div
              className={`ats-mini-score ${getScoreClass(
                atsMatchScore
              )}`}
            >
              {getScoreLabel(atsMatchScore)}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK STATS
      ===================================================== */}

      <section className="quick-stats-grid animate-fade-up">
        <div className="quick-stat-card">
          <div className="quick-stat-icon cyan">
            <Icon name="chart" size={19} />
          </div>

          <div>
            <span>Overall score</span>
            <strong>{overallScore}/100</strong>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon violet">
            <Icon name="shield" size={19} />
          </div>

          <div>
            <span>ATS score</span>
            <strong>{atsMatchScore}/100</strong>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon green">
            <Icon name="check" size={19} />
          </div>

          <div>
            <span>Matched keywords</span>
            <strong>{matchedKeywords.length}</strong>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon red">
            <Icon name="close" size={19} />
          </div>

          <div>
            <span>Missing keywords</span>
            <strong>{missingKeywords.length}</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION SCORES
      ===================================================== */}

      <section className="section-scores-section animate-fade-up">
        <div className="section-heading-row">
          <div>
            <div className="eyebrow">
              <Icon name="chart" size={14} />
              RESUME BREAKDOWN
            </div>

            <h2>Performance by section</h2>

            <p>
              A detailed look at where your resume is strong
              and where it needs work.
            </p>
          </div>
        </div>

        <div className="section-scores-grid">
          <SectionScore
            name="Technical Skills"
            score={sectionScores.technicalSkills}
            icon="code"
          />

          <SectionScore
            name="Projects"
            score={sectionScores.projects}
            icon="project"
          />

          <SectionScore
            name="Experience"
            score={sectionScores.experience}
            icon="briefcase"
          />

          <SectionScore
            name="Education"
            score={sectionScores.education}
            icon="book"
          />

          <SectionScore
            name="Job Relevance"
            score={sectionScores.jobRelevance}
            icon="target"
          />
        </div>
      </section>

      {/* =====================================================
          JOB COMPARISON
      ===================================================== */}

      {jobComparison && (
        <JobComparison comparison={jobComparison} />
      )}

      {/* =====================================================
          AI ASSESSMENT
      ===================================================== */}

      <AnalysisSection
        title="AI assessment"
        description="The main takeaway from your resume analysis."
        icon="spark"
        className="ai-assessment"
      >
        <div className="ai-assessment-content">
          <div className="ai-assessment-mark">
            <Icon name="spark" size={22} />
          </div>

          <div>
            <p>{summary}</p>
          </div>
        </div>
      </AnalysisSection>

      {/* =====================================================
          STRENGTHS + WEAKNESSES
      ===================================================== */}

      <div className="analysis-sections-grid">
        <AnalysisSection
          title="What you're doing well"
          description="Strengths detected in your resume."
          icon="check"
          className="strength-section"
        >
          {strengths.length > 0 ? (
            <div className="bullet-list positive">
              {strengths.map((item, index) => (
                <div
                  className="bullet-item"
                  key={`strength-${index}`}
                >
                  <span className="bullet-icon">
                    <Icon name="check" size={14} />
                  </span>

                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-analysis">
              No major strengths were returned.
            </p>
          )}
        </AnalysisSection>

        <AnalysisSection
          title="Where you can improve"
          description="Weaknesses currently limiting your score."
          icon="warning"
          className="weakness-section"
        >
          {weaknesses.length > 0 ? (
            <div className="bullet-list negative">
              {weaknesses.map((item, index) => (
                <div
                  className="bullet-item"
                  key={`weakness-${index}`}
                >
                  <span className="bullet-icon">
                    <Icon name="warning" size={14} />
                  </span>

                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-analysis">
              No major weaknesses were returned.
            </p>
          )}
        </AnalysisSection>
      </div>

      {/* =====================================================
          KEYWORDS
      ===================================================== */}

      <section className="keyword-section">
        <div className="section-heading-row">
          <div>
            <div className="eyebrow">
              <Icon name="search" size={14} />
              ATS KEYWORDS
            </div>

            <h2>Keyword coverage</h2>

            <p>
              Keywords can heavily influence how ATS systems
              rank your resume.
            </p>
          </div>
        </div>

        <div className="keyword-grid">
          <div className="keyword-card matched">
            <div className="keyword-card-header">
              <div>
                <span className="keyword-card-label">
                  MATCHED
                </span>

                <strong>
                  {matchedKeywords.length}
                </strong>
              </div>

              <div className="keyword-card-icon">
                <Icon name="check" size={18} />
              </div>
            </div>

            <div className="keyword-pills">
              {matchedKeywords.length > 0 ? (
                matchedKeywords.map((keyword, index) => (
                  <KeywordPill
                    key={`matched-keyword-${index}`}
                    type="matched"
                  >
                    {keyword}
                  </KeywordPill>
                ))
              ) : (
                <span className="empty-keywords">
                  No matched keywords found.
                </span>
              )}
            </div>
          </div>

          <div className="keyword-card missing">
            <div className="keyword-card-header">
              <div>
                <span className="keyword-card-label">
                  MISSING
                </span>

                <strong>
                  {missingKeywords.length}
                </strong>
              </div>

              <div className="keyword-card-icon">
                <Icon name="close" size={18} />
              </div>
            </div>

            <div className="keyword-pills">
              {missingKeywords.length > 0 ? (
                missingKeywords.map((keyword, index) => (
                  <KeywordPill
                    key={`missing-keyword-${index}`}
                    type="missing"
                  >
                    {keyword}
                  </KeywordPill>
                ))
              ) : (
                <span className="empty-keywords">
                  No missing keywords found.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPROVEMENT PLAN
      ===================================================== */}

      <ImprovementPlan items={improvementPlan} />

      {/* =====================================================
          ATS SUGGESTIONS
      ===================================================== */}

      {combinedSuggestions.length > 0 && (
        <AnalysisSection
          title="Actionable suggestions"
          description="Practical changes you can make before applying."
          icon="zap"
          className="suggestions-section"
        >
          <div className="suggestions-list">
            {combinedSuggestions.map((item, index) => (
              <div
                className="suggestion-card"
                key={`suggestion-${index}`}
              >
                <div className="suggestion-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="suggestion-content">
                  <p>{item}</p>
                </div>

                <div className="suggestion-arrow">
                  <Icon name="arrow" size={17} />
                </div>
              </div>
            ))}
          </div>
        </AnalysisSection>
      )}

      {/* =====================================================
          FOOTER CTA
      ===================================================== */}

      <section className="analysis-footer-cta">
        <div className="footer-cta-glow" />

        <div className="footer-cta-icon">
          <Icon name="spark" size={22} />
        </div>

        <div className="footer-cta-content">
          <span className="eyebrow">NEXT STEP</span>

          <h2>
            Turn the feedback into a stronger resume.
          </h2>

          <p>
            Focus on the highest-impact improvements first,
            then run the analyzer again to measure your progress.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AnalysisCard;