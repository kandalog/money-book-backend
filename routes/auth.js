const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User } = require("../models");

// 新規ユーザーを登録
router.post("/", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hash,
    });
    req.session.login = user;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ログイン
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ msg: "ユーザーが存在しません。" });
    }
    const flag = await bcrypt.compare(req.body.password, user.password);
    if (flag) {
      req.session.login = user;
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ msg: "パスワードが違います" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ログアウト
router.get("/logout", (req, res) => {
  req.session.login = undefined;
  return res.status(200).json("ログアウトしました。");
});

module.exports = router;
