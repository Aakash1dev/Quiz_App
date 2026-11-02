# Quizo — AI-Powered Quiz & Learning Platform 

A full-stack, intelligent learning platform engineered to transform passive study materials into interactive, AI-driven assessments, structured knowledge repositories, and actionable performance insights.

---

##  Project Motive

Traditional learning often relies on passive reading and highlighting, which research shows results in rapid knowledge decay and low retention. **Quizo** was built around the principle of **Active Recall and Spaced Assessment**.

The core motive of Quizo is to:
- **Democratize High-Quality Self-Testing**: Allow any student or educator to instantly turn raw study notes, lecture summaries, or documents into comprehensive practice quizzes.
- **Provide Actionable Feedback**: Move beyond simple score numbers by providing instant question-level explanations and concept-level mastery tracking.
- **Empower Both Learners and Educators**: Provide a tailored experience where students focus on skill mastery while administrators maintain platform health and user management.

---

##  The Problem It Solves

| Challenge in Traditional Study | How Quizo Solves It |
| :--- | :--- |
| **Passive Consumption Trap**<br>Students read through dozens of pages without actively testing their comprehension. | **Instant Active Recall**<br>Automatically generates multi-format quizzes with countdown timers, flagging, and immediate answer explanations. |
| **Manual Quiz Creation Overhead**<br>Formulating questions, distractors, and rationales by hand takes hours of effort. | **AI-Powered Quiz Generation**<br>Leverages Google Gemini AI to analyze uploaded study materials and construct tailored assessments in seconds. |
| **Fragmented Study Workflows**<br>Notes, PDFs, flashcards, and test histories are scattered across disparate apps. | **Centralized Study Studio**<br>An all-in-one hub where learners upload documents, take quizzes, review attempts, and inspect progress. |
| **Blind Spots in Preparation**<br>Learners don't know their weak topics until test day. | **In-Depth Performance Analytics**<br>Interactive charts track historical scores, category proficiency, and weekly study time. |

---

##  Role-Based Architecture

Quizo implements a strict two-role system with dedicated environments:

-  **Learner (`user`)**:
  - Upload and organize personal learning materials (PDFs, notes, docs).
  - Generate custom quizzes with configurable difficulty and question counts.
  - Interactive quiz engine featuring timed attempts, progress navigation, and result reviews.
  - Analytics dashboard with accuracy trends, subject distribution, and study hours.
  - Profile and study preferences tailored with the **Emerald Green Theme (`#10bc00` / `#0b7c00`)**.

-  **Administrator (`admin`)**:
  - Full visibility into platform user accounts, subscription tiers, and account status.
  - System-wide knowledgebase management (FAQs, support categories).
  - Broadcast notification center for news alerts and updates.
  - Admin dashboard and profile styled with the **Amber Orange Theme (`#f97316` / `#ea580c`)**.

---

##  Technology Stack

### Frontend
- **Framework & Tooling**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/) (Data Router with role-based route guards)
- **Styling & UI**: [Tailwind CSS v3](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Radix UI Primitives](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **State & Queries**: [TanStack React Query v5](https://tanstack.com/query)

### Backend & Database
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Web Framework**: [Express.js v5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ORM](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens), `bcryptjs` password hashing, role verification middleware
- **AI Integration**: [Google Generative AI SDK](https://ai.google.dev/) (Gemini Flash)