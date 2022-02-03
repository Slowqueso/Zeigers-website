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
router.get("/",(req,res)=>{
  res.status(200).render(path.join(__dirname,"Views","test.ejs"));
})
router.get("/test", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "components", "header"));
});
router.get("/Home", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "index"));
});
router.get("/Login", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "login"));
});
router.get("/SignUp", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "signup"));
});

router.get("/api/participate", requireAuth, (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "components", "header"));
});

router.get("/Games/Valorant", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "valorant"));
});

router.get("/AboutUs", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "aboutUs"));
});

router.get("/Games", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "gamesGen"));
});

router.get("/Events/CodeX", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "codeX"));
});

router.get("/Events/WebDesign", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "webDev"));
});

router.get("/Games/Checkmate", (req,res)=>{
  res.status(200).render(path.join(__dirname, "Views", "chess"));
})

router.get("/Games/RocketLeague", (req, res)=>{
  res.status(200).render(path.join(__dirname,"Views", "rocketLeague"));
})

router.get("/Events/TechNutz", (req,res)=>{
  res.status(200).render(path.join(__dirname, "Views", "techNutz"));
})

router.get("/Games/BGMI", (req,res)=>{
  res.status(200).render(path.join(__dirname, "Views", "bgmi"));
})
//export
export default router;
