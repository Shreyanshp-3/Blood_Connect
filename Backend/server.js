import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();


// app.use(cors());

const allowedOrigins = [
    "http://localhost:5173",
    "https://blood-connect-six.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like Postman, mobile apps)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
// app.options("/*", cors());ls


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
