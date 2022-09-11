const express = require("express");
const router = express.Router();

// const { User } = require("./models");

// 全てのユーザーを取得
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(403).json();
  }
});

module.exports = router;
