const express = require("express");
const router = express.Router();

router.get("/api", async (req, res) => {
  return res.status(200).json({ msg: "rootです" });
});

module.exports = router;
