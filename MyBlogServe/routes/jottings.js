var express = require('express');
var router = express.Router();
var jottingController = require('../controllers/jottings');
/* GET users listing. */
router.get('/getjottings', jottingController.getJottings);
router.delete('/deletejotting', jottingController.deleteJotting);
router.post('/updatecontent', jottingController.updateJotting);
router.post('/addjotting', jottingController.addJotting);
router.get('/changestate', jottingController.changeState);
router.get('/getpublishjottings', jottingController.getPublishJottings);
router.get('/getjotting', jottingController.getJotting);
router.get('/addfavour', jottingController.addFavour);
module.exports = router;
