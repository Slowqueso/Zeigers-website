import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import connectDB from "../config/db.js";
import { checkUser, requireAuth } from "../middlewares.js/authMiddleware.js";
const __dirname = path.resolve();

dotenv.config();
const router = express.Router();
const port = process.env.PORT;

// Third Party Middlewares
router.use(express.json());
router.use(cors());

// Custom Middlewares

//DB Config
connectDB();

//API Endpoints
router.get("*", checkUser);

router.get("/test", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "components", "header"));
});
router.get("/Home", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "index"));
});
router.get("/Login", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "login"));
});
router.get("/SignUp", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "signup"));
});

router.get("/api/participate", requireAuth, (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "components", "header"));
});

router.get("/Games/Valorant", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "valorant"));
});

router.get("/AboutUs", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "aboutUs"));
});

router.get("/Events/CodeX", (req, res) => {
  res.status(200).render(path.join(__dirname, "views", "codeX"));
});

//export
export default router;
