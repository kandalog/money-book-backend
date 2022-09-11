const express = require("express");
const router = express.Router();

const { Money } = require("../models");

// 家計簿レコードの追加
router.post("/", async (req, res) => {
  if (req.body.userId) {
    try {
      const money = await Money.create({
        userId: req.body.userId,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.category,
        message: req.body.message || "",
        bool: req.body.bool,
      });
      return res.status(200).json(money);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({ msg: "ログインしてください" });
  }
});

// 家計簿レコードの更新
router.get("/", async (req, res) => {
  if (req.body.userId) {
    try {
    } catch {}
  } else {
    return res.status(403).json({ msg: "ログインしてください" });
  }
});

// 家計簿レコードの削除
router.get("/", async (req, res) => {
  if (req.body.userId) {
    try {
    } catch {}
  } else {
    return res.status(403).json({ msg: "ログインしてください" });
  }
});

// 月単位でレコードを取得
router.get("/", async (req, res) => {
  if (req.body.userId) {
    try {
    } catch {}
  } else {
    return res.status(403).json({ msg: "ログインしてください" });
  }
});

// カテゴリーでレコードを取得
router.get("/", async (req, res) => {
  if (req.body.userId) {
    try {
    } catch {}
  } else {
    return res.status(403).json({ msg: "ログインしてください" });
  }
});

// 月単位 && カテゴリーでレコードを取得
router.get("/", async (req, res) => {
  if (req.body.userId) {
    try {
    } catch {}
  } else {
    return res.status(403).json({ msg: "ログインしてください" });
  }
});

module.exports = router;
