import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import path from "path";
import connectDB from "../config/db.js";
import asyncHandler from "express-async-handler";
import Riddler from "../models/riddlerResponse.js";
import Questions from "../questions/Questions.js";
import {
  checkUser,
  preLoginCheck,
  requireAuth,
} from "../middlewares.js/authMiddleware.js";
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
router.get("/", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "index"));
});
router.get("/test", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "components", "header"));
});
router.get("/Home", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "index"));
});
router.get("/Login", preLoginCheck, (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "login"));
});
router.get("/SignUp", preLoginCheck, (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "signup"));
});

router.get(
  "/Riddler",
  requireAuth,
  checkUser,
  asyncHandler(async (req, res) => {
    const { _id } = res.locals.user;
    const responseObject = await Riddler.findOne({ "user._id": _id });
    if (responseObject) {
      const { progress } = responseObject;
      const { questions } = responseObject;
      let hints = null;
      if (questions[progress - 1]) {
        hints = questions[progress - 1].hint;
        res.status(200).render(path.join(__dirname, "Views", "riddler"), {
          progress,
          questions: Questions,
          hints: [
            {
              number: 1,
              status: true,
            },
            {
              number: 2,
              status: hints[1] ? hints[1].status : false,
            },
            {
              number: 3,
              status: hints[2] ? hints[2].status : false,
            },
            {
              number: 4,
              status: hints[3] ? hints[3].status : false,
            },
          ],
        });
      } else {
        hints = [
          {
            number: 1,
            status: true,
          },
          {
            number: 2,
            status: false,
          },
          {
            number: 3,
            status: false,
          },
          {
            number: 4,
            status: false,
          },
        ];
        res.status(200).render(path.join(__dirname, "Views", "riddler"), {
          progress,
          questions: Questions,
          hints,
        });
      }
    } else {
      res.status(200).render(path.join(__dirname, "Views", "riddler"), {
        progress: 0,
        questions: Questions,
      });
    }
  })
);
router.get("/devRiddler", (req, res) => {
  res.render(path.join(__dirname, "Views", "suspense"));
});
// Riddler-1-hint-4
// Riddler-1-hint-3
// Riddler-1-hint-2
// Riddler-1-hint-1

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

router.get("/Games/Checkmate", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "chess"));
});

router.get("/Games/RocketLeague", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "rocketLeague"));
});

router.get("/Events/TechNutz", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "techNutz"));
});

router.get("/Games/BGMI", (req, res) => {
  res.status(200).render(path.join(__dirname, "Views", "bgmi"));
});
//export
export default router;
