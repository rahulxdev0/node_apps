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

module.exports = { handleGenerateNewShortURL }