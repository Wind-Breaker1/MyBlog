var express = require('express');
var router = express.Router();
var commentController = require('../controllers/comments');
/* GET users listing. */
router.post('/addfirstcomment', commentController.addFirstComment);
router.post('/addsecondcomment', commentController.addSecondComment);
router.delete('/deletefirstcomment', commentController.deleteFirstComment);
router.delete('/deletesecondcomment', commentController.deleteSecondComment);
router.get('/addfirstfavour', commentController.addFirstFavour);
router.get('/addsecondfavour', commentController.addSecondFavour);
router.get('/getcomments', commentController.getComments);
module.exports = router;