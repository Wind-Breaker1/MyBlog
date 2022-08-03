var express = require('express');
var router = express.Router();
var articleController = require('../controllers/blogs');
/* GET users listing. */
router.get('/getblogs', articleController.getBlogs);
router.delete('/deleteblog', articleController.deleteBlog);
router.post('/updateblog', articleController.updateBlog);
router.post('/addblog', articleController.addBlog);
router.get('/changeblogstate', articleController.changeBlogState);
router.get('/getblog', articleController.getBlog);
router.get('/getpublishblogs', articleController.getPublishBlogs);
router.get('/getblogsofclassify', articleController.getBlogsOfClassify);
router.get('/addfavour', articleController.addFavour);
router.get('/addblogbrowse', articleController.addBlogBrowse);
module.exports = router;
