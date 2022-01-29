//Dependencies
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/index.js";
import userRoutes from './Routes/userRoutes.js'
import cookieParser from "cookie-parser";

// env config
import dotenv from "dotenv";
dotenv.config();

//Initialising
const __dirname = path.resolve();
const port = process.env.PORT;
const app = express();
app.use(express.json())
app.use(cookieParser());


//Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules", "three")));

//Custom Middleware
app.use(router);
app.use('/api', userRoutes)


//Web Server Connection
app.listen(port, () => console.log(`listening to port: ${port}`));
