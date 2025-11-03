import 'dotenv/config';

import express from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

// Import Routes
import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import orderRoute from "./routes/order.route.js";

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Define environment variables
const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

// --- CRUCIAL DEBUGGING STEP ---
// This will tell us if the .env file is being loaded correctly.
console.log("--- Environment Variables Check ---");
console.log("PORT:", process.env.PORT);

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("MONGO_URI:", DB_URI);
console.log("---------------------------------");


// Database Connection
async function connectToDatabase() {
    if (!DB_URI) {
        console.error("❌ FATAL ERROR: MONGO_URI is not defined. Check your .env file name and location.");
        return;
    }
    try {
        await mongoose.connect(DB_URI);
        console.log("✅ Connected successfully to MongoDB!");
    } catch (error) {
        console.error("❌ Could not connect to MongoDB.", error);
    }
}

connectToDatabase();

// API Routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/order", orderRoute);

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
