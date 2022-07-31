var express = require('express');
var router = express.Router();
var usersController = require( '../controllers/user');
/* GET users listing. */
router.post('/login', usersController.login);
router.get('/logout', usersController.logout);
router.get('/getUser', usersController.getUser);
router.post('/updateuserinfo', usersController.updateUserInfo);
router.get('/getUserList', usersController.getUserList);
router.post('/register', usersController.register);
router.delete('/deleteUser', usersController.deleteUser);
module.exports = router;
