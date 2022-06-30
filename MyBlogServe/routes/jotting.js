var express = require('express');
var router = express.Router();
var jottingController = require('../controllers/jottings');
/* GET users listing. */
router.get('/getjottingList', jottingController.getJottingsList);
router.delete('/deletejotting', jottingController.deleteJotting);
router.post('/updatecontent', jottingController.updateContent);
router.post('/addjotting', jottingController.addJotting);
router.get('/changestate', jottingController.changeState);
router.get('/getPublishJottings', jottingController.getPublishJottings);
router.get('/getJotting', jottingController.getJotting)
module.exports = router;
