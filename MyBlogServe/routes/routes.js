var express = require('express');
var router = express.Router();
var routeController = require('../controllers/routes');
/* GET users listing. */
router.post('/savefirstroute', routeController.addFirstRoute);
router.post('/savesecondroute', routeController.addSecondRoute);
router.post('/updatroute', routeController.updatRoute);
router.get('/getroutelist', routeController.getRoutes);
router.get('/deleteroute', routeController.deleteRoute);
module.exports = router;
