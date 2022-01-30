import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Custom Middlewares

//generating jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc Register a new User
//@route POST /api/register
//@access Public
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, phone, email, password } = req.body;

    const userExist1 = await User.findOne({ email });
    const userExist2 = await User.findOne({ phone });

    if (userExist1 || userExist2) {
      res
        .status(400)
        .json({ error: "User Already Exists with this Email or Phone" });
    }

    const user = await User.create({
      name,
      phone,
      email,
      password,
    });
    if (user) {
      const token = generateToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(201).json({ user: user });
    } else {
      res.status(400);
      res.json({ error: "Invalid User Data" });
    }
  })
);

//@desc Auth user & get token
//@route POST /api/login
//@access Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone: phone });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

      res.json({
        user: user,
      });

      //   const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
      //   res.header('auth-token',token).send(token)
    } else {
      res.status(401);
      res.json({ error: "Invalid Phone or Password" });
    }
  })
);

//logout
router.get(
  "/logout",
  asyncHandler(async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/Home");
  })
);

//export
export default router;
