// const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
// app.use(betweenHome); //모든 함수에 미들웨어로 사용
// app.get("/", betweenHome, handleHome); //이 라우터에서만 사용하는 미들웨어

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
