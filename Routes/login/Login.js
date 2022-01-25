import express from "express";
// import login from "../../Views/pages/loginPage/login.ejs";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("./../Views/pages/loginPage/login.ejs");
  //   res.send("Login");
});

export default router;
