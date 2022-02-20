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

    const user = { phone, email, name, _id };
    try {
      const riddlerResponse = await Riddler.create({
        user: user,
        progress: 1,
      });
      res.status(201).json(riddlerResponse);
    } catch (err) {
      res.status(400);
      console.log(err);
    }
  })
);
//@desc Get Riddler Responses
//@route GET /api/riddler
//@access Public
router.get(
  "/riddler",
  asyncHandler(async (req, res) => {
    try {
      const riddlerResponse = await Riddler.find(
        {},
        "user.name user.email totalPoints"
      );
      if (riddlerResponse) {
        const topUsers = riddlerResponse.sort(function (a, b) {
          return b.totalPoints - a.totalPoints;
        });
        res.status(201).json(topUsers);
      }
    } catch (err) {
      res.status(400);
      console.log(err);
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
      if (responseObject.progress <= QuestionObject.length) {
        const answerValidation = QuestionObject[question_number - 1].answer;
        let points = 0;
        if (answer.toLowerCase().replace(/ /g, "") === answerValidation) {
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
          responseObject.progress = responseObject.progress + 1; //updating progress
          responseObject.totalPoints =
            responseObject.totalPoints + (10 + points);
          res.status(201).json({ status: false, msg: null });
        } else {
          // responseObject.answers.push({
          //   question: {
          //     question_number,
          //     input: answer,
          //     points: 0,
          //   },
          // });
          responseObject.totalPoints = responseObject.totalPoints;
          res
            .status(500)
            .json({ status: true, msg: "Wrong Answer! Try Again." });
        }
        const updatedAnswer = await responseObject.save();
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
  "/decrementProgress",
  checkUser,
  asyncHandler(async (req, res) => {
    const { _id } = res.locals.user;
    const responseObject = await Riddler.findOne({ "user._id": _id });
    if (responseObject) {
      const scoreInPreviousQuestion =
        responseObject.answers[responseObject.answers.length - 1].question
          .points;
      let totalPoints = responseObject.totalPoints - scoreInPreviousQuestion;
      responseObject.progress = responseObject.progress - 1;
      responseObject.questions.pop();
      responseObject.answers.pop();
      responseObject.totalPoints = totalPoints;
      console.log(responseObject.questions);
      console.log(responseObject.answers);
      const updatedObject = await responseObject.save();
      res.status(200).json(updatedObject);
    } else {
      res.status(400).send("Not Found ");
    }
  })
);

router.post("/getScore", async (req, res) => {
  const { phone_number } = req.body;
  try {
    const resp = await Riddler.findOne({ "user.phone": phone_number });
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
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
          if (responseObject.progress <= QuestionObject.length) {
            const index = responseObject.questions
              .map((question) => {
                return question.question_number;
              })
              .indexOf(question_number);
            if (responseObject.questions[index].hint[1]) {
              responseObject.questions[index].hint[hint.number - 1] = hint;
            } else {
              responseObject.questions[index].hint =
                [
                  { number: 1, status: true },
                  { status: false },
                  { status: false },
                  { status: false },
                ] || responseObject.questions[index].hint;
              responseObject.questions[index].hint[hint.number - 1] = hint;
            }
            // responseObject.questions[index].hint.push(hint);
            responseObject.save();
            res.json("Saved");
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
