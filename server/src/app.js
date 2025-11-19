import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

app.use(cors({
  origin: ["http://localhost:5173", "https://lms-project-rho-nine.vercel.app/"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("LMS API is running...");
});

const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
