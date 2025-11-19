import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'; // set to https://lms-project-client-eta.vercel.app in Render env
app.use(cookieParser());
app.use(cors({
  // origin: ["http://localhost:5173", "https://lms-project-client-eta.vercel.app/"],
  // credentials: true
  origin: process.env.CLIENT_URL, credentials: true
}));

app.get("/", (req, res) => {
  res.send("LMS API is running...");
});

const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
