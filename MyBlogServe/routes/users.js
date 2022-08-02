var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
/* GET users listing. */
router.post('/login', usersController.login);
router.get('/logout', usersController.logout);
router.get('/getuserstate', usersController.getUserState);
router.post('/updateuserinfo', usersController.updateUserInfo);
router.get('/getusers', usersController.getUsers);
router.post('/register', usersController.register);
router.delete('/deleteuser', usersController.deleteUser);
module.exports = router;
