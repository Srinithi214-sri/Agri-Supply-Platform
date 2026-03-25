import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mandiRoutes from "./routes/mandiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mandi", mandiRoutes);

app.listen(5000, () => {
 console.log("Server running on port 5000");
});