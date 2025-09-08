const express = require("express");
const router = express.Router();
const htmlToImageController = require("../controllers/htmlToImageController");
const htmlToXlsController = require("../controllers/htmlToXlsController");

router.post("/html-to-image", htmlToImageController.htmlToImage);
router.post("/html-to-xls", htmlToXlsController.htmlToXls);

module.exports = router;
