import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import login from "../Routes/login/Login.js";

dotenv.config();
const router = express.Router();
const port = process.env.PORT;

// Third Party Middlewares
router.use(express.json());
router.use(cors());

// Custom Middlewares

//DB Config

//API Endpoints
router.get("/", (req, res) => {
  res.status(200).render("../Views/pages/index.ejs");
});

router.use("/login", login);

//export
export default router;
