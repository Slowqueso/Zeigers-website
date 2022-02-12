import express from "express";
import asyncHandler from "express-async-handler";
import Riddler from "../models/riddlerResponse.js";
import dotenv from "dotenv";
import { checkUser, requireAuth } from "../middlewares.js/authMiddleware.js";

dotenv.config();
const router = express.Router();



//@desc Start New Game
//@route POST /api/riddler
//@access Private
router.post(
    "/riddler",checkUser,requireAuth,
    asyncHandler(async (req, res) => {
      
      const {phone,email,name,_id} = res.locals.user
         
  
      const userExist1 = await Riddler.findOne({ email });
      const userExist2 = await Riddler.findOne({ phone });
  
      if (userExist1 || userExist2) {
        res
          .status(400)
          .json({ error: "Please Resume where you paused" });
      }
      else{
        const user = {phone,email,name,_id}
      const riddlerResponse = await Riddler.create({
        user:user
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
router.put("/riddler",checkUser,requireAuth,
asyncHandler(async (req, res) => {

  const {_id} = res.locals.user

  const responseObject = await Riddler.findOne({'user._id':_id})

  if (responseObject) {

    if(responseObject.progress<10){
      responseObject.answers.push({ question1: {
        input:"box",
        points:20
      }})

      responseObject.progress = responseObject.answers.length || responseObject.progress       //updating progress

    
       const updatedAnswer = await responseObject.save()
       res.status(201).json(updatedAnswer)

    }
    else{
      res.json("Game Completed")
    }

  } else {
      res.status(404)
      throw new Error('User Response not Found')
  }

})) 







//export
export default router;
