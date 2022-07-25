let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({//创建表
  username: { type: String, require: true },
  password: { type: String, require: true },
  // limits: [{ 
  //   type: String, 
  //   require: true
  // }],
  email: { type: String, require: true, unique: true }, //index: { unique: true }
  date: { type: String },
  role: {type: String, require: true,default: 'user'}
})
let UserModel = mongoose.model('user', UserSchema);
// 新增用户
let save = (data) => { 
  let user = new UserModel(data);
  return user.save().then(() => {
    return true;
  }).catch(() => {
    return false;
  })
};
// 更新密码
let updatePassword = ({ password, email }) => {
  return UserModel.updateOne({ "email": email }, { $set: { "password": password } }).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
};
// 删除用户
var deleteUser = (email) => {
  return UserModel.deleteOne({ email });
};
// 查找登录信息
var findUser = email => {
  return UserModel.findOne({ email });
};
var findOneUser = username => {
  return UserModel.findOne(username);
};
// 查询所有用户
var usersList = () => {
  return UserModel.find();
};

module.exports = {
  save,
  findOneUser,
  updatePassword,
  usersList,
  deleteUser,
  findUser
}