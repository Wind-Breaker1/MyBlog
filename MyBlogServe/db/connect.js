const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/MyBlog', (err) => {
  if (err) {
    console.log('数据库链接失败！');
    // console.log(err)
  } else {
    console.log('数据库链接成功！');
  }
});

