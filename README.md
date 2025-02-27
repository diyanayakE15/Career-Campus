# ✨ TECHNOVA -- TEAM HackPack -- GenAI Problem Statement 1 ✨  

# 🚀 CAREER COMPASS
### AI Career Counselor with Next JS, Tailwind, Shadcn UI, Prisma, Clerk, Neon DB, Inngest

*Career Compass is revolutionary web app that empowers individuals at all stages of career development. It uses AI-driven tools, real-time market insights, and interactive features to give career guidance tailored to the individual.*

---
## 🚀 Tech Stack  
### Frontend:
- **Shadcn UI** – Pre-built UI components with Tailwind CSS
- **Next.js** – React framework
- **Tailwind CSS** –  CSS framework for styling

### Backend:
- **Neon Tech** – Serverless PostgreSQL database
- **Prisma** – ORM for interacting with the database
- **Inngest** – Backend workflow engine for async tasks and event-driven functions (used in calling functions with api)
- **Clerk** – User authentication and session management

### APIs:
- **Gemini API** – (Gemini 1.5 Flash) for AI-powered functionalities

## 🚀 Features  

### 🤖 AI-Driven Career Tools  
- **Smart Resume Builder** – Generate professional resumes in seconds.   
- **Cover Letter Generator** – Create personalized cover letters tailored to job descriptions.   
- **Mock Interview Questions** – Practice interviews with quizes.  

### 📊 Real-Time Market Insights  
- **Salary Trends** – Get insights into industry salary benchmarks.  
- **In-Demand Skills** – Identify the most sought-after skills in your field.  
- **Job Market Forecasts** – Stay ahead with AI-driven job trend predictions.  

### 🎮 Interactive & Engaging Features  
- **Peer Networking** – Connect with professionals and job seekers.  
- **AI Mentorship** – Get career advice from an AI-powered mentor.  

### 🎯 Personalized Career Recommendations  
- **AI-Powered Career Path Suggestions** – Find the best career options based on your skills.  

---

## 🛠️ Installation & Setup  
Follow these steps to set up and run this project locally:

### 1️⃣ Clone the [Repository](https://github.com/diyanayakE15/Career-Campus.git) 
```sh
git clone https://github.com/diyanayakE15/Career-Campus.git
cd Career-Campus
```

### 2️⃣ Install Dependencies  
Make sure you have [Node.js](https://nodejs.org/) installed, then run:  
```sh
npm install
```
or, if you're using **Yarn**:  
```sh
yarn install
```

### 3️⃣ Start the Development Server  
```sh
npm run dev
```
or  
```sh
yarn dev
```
Now open **http://localhost:3000/** in your browser.

---

## 📦 Build for Production  
To generate an optimized production build:  
```sh
npm run build
npm run start
```
or  
```sh
yarn build
yarn start
```

---

## 📂 Project Structure  
```
/project-root
 ├── /actions              # Server-side actions
 ├── /app                  # Next.js app directory
 ├── /components           # Reusable UI components
 ├── /data                 # Static and dynamic data files
 ├── /hooks                # Custom React hooks
 ├── /lib                  # Utility functions and helpers
 ├── /prisma               # Database schema and Prisma configuration
 ├── /public               # Static assets (images, fonts, etc.)
 ├── .eslintrc.json        # ESLint configuration
 ├── .gitignore            # Files to be ignored by Git
 ├── LICENSE               # MIT license declaration
 ├── README.md             # This file!
 ├── components.json       # Component metadata/config
 ├── eslint.config.mjs     # ESLint module configuration
 ├── jsconfig.json         # JavaScript configuration for module resolution
 ├── middleware.js         # Middleware functions for Next.js
 ├── next.config.mjs       # Next.js configuration file
 ├── package-lock.json     # Dependency lockfile for npm
 ├── package.json          # Project dependencies and scripts
 ├── postcss.config.mjs    # PostCSS configuration (used with Tailwind CSS)
 └── tailwind.config.mjs   # Tailwind CSS configuration
```

---

## 🌎 Environment Variables  
Make sure to create a `.env` file with following variables -

```sh
DATABASE_URL = 

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 
CLERK_SECRET_KEY = 

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY = 
NEXT_PUBLIC_CHATBOT_API_KEY = 
```
 
*(Rename `.env.example` to `.env.local` and update the values as needed.)*

---

## 🤝 Contributing  
Contributions are welcome! Follow these steps to contribute:  
1. **Fork the repository**  
2. **Create a new branch**
```sh
git checkout -b feature-name
```  
4. **Commit your changes** 
```sh
git commit -m "Add new feature"
```    
6. **Push to your branch**
```sh
git push origin feature-name
```    
8. **Open a Pull Request**  

---

## 📜 License  
This project is licensed under the [MIT License](LICENSE).  

---

## 📞 Contact  
If you have any questions, feel free to reach out:  
📧 Email: bhushanchavan0503@gmail.com | diyan6151@gmail.com | shreyas.skp@gmail.com  
🟦 LinkedIn: [Bhushan Chavan](https://www.linkedin.com/in/bhushanchavan06/) | [Diya Nayak](https://www.linkedin.com/in/diya-nayak6151/) | [Shreyas Kaushik](https://www.linkedin.com/in/shreyas-kaushik/)  
