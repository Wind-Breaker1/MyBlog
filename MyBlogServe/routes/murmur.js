var express = require('express');
var router = express.Router();
var murmurController = require('../controllers/murmur');

/* GET users listing. */
router.post('/addmurmurinfo', murmurController.addMurmurInfo);
router.post('/updatemurmurusername', murmurController.updateMurmurUsername);
router.get('/getmurmurinfos', murmurController.getMurmurInfos);
module.exports = router;