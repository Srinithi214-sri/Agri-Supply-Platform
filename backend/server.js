import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import mandiRoutes from "./routes/mandiRoutes.js";
import authRoutes from "./routes/auth.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/mandi", mandiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/agrofarmers';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
