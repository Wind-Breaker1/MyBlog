const UserModel = require('../model/user');
const { sign, verify, hash, compare  } = require('../utils')
// 添加新用户
const register = async (req, res, next) => {
  var { username, password, email } = req.body;
  // 密码加密
  const bcryptPassword = await hash(password);
  // 检查此邮箱是否已经被注册
  var Email = await UserModel.findUser(email);
  if (!Email) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time = year + '-' + month + '-' + day + '  ' + hours + ':' + minutes;
    var result = await UserModel.save({
      username,
      password: bcryptPassword,
      email,
      date: time
    });

    if (result) {
      res.send({
        msg: '注册成功',
        status: 0
      });
    }
    
  } else {
    res.send({
      msg: '此邮箱已经被注册！',
      status: -1
    });
  }
};
// 登录
const login = async (req, res, next) => {
  var { email, password } = req.body;
  // 查找用户是否存在
  var result = await UserModel.findUser(
    email
  );
  if (result) {
    let { password: hash } = result;
    // 比较密码
    let compareResult = await compare(password, hash);
    if (compareResult) {
      const token = sign(email);
      // console.log(req.session)
      res.send({
        msg: '登陆成功',
        status: 0,
        data: {
          token: token
        }
      });
    }
  } else {
    res.send({
      msg: '用户不存在！',
      status: -1
    });
  }
};
// 登出
const logout = async (req, res, next) => {
  req.session= null;
  res.send({
    msg: '退出成功',
    status: 0
  });
};
// 进入登录态
const getUser = async (req, res, next) => {
  try {
    // 验证token
    let result = verify(token);
    res.send({
      msg: '获取信息成功',
      status: 0,
      data: {
        username: result.username
      }
    })
  } catch (err) {
    res.send({
      msg: '请登录',
      status: -1,
    });
  }
};
// 修改密码
const updatePassword = async (req, res, next) => {
  var { email, password } = req.body;
  // console.log(email, password)
  const bcryptPassword = await hash(password);
  var result = await UserModel.updatePassword({
      email,
      password: bcryptPassword
    });

    if (result) {
      res.send({
        msg: '修改成功',
        status: 0
      });
    }
    else {
      res.send({
        msg: '修改失败',
        status: -1
      });
    }

};
// 获取用户列表
const getUserList = async (req, res, next) => {
  var result = await UserModel.usersList();
  if (result) {
    res.send({
      msg: '查询成功',
      status: 0,
      data: result
    });
  }
}
// 删除用户
const deleteUser = async (req, res, next) => {
  const { email } = req.query;
  // 这里必须要await
  let result = await UserModel.deleteUser(email);
  if (result.deletedCount != 0) {
    res.send({
      message: '用户删除成功！',
      status: 0
    })
  } else {
    res.send({
      message: '用户删除失败！',
      status: -1
    })
  }
}

module.exports = {
  login,
  logout,
  getUser,
  updatePassword,
  getUserList,
  register,
  deleteUser
};