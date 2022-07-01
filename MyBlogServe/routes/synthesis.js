var express = require('express');
var router = express.Router();
var synthesisControll = require('../controllers/synthesis');
/* GET users listing. */
router.get('/getWebInfo', synthesisControll.getWebInfo);
router.get('/getSliderInfo', synthesisControll.getSliderInfo);
router.get('/searchArticle', synthesisControll.searchArticle);
module.exports = router;
