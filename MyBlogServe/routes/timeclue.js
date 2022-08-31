var express = require('express');
var router = express.Router();
const TimeclueControll = require('../controllers/timeclue');
router.get('/gettimeclue', TimeclueControll.getTimeclue);
router.get('/gettimeclues', TimeclueControll.getTimeclues);
router.delete('/deletetimeclue', TimeclueControll.deleteTimeclue);
router.post('/addtimeclue', TimeclueControll.addTimeclue);
router.post('/updatetimeclue', TimeclueControll.updateTimeclue);
module.exports = router;