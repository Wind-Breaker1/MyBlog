var express = require('express');
var router = express.Router();
var routeController = require('../controllers/route');
/* GET users listing. */
router.post('/savefirstroute', routeController.saveFirstRoute);
router.post('/savesecondroute', routeController.saveSecondRoute);
router.post('/updatroute', routeController.updatRoute);
router.get('/getroutelist', routeController.getRouteList);
router.get('/deleteroute', routeController.deleteRoute);
module.exports = router;
