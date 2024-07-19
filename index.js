import "dotenv/config.js"
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import dbConnect from './src/utils/dbConnect.util.js';

//http server
const server = express();
const port = process.env.PORT || 8080
const ready = async () => {
    console.log("server ready on port " + port);
    dbConnect(process.env.MONGO_URL)
}
server.listen(port, ready);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(cookieParser(process.env.SECRET_COOKIE));
server.use(morgan("dev"));
server.use(cors({ origin: true, credentials: true }));

//endpoints
server.use("/api", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
