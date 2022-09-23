const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).json({ msg: "rootです" });
});

router.get("/api", async (req, res) => {
  return res.status(200).json({ msg: "/apiです" });
});

module.exports = router;
