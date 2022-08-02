var express = require('express');
var router = express.Router();
var classifyController = require('../controllers/classifies');
/* GET users listing. */
router.get('/getclassifies', classifyController.getClassifies);
router.delete('/deleteclassify', classifyController.deleteClassify);
router.post('/addclassify', classifyController.addClassify);
router.post('/updateclassifytitle', classifyController.updateClassifyTitle)
module.exports = router;
