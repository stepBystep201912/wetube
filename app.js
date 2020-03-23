// const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
const CokieStore = MongoStore(session);

app.use(helmet());

app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use(betweenHome); //모든 함수에 미들웨어로 사용
// app.get("/", betweenHome, handleHome); //이 라우터에서만 사용하는 미들웨어

//secret은 무작위문자열로 쿠키에 들어있는 session ID를 암호화하기 위한 것.
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }) //CokieStore와 몽고간의 연결, 쿠키보존, 로그인상태유지됨
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

// use() 사용한 거 주목 /
// /user에 접속했을 때에 userRouter가 작동되는 거라서  /user 뒤에 붙는 형식이에요!
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
