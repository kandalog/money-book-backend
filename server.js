// package.json server.jsに変更 scriptをnodemonに変更● ● ● ● ●

const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");

// sessionの設定
const session_opt = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { masAge: 60 * 60 * 1000 },
};

const app = express();
app.use(session(session_opt));
app.use(express.json());
app.use(cors());

// API
app.use("/", indexRouter);
app.use("/api/users", userRouter);

app.listen(3000, console.log("サーバーを開始します。"));
