var express = require('express');
var router = express.Router();
var routeController = require('../controllers/routes');
/* GET users listing. */
router.post('/addfirstroute', routeController.addFirstRoute);
router.post('/addsecondroute', routeController.addSecondRoute);
router.post('/updatroute', routeController.updatRoute);
router.get('/getroutes', routeController.getRoutes);
router.get('/getroutelist', routeController.getRouteList);
router.delete('/deleteroute', routeController.deleteRoute);
module.exports = router;
