const URL = require('../models/url')
const shortid  = require('shortid') 

async function handleGenerateNewShortURL(req, res) {
    const id = shortid.generate();
    const body = req.body;
    console.log("body", body);

    if(!body?.url) return res.status(400).json({ error: "URL is required" });

    await URL.create({
        shortId: id,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.status(201).json({
        shortId: id,
        redirectUrl: body.url
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: "not found" });
    }

    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        visitHistory: result.visitHistory
    });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics }