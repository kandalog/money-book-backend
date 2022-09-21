const express = require("express");
const router = express.Router();

const { Money } = require("../models");
const { Op, query, INTEGER, json } = require("sequelize");
// const sequelize = require("sequelize");

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
    const money = await Money.build({
      userId: req.body.userId,
      amount: req.body.amount,
      memo: req.body.memo || "",
      date: req.body.date,
      bool: req.body.bool,
    });

    if (money.memo === "") {
      return res.status(403).json({ msg: "内容は必須です" });
    }

    if (money.amount <= 0) {
      return res.status(403).json({ msg: "価格は1円以上である必要があります" });
    }

    await money.save();
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
    money.memo = req.body.memo || money.memo;
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

// 月別でレコードを取得 trueは収入 falseは支出
router.post("/month", async (req, res) => {
  isLogin(req, res);
  try {
    const data = await Money.findAll({
      where: {
        date: { [Op.substring]: req.body.date.slice(0, 7) },
        userId: req.body.userId,
        bool: req.body.bool,
      },
    });
    if (!data) {
      return res.status(200).json({ msg: "該当データが存在しませんでした" });
    } else {
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 月別で収入と支出の合計額を算出する
router.post("/month/saving", async (req, res) => {
  isLogin(req, res);
  try {
    const response = await Money.findAll({
      where: {
        date: { [Op.substring]: req.body.date.slice(0, 7) },
        userId: req.body.userId,
        bool: req.body.bool,
      },
    });
    let saving = 0;
    if (response && response[0]) {
      response.map((data) => {
        saving += data.amount;
      });
    }
    return res.status(200).json(saving);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
