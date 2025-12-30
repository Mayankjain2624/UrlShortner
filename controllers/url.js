const { nanoid } = require('nanoid');
const Url = require('../models/url');

async function handleGenerateShortUrl(req,res){
    const shortUrl = nanoid(8);
    const body = req.body;
    if(!body.Url)
        return res.status(400).json({error:'url required'});
    await Url.create({
        shortId: shortUrl,
        redirectUrl: body.Url,
        visitHistory:[],
        creeatedBy: req.user._id,
    });
    const userId=req.user._id;
    // const data= await Url.find({creeatedBy: userId});
    return res.render("home",{id:shortUrl, listOfUrls:[]});
}
async function handleRedirectToLongUrl(req,res){
    const shortId=req.params.shortUrlCode;
    console.log(shortId);
    const data=await Url.findOneAndUpdate(
    {
         shortId,
    },
    {
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            },
        }
    },
    { new: true }
);
    if(!data)
        return res.status(400).json({error: 'url does not exist'});
    return res.redirect(data.redirectUrl);

}
async function handleGetAllData(req,res){
    const userId=req.user._id;
    const data= await Url.find({creeatedBy: userId});
    return res.render("home",{listOfUrls:data})
}
async function handleGetAnalytics(req,res){
    const shortId=req.params.shortUrlCode;
    const data=await Url.findOne({shortId});
    if(!data)
        return res.status(400).json({error: 'url does not exist'});
    const analytics={
        totalClicks: data.visitHistory.length,
        visitHistory: data.visitHistory,
    };
    return res.status(200).json(analytics);
}
module.exports = {
    handleGenerateShortUrl,
    handleRedirectToLongUrl,
    handleGetAllData,
    handleGetAnalytics,
};