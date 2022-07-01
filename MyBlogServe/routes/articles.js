var express = require('express');
var router = express.Router();
var articleController = require('../controllers/articles');
/* GET users listing. */
router.get('/getarticleList', articleController.getArticleList);
router.delete('/deletearticle', articleController.deleteArticle);
router.post('/updatecontent', articleController.updateContent);
router.post('/addarticle', articleController.addArticle);
router.get('/changestate', articleController.changeState);
router.get('/getBlog', articleController.getBlog);
router.get('/getPublishArticles', articleController.getPublishArticles);
router.get('/getBlogsOfClassify', articleController.getBlogsOfClassify);
router.get('/addFavour', articleController.addFavour);
router.get('/addBlogBrowse', articleController.addBlogBrowse);
module.exports = router;
