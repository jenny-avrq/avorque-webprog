require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const gigRoutes = require("./routes/gigRoutes");

const app = express();

// Database Connection
connectDB();

app.use(express.json());

// Middleware
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Vercel Options
const corsOptions = {
    origin: "*", // Allow all origins
    credentials: true, // Allow all credentials
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "HEAD", "PUT", "PATHC", "POST", "DELETE"],
    preflightContinue: false,
    optionSuccessStatus: 204, // For legacy browser support 
};

app.options("", cors(corsOptions)); // Pre-flight request for all routes
app.use(cors(corsOptions));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE , PATCH, OPTIONS"
    );
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;