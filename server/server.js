const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.js');
const jobRoutes = require('./routes/jobs.js');
const aiRoutes = require('./routes/ai.js');
const postRoutes = require('./routes/postRoutes.js');

const app = express();

// --- TEMPORARY DEBUGGING CORS CONFIGURATION ---
console.log(`TRUSTING FRONTEND_URL: ${process.env.FRONTEND_URL}`);

const corsOptions = {
    origin: (origin, callback) => {
        // This is the most important line for debugging.
        // It will print the exact origin of the request to your Render logs.
        console.log(`>>>>> Request received from origin: ${origin}`);
        
        // For debugging, we will temporarily allow ALL origins.
        callback(null, true); 
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// --- DATABASE & ROUTES ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('RizeOS API is running in DEBUG MODE...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
