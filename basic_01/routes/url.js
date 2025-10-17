const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics, handleDeleteUrl} = require("../controllers/url")
const router = express.Router();


router.post("/", handleGenerateNewShortURL);
router.delete("/:shortId", handleDeleteUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;