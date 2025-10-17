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

    // return res.status(201).json({
    //     shortId: id,
    //     redirectUrl: body.url
    // });

    const urlsData = await URL.find({});

    return res.render('home', {
        shortId: id,
        redirectUrl: body.url,
        urlsData
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

async function handleDeleteUrl(req, res){
    const shortId = req.params.shortId;
    try {
        const existingUrl = await URL.findOne({ shortId });
        if( !existingUrl ) {
            return res.status(404).render('404', { error: "URL not found" });
        }

        const result = await URL.deleteOne({ shortId });

        if( result.deletedCount === 0 ) {
            return res.status(500).render('500', { error: "Failed to delete URL" });
        }
        
        return res.redirect('/')
    } catch (error) {
        console.error("Error deleting URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics, handleDeleteUrl }