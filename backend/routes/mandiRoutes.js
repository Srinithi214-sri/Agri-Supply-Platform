import express from "express";
import { getMandiPrices } from "../services/marketPriceService.js";

const router = express.Router();

router.get("/", async (req,res)=>{

 const data = await getMandiPrices();

 res.json(data);

});

export default router;