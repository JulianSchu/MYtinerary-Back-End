const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello world");
  });

router.get("/1", (req, res) => {
    res.send("city number 1");
});

router.get("/test", (req, res) => {
    res.json({success: "yes"});
});


module.exports = router;