const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get('/', async (req, res) => {
    const urlsData = await URL.find({});
    console.log("URLs Data:", urlsData);
    res.render('home', { urlsData });
});

module.exports = router;
