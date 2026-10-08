import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FeatureIcon = ({ type }) => {
  const icons = {
    intelligence: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3a6 6 0 0 0-3.5 10.87c.32.23.5.6.5 1v.63h6v-.63c0-.4.18-.77.5-1A6 6 0 0 0 12 3Z" />
        <path d="M9 19h6M10 22h4M9 15h6" />
      </svg>
    ),
    ats: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16.5 9" />
      </svg>
    ),
    improvements: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v18M3 12h18" />
        <path d="m7 7 10 10M17 7 7 17" />
      </svg>
    ),
    history: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  };

  return icons[type];
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m5 12 4 4L19 6" />
  </svg>
);

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    navigate(token ? "/dashboard" : "/signup");
  };

  return (
    <div className="home-page">
      {/* Background effects */}
      <div className="home-bg-glow home-bg-glow-one"></div>
      <div className="home-bg-glow home-bg-glow-two"></div>
      <div className="home-grid"></div>

      {/* Navbar */}
      <header className="home-navbar">
        <div className="home-container navbar-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span>Resume<span className="brand-accent">AI</span></span>
          </Link>

          <nav className="desktop-nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#why-us">Why ResumeAI</a>
          </nav>

          <div className="navbar-actions">
            {token ? (
              <>
                <Link to="/history" className="nav-history">
                  History
                </Link>
                <Link to="/dashboard" className="nav-dashboard">
                  Dashboard
                  <ArrowIcon />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-login">
                  Log in
                </Link>
                <Link to="/signup" className="nav-dashboard">
                  Get started
                  <ArrowIcon />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="hero-section">
          <div className="home-container hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="status-dot"></span>
                AI-powered resume intelligence
              </div>

              <h1>
                Your resume.
                <br />
                <span className="gradient-text">Smarter.</span>{" "}
                More job-ready.
              </h1>

              <p className="hero-description">
                Analyze your resume with AI, understand your ATS compatibility,
                compare it against a job description, and get clear actions
                to improve your chances of getting noticed.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={handleGetStarted}>
                  <span>
                    {token ? "Open analyzer" : "Analyze my resume"}
                  </span>
                  <ArrowIcon />
                </button>

                <Link to="/demo" className="secondary-button">
                  See how it works
                </Link>
              </div>

              <div className="hero-note">
                <span className="note-check">
                  <CheckIcon />
                </span>
                Built for modern job applications
              </div>
            </div>

            {/* AI Preview */}
            <div className="hero-visual">
              <div className="visual-orbit orbit-one"></div>
              <div className="visual-orbit orbit-two"></div>

              <div className="analysis-window">
                <div className="window-topbar">
                  <div className="window-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <span className="window-title">
                    Resume analysis
                  </span>

                  <span className="window-live">
                    <span></span>
                    Live
                  </span>
                </div>

                <div className="analysis-window-content">
                  <div className="preview-header">
                    <div>
                      <span className="preview-label">
                        AI RESUME REVIEW
                      </span>
                      <h3>Software Engineer Resume</h3>
                    </div>

                    <div className="preview-file">
                      PDF
                    </div>
                  </div>

                  <div className="preview-score-row">
                    <div className="preview-score">
                      <div className="preview-score-ring">
                        <svg viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            className="score-ring-bg"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            className="score-ring-progress"
                          />
                        </svg>

                        <div className="score-value">
                          <strong>82</strong>
                          <span>/100</span>
                        </div>
                      </div>

                      <div>
                        <span className="score-title">
                          Resume score
                        </span>
                        <span className="score-good">
                          Strong profile
                        </span>
                      </div>
                    </div>

                    <div className="ats-mini-card">
                      <span>ATS MATCH</span>
                      <strong>76%</strong>
                      <div className="mini-progress">
                        <span></span>
                      </div>
                    </div>
                  </div>

                  <div className="preview-divider"></div>

                  <div className="preview-section-title">
                    Section performance
                  </div>

                  <div className="preview-bars">
                    <div className="preview-bar-item">
                      <div>
                        <span>Technical Skills</span>
                        <b>91</b>
                      </div>
                      <div className="bar">
                        <span style={{ width: "91%" }}></span>
                      </div>
                    </div>

                    <div className="preview-bar-item">
                      <div>
                        <span>Projects</span>
                        <b>84</b>
                      </div>
                      <div className="bar">
                        <span style={{ width: "84%" }}></span>
                      </div>
                    </div>

                    <div className="preview-bar-item">
                      <div>
                        <span>Experience</span>
                        <b>78</b>
                      </div>
                      <div className="bar">
                        <span style={{ width: "78%" }}></span>
                      </div>
                    </div>
                  </div>

                  <div className="ai-insight">
                    <div className="insight-icon">
                      <FeatureIcon type="intelligence" />
                    </div>

                    <div>
                      <span>AI INSIGHT</span>
                      <p>
                        Add measurable impact to your project
                        descriptions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="floating-card floating-match">
                <div className="floating-icon purple">
                  <CheckIcon />
                </div>
                <div>
                  <strong>Job Match</strong>
                  <span>+18% improvement</span>
                </div>
              </div>

              <div className="floating-card floating-keyword">
                <span className="floating-small-label">
                  MATCHED KEYWORD
                </span>
                <strong>Java</strong>
                <span className="keyword-check">
                  <CheckIcon />
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="home-container hero-stats">
            <div className="stat-item">
              <strong>AI-powered</strong>
              <span>resume analysis</span>
            </div>

            <div className="stat-separator"></div>

            <div className="stat-item">
              <strong>ATS-focused</strong>
              <span>job matching</span>
            </div>

            <div className="stat-separator"></div>

            <div className="stat-item">
              <strong>Actionable</strong>
              <span>improvement insights</span>
            </div>

            <div className="stat-separator"></div>

            <div className="stat-item">
              <strong>One workspace</strong>
              <span>for your applications</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="features-section">
          <div className="home-container">
            <div className="section-heading">
              <span className="section-eyebrow">POWERFUL ANALYSIS</span>

              <h2>
                Everything you need to make
                <br />
                your resume <span>stand out.</span>
              </h2>

              <p>
                Stop guessing what recruiters and ATS systems want.
                ResumeAI turns your resume into a clear improvement plan.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card feature-card-large">
                <div className="feature-icon">
                  <FeatureIcon type="intelligence" />
                </div>

                <div className="feature-card-content">
                  <span className="feature-number">01</span>
                  <h3>Resume intelligence</h3>
                  <p>
                    Get an AI-powered evaluation of your resume's
                    structure, content, strengths, and weaknesses.
                  </p>
                </div>

                <div className="feature-line"></div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FeatureIcon type="ats" />
                </div>

                <span className="feature-number">02</span>
                <h3>ATS matching</h3>
                <p>
                  See how well your resume matches the keywords and
                  requirements employers are looking for.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FeatureIcon type="improvements" />
                </div>

                <span className="feature-number">03</span>
                <h3>Actionable improvements</h3>
                <p>
                  Get prioritized recommendations instead of generic
                  resume advice.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FeatureIcon type="history" />
                </div>

                <span className="feature-number">04</span>
                <h3>Saved analysis history</h3>
                <p>
                  Keep previous analyses organized so you can track
                  improvements across applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="how-section">
          <div className="home-container">
            <div className="section-heading centered">
              <span className="section-eyebrow">SIMPLE WORKFLOW</span>

              <h2>
                From resume to
                <br />
                <span>better applications.</span>
              </h2>

              <p>
                No complicated setup. Upload, analyze, improve.
              </p>
            </div>

            <div className="steps-wrapper">
              <div className="step-card">
                <div className="step-number">01</div>

                <div className="step-visual upload-visual">
                  <div className="upload-document">
                    <div className="document-top">
                      <span></span>
                      <span></span>
                    </div>

                    <div className="document-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <div className="upload-arrow">
                      ↑
                    </div>
                  </div>
                </div>

                <h3>Upload your resume</h3>
                <p>
                  Add your PDF resume and optionally provide the job
                  description you're targeting.
                </p>
              </div>

              <div className="step-connector">
                <ArrowIcon />
              </div>

              <div className="step-card">
                <div className="step-number">02</div>

                <div className="step-visual ai-visual">
                  <div className="ai-core">
                    <div className="ai-core-inner">
                      AI
                    </div>
                  </div>

                  <span className="ai-orbit-dot dot-one"></span>
                  <span className="ai-orbit-dot dot-two"></span>
                  <span className="ai-orbit-dot dot-three"></span>
                </div>

                <h3>Let AI analyze it</h3>
                <p>
                  ResumeAI evaluates your content, skills, ATS match,
                  relevance, and improvement opportunities.
                </p>
              </div>

              <div className="step-connector">
                <ArrowIcon />
              </div>

              <div className="step-card">
                <div className="step-number">03</div>

                <div className="step-visual result-visual">
                  <div className="result-score">
                    <span>82</span>
                    <small>/100</small>
                  </div>

                  <div className="result-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="result-check">
                    <CheckIcon />
                  </div>
                </div>

                <h3>Improve with confidence</h3>
                <p>
                  Follow clear recommendations and make your resume
                  stronger for your next application.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section id="why-us" className="why-section">
          <div className="home-container why-container">
            <div className="why-content">
              <span className="section-eyebrow">
                BUILT FOR JOB SEEKERS
              </span>

              <h2>
                Your resume shouldn't
                <br />
                be a <span>black box.</span>
              </h2>

              <p>
                Most resume tools give you a score and leave you
                wondering what to do next. ResumeAI focuses on the
                details that actually help you improve.
              </p>

              <div className="why-list">
                <div className="why-item">
                  <div className="why-check">
                    <CheckIcon />
                  </div>

                  <div>
                    <strong>Understand your score</strong>
                    <span>
                      See exactly which resume sections are helping
                      or hurting your application.
                    </span>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-check">
                    <CheckIcon />
                  </div>

                  <div>
                    <strong>Match specific job requirements</strong>
                    <span>
                      Compare your skills directly against the role
                      you're applying for.
                    </span>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-check">
                    <CheckIcon />
                  </div>

                  <div>
                    <strong>Know what to fix first</strong>
                    <span>
                      Get prioritized improvements so you can focus
                      on the changes with the biggest impact.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-visual">
              <div className="why-glow"></div>

              <div className="insight-panel">
                <div className="insight-panel-header">
                  <div>
                    <span>AI RECOMMENDATION</span>
                    <h4>Improve your project section</h4>
                  </div>

                  <div className="priority-badge">
                    HIGH
                  </div>
                </div>

                <p>
                  Your projects demonstrate technical knowledge,
                  but adding measurable results would make them
                  more impactful.
                </p>

                <div className="impact-row">
                  <span>Potential score impact</span>
                  <strong>+15 pts</strong>
                </div>

                <div className="impact-bar">
                  <span></span>
                </div>
              </div>

              <div className="mini-insight mini-one">
                <span>ATS MATCH</span>
                <strong>76%</strong>
              </div>

              <div className="mini-insight mini-two">
                <span>MISSING</span>
                <strong>8 keywords</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="cta-glow"></div>

          <div className="home-container cta-container">
            <span className="section-eyebrow">
              READY WHEN YOU ARE
            </span>

            <h2>
              Give your resume
              <br />
              the <span>advantage.</span>
            </h2>

            <p>
              Analyze your resume and discover exactly where you can
              improve before your next application.
            </p>

            <button className="primary-button cta-button" onClick={handleGetStarted}>
              <span>
                {token ? "Open analyzer" : "Get started for free"}
              </span>
              <ArrowIcon />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-container footer-inner">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span>Resume<span className="brand-accent">AI</span></span>
          </Link>

          <p>
            AI-powered resume analysis for smarter job applications.
          </p>

          <span className="footer-copy">
            © {new Date().getFullYear()} ResumeAI
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;