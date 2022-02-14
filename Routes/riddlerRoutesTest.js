import express from "express";
import asyncHandler from "express-async-handler";
import Riddler from "../models/riddlerResponse.js";
import dotenv from "dotenv";
import { checkUser, requireAuth } from "../middlewares.js/authMiddleware.js";
import QuestionObject from "../questions/Questions.js";

dotenv.config();
const router = express.Router();

//@desc Start New Game
//@route POST /api/riddler
//@access Private
router.post(
  "/riddler",
  checkUser,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { phone, email, name, _id } = res.locals.user;

    const userExist1 = await Riddler.findOne({ email });
    const userExist2 = await Riddler.findOne({ phone });

    if (userExist1 || userExist2) {
      res.status(400).json({ error: "Please Resume where you paused" });
    } else {
      const user = { phone, email, name, _id };
      const riddlerResponse = await Riddler.create({
        user: user,
        progress: 1,
      });
      if (riddlerResponse) {
        res.status(201).json(riddlerResponse);
      } else {
        res.status(400);
        res.json({ error: "Invalid User Data" });
      }
    }
  })
);

//@desc Submit Input
//@route PUT /api/riddler/
//@access Private
router.put(
  "/responseSubmit",
  checkUser,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { _id } = res.locals.user;
    const { answer } = req.body;
    const { question_number } = req.body;

    const responseObject = await Riddler.findOne({ "user._id": _id });
    if (responseObject) {
      if (responseObject.progress < 10) {
        const answerValidation = QuestionObject[question_number - 1].answer;
        let points = 0;
        if (answer.toLowerCase() === answerValidation) {
          const question = responseObject.questions[question_number - 1];
          const hints = question.hint;
          // If hint status if true then -2
          for (let i = 1; i < hints.length; i++) {
            if (hints[i].status) {
              points = points - 2;
            } else {
              points = points + 0;
            }
          }
          responseObject.answers.push({
            question: {
              question_number,
              input: answer,
              points: 10 + points,
            },
          });
        } else {
          responseObject.answers.push({
            question: {
              question_number,
              input: answer,
              points: 0,
            },
          });
        }
        let thisPoints = 10 + points;
        responseObject.totalPoints = responseObject.totalPoints + thisPoints;
        responseObject.progress =
          responseObject.answers.length || responseObject.progress; //updating progress
        const updatedAnswer = await responseObject.save();
        res.status(201).json(updatedAnswer);
      } else {
        res.json("Game Completed");
      }
    } else {
      res.status(404);
      throw new Error("User Response not Found");
    }
  })
);

router.put(
  "/saveProgress",
  checkUser,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { question_number, hint } = req.body;
    const { _id } = res.locals.user;
    const toUpdate = {
      question_number,
      hint,
    };
    Riddler.findOne({
      "user._id": _id,
      "questions.question_number": question_number,
    })
      .then((responseObject) => {
        if (responseObject) {
          if (responseObject.progress < 10) {
            const index = responseObject.questions
              .map((question) => {
                return question.question_number;
              })
              .indexOf(question_number);
            responseObject.questions[index].hint = hint;
            responseObject.save();
          } else {
            res.json("Game Completed");
          }
        } else {
          Riddler.findOneAndUpdate(
            { "user._id": _id },
            { $push: { questions: toUpdate } },
            { upsert: true }
          )
            .then((questionResponse) => {
              res.status(200).json(questionResponse);
            })
            .catch((err) => {
              res.status(404).json({ msg: "Some Error Occured" });
              console.log(err);
            });
        }
      })
      .catch((err) => {
        res.status(404);
        throw new Error("User Response not Found");
      });
    // console.log(question);
  })
);

//export
export default router;
