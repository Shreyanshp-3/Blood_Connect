import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();


// app.use(cors());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://blood-connect-six.vercel.app/"
    ],
    credentials: true,
}));

app.use(express.json());

// connect to database
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("BloodConnect API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
