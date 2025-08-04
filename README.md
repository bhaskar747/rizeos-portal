# RizeOS Jobs - Web3 & AI Job Networking Portal

RizeOS Jobs is a full-stack MERN application designed as a modern, professional networking platform for the Web3 space. It integrates AI-powered features for skill matching and uses the Solana blockchain for job posting payments.

## Features

- **User Authentication:** Secure user registration and login with JWT.
- **Job Feed & Filtering:** Browse, search, and filter job listings by location and keywords.
- **Community Feed:** Users can post career advice and updates, creating a dynamic community.
- **AI Skill Extraction:** Automatically extracts skills from a user's bio to build their profile.
- **AI Match Scoring:** Calculates and displays a match score for each job based on the user's skills.
- **Solana Integration:** Users pay a small fee in SOL to post a job, with on-chain transaction verification.
- **Professional UI/UX:** A sleek, modern dark theme with a responsive design.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Solana Wallet Adapter
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Deployment:** Frontend on Vercel, Backend on Render

## How to Run Locally

### Prerequisites
- Node.js (v20.18.0 or newer)
- npm
- MongoDB Atlas account

### Setup Instructions

1.  **Clone the repository:**
    ```
    git clone [Your-GitHub-Repo-URL]
    cd rizeos-portal
    ```
2.  **Install backend dependencies:**
    ```
    cd server
    npm install
    ```
3.  **Install frontend dependencies:**
    ```
    cd ../client
    npm install
    ```
4.  **Set up environment variables:**
    - Create a `.env` file in the `/server` directory and add `MONGO_URI`, `JWT_SECRET`, etc.
    - Create a `.env` file in the `/client` directory and add `VITE_API_BASE_URL=http://localhost:5001`.
5.  **Run the application:**
    - In one terminal, start the backend: `cd server && npm start`
    - In another terminal, start the frontend: `cd client && npm run dev`
