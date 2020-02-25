// const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());

app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use(betweenHome); //모든 함수에 미들웨어로 사용
// app.get("/", betweenHome, handleHome); //이 라우터에서만 사용하는 미들웨어

app.use(localsMiddleware);

// use() 사용한 거 주목 /
// /user에 접속했을 때에 userRouter가 작동되는 거라서  /user 뒤에 붙는 형식이에요!
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
