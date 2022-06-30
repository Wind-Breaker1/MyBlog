var express = require('express');
var router = express.Router();
var classifyController = require('../controllers/classifies');
/* GET users listing. */
router.get('/getclassifyslist', classifyController.getClassifysList);
router.delete('/deleteclassify', classifyController.deleteClassify);
router.post('/addclassify', classifyController.addClassify);
router.post('/compile', classifyController.compile)
module.exports = router;
