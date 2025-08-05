# RizeOS Portal - A Web3 Job Board

RizeOS Portal is a full-stack, decentralized job board that connects talented professionals with opportunities in the Web3 space. The platform features a React-based frontend, a robust Node.js/Express backend, and leverages the Solana blockchain for secure and transparent job posting payments.

**Live Application:** [https://rizeos-portal.vercel.app/](https://rizeos-portal.vercel.app/)

 
*(Optional: Replace with a URL to a screenshot of your app)*

---

## Features

-   **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
-   **Job Posting:** Employers can post new job listings after a small fee payment.
-   **Solana Integration:** Job posting fees are handled via on-chain transactions using the Phantom wallet, ensuring transparency and security.
-   **Dynamic Job Feed:** Browse, search, and filter job listings by keywords, skills, or location.
-   **Community Feed:** A dedicated section for users to post updates, share insights, and engage with the community.
-   **Responsive Design:** A clean, modern UI that works seamlessly on both desktop and mobile devices.

---

## Technology Stack

### **Frontend**
-   **Framework:** React 18
-   **Routing:** React Router v6
-   **State Management:** React Context API
-   **Styling:** Tailwind CSS
-   **Solana Integration:** Solana Wallet-Adapter
-   **Build Tool:** Vite

### **Backend**
-   **Framework:** Node.js with Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JWT & bcrypt.js
-   **Blockchain Interaction:** Solana/Web3.js

### **Deployment**
-   **Frontend:** Vercel
-   **Backend:** Render
-   **Database:** MongoDB Atlas

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   [Git](https://git-scm.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database.
-   [Phantom Wallet](https://phantom.app/) browser extension for Solana transactions.

### Installation & Setup

1.  **Clone the repository:**
    ```
    git clone https://github.com/bhaskar747/rizeos-portal.git
    cd rizeos-portal
    ```

2.  **Install Backend Dependencies:**
    ```
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```
    cd ../client
    npm install
    ```

4.  **Set Up Environment Variables:**

    Create a `.env` file in the `/server` directory and add the following:
    ```
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_super_secret_jwt_string"
    PORT=5001
    FRONTEND_URL="http://localhost:5173"
    ADMIN_WALLET_ADDRESS="your_solana_public_key_for_receiving_fees"
    ```

    Create a `.env` file in the `/client` directory and add the following:
    ```
    VITE_API_BASE_URL="http://localhost:5001/api"
    ```

5.  **Run the Backend Server:**
    Navigate to the `/server` directory and start the server:
    ```
    npm start
    ```
    The backend will be running on `http://localhost:5001`.

6.  **Run the Frontend Development Server:**
    In a new terminal, navigate to the `/client` directory and start the app:
    ```
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

---

## Usage

1.  Open your browser and navigate to `http://localhost:5173`.
2.  Register for a new account.
3.  Log in with your new credentials.
4.  To post a job, ensure your Phantom wallet is connected and funded with Testnet SOL.
5.  Click "Post a Job," fill out the form, and approve the transaction in your wallet.
6.  Your new job will appear on the main dashboard.

---

## Author

**Bhaskar**
-   [GitHub](https://github.com/bhaskar747)
-   [LinkedIn](http://www.linkedin.com/in/bhaskarreddychinthakunta)
