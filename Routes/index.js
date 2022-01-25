import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();

dotenv.config();
const router = express.Router();
const port = process.env.PORT;

// Third Party Middlewares
router.use(express.json());
router.use(cors());
// Custom Middlewares

//DB Config

//API Endpoints
router.get("/Home", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "components", "header"));
});

//export
export default router;
