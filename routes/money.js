const express = require("express");
const router = express.Router();

const { Money } = require("../models");

// ログインしているかチェック
const isLogin = (req, res) => {
  if (!req.body.userId) {
    return res.status(403).json({ msg: "ログインしてください" });
  }
};

// 家計簿レコードの追加
router.post("/", async (req, res) => {
  isLogin(req, res);
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
});

// 家計簿レコードの更新
router.put("/:id", async (req, res) => {
  isLogin(req, res);
  try {
    const money = await Money.findByPk(req.params.id);
    if (!(req.body.userId === money.userId)) {
      return res.status(403).json({ msg: "他人のデータは更新できません" });
    }
    money.amount = req.body.amount || money.amount;
    money.date = req.body.date || money.date;
    money.category = req.body.category || money.category;
    money.message = req.body.message || money.message;
    money.bool = req.body.bool || money.bool;
    await money.save();
    return res.status(200).json(money);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 家計簿レコードの削除
router.delete("/:id", async (req, res) => {
  isLogin(req, res);
  try {
    const money = await Money.findByPk(req.params.id);
    if (!(req.body.userId === money.userId)) {
      return res.status(403).json({ msg: "他人のデータは削除できません" });
    }
    await money.destroy();
    return res.status(200).json("データを削除しました");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 月単位でレコードを取得
router.get("/month", async (req, res) => {
  isLogin(req, res);
  const target = req.body.date; // 200220912
  try {
    // その月のデータを取得する
    const date = await Money.findAll();
  } catch (err) {
    return res.status(500).json(err);
  }
});

// カテゴリーでレコードを取得
router.get("/category", async (req, res) => {
  isLogin(req, res);
  try {
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 月単位 && カテゴリーでレコードを取得
router.get("/", async (req, res) => {
  if (req.body.userId) {
    try {
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({ msg: "ログインしてください" });
  }
});

module.exports = router;
