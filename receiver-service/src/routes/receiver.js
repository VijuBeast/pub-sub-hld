const express = require("express");
const router = express.Router();
const { handleReceiver } = require("../controllers/receiverController.js");

router.post("/", handleReceiver);

module.exports = router;
