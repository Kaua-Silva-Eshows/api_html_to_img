const express = require("express");
const router = express.Router();
const htmlToXlsController = require("../controllers/htmlToXlsController");

router.post("/html-to-xls", htmlToXlsController.htmlToXls);

module.exports = router;
