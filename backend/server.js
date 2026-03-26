import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mandiRoutes from "./routes/mandiRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import connectdb from "./config/db.js";

dotenv.config();
connectdb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mandi", mandiRoutes);
app.use("/api/shipments", shipmentRoutes);

app.listen(5000, () => {
 console.log("Server running on port 5000");
});