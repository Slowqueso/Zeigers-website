//Dependencies
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/index.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import ejs from 'ejs';

// env config
import dotenv from "dotenv";
dotenv.config();

//Initialising
const __dirname = path.resolve();
const port = process.env.PORT || 8001;
const app = express();
app.use(express.json());
console.log(__dirname);
app.use(cookieParser());

//Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "./views");
app.engine('ejs', ejs.renderFile);
app.set("view engine", "ejs");

//Custom Middleware
app.use(router);
app.use("/api", userRoutes);

//Web Server Connection
app.listen(port, () => console.log(`listening to port: ${port}`));
