# ResuMatch – AI Resume Analyzer

**ResuMatch** is a full-stack web application that helps job seekers analyze their resumes, identify missing skills and keywords, and improve alignment with a target job description.

The application accepts resume text or a PDF upload and generates structured feedback to help users understand their resume's strengths and areas for improvement.

## ✨ Features

- **Resume Analysis:** Analyze resume content and receive structured feedback.
- **PDF Upload:** Upload a resume in PDF format.
- **Job Description Matching:** Compare resume content with a target job description.
- **Resume Scoring:** View an overall resume score and ATS-oriented insights.
- **Keyword Analysis:** Identify matched keywords and potentially missing skills.
- **User Authentication:** Sign up and log in securely.
- **Analysis History:** Save and revisit previous analyses.
- **Responsive Interface:** Use the application through a modern web interface.

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| File Processing | Multer, pdf-parse |
| AI Analysis | Gemini integration, depending on the configured backend |

## 📂 Project Structure

```text
ResuMatch/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── index.js
│   └── package.json
│
└── README.md
```

*Note: The folder listing above describes the intended organization; individual folders may vary in your repository.*

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/tanzil-07/ResuMatch.git
cd ResuMatch
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and configure the environment variables required by your backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
CLIENT_URL=http://localhost:5173
```

If your backend uses an external AI provider, configure its API key according to the provider and code you have implemented. Never commit API keys or database credentials to GitHub.

### 3. Start the Backend

From the `server` directory, run:

```bash
npm start
```

The backend will run on the configured port, typically `5000`.

### 4. Configure the Frontend

Open a second terminal from the project root:

```bash
cd client
npm install
```

Create a `.env` file inside `client`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Make sure this URL matches the port and API configuration used by your backend.

### 5. Start the Frontend

From the `client` directory, run:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal, usually `http://localhost:5173`.

## 🔄 How It Works

1. The user pastes resume text or uploads a PDF.
2. The user optionally enters a job description for comparison.
3. The frontend sends the input to the backend API.
4. The backend extracts and processes the resume text.
5. The analysis logic evaluates the resume and prepares feedback.
6. The frontend displays the score, keyword insights, and improvement suggestions.
7. Authenticated users can save analyses and access their history.

## 🎯 Project Objectives

- Simplify the resume-review process for students and job seekers.
- Help users identify gaps between their resumes and target job requirements.
- Provide actionable feedback for improving resume content.
- Demonstrate full-stack development, database integration, authentication, and document processing.

## 🚀 Future Enhancements

- OCR support for scanned resumes.
- More advanced semantic matching between resumes and job descriptions.
- Resume formatting and readability checks.
- Personalized resume improvement suggestions.
- Comparison against multiple job descriptions.
- Exportable analysis reports.

## 🔐 Security Notes

- Keep `.env` files and API keys private.
- Use strong database credentials and authentication secrets.
- Never commit passwords, tokens, or private connection strings.
- Resume analysis scores and ATS-oriented feedback are estimates, not guarantees of selection or compatibility with every employer's ATS.

## 👨‍💻 Project Information

**Project Name:** ResuMatch – AI Resume Analyzer  
**Project Type:** Full-Stack Web Application  
**Purpose:** Resume analysis and job-description matching

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.