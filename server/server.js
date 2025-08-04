const express = require('express');
const cors = require('cors'); // Make sure cors is required at the top
const dotenv = require('dotenv');
// ... other imports

dotenv.config();

const app = express();

// --- START OF THE FIX ---

// Define the list of trusted origins (URLs)
const allowedOrigins = [
    'http://localhost:5173', // For your local development
    process.env.FRONTEND_URL // For your live deployed frontend
];

// Configure CORS with specific options
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

// Use the configured CORS options
app.use(cors(corsOptions));

// --- END OF THE FIX ---

app.use(express.json());

// ... rest of your routes (app.use('/api/auth', ...), etc.)
