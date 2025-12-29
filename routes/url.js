const express = require('express');
const router = express.Router();

const { handleGenerateShortUrl, handleRedirectToLongUrl,handleGetAllData, handleGetAnalytics} = require('../controllers/url');
router.get('/',handleGetAllData)
router.post('/',handleGenerateShortUrl);
router.get('/:shortUrlCode',handleRedirectToLongUrl);
router.get('/analytics/:shortUrlCode',handleGetAnalytics);
module.exports = router;