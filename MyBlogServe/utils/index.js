const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
/**
 * 密码加密
 * @param {string} myPassword
 * @returns
 */
exports.hash = myPassword => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(myPassword, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};
// 密码比对
/**
 *
 * @param {string} password
 * @param {*} hash
 * @returns
 */
exports.compare = (password, hash) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, result) => {
			resolve(result);
		});
	});
};
exports.sign = username => {
	const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'));
	const token = jwt.sign({ username }, privateKey, { algorithm: 'RS256' });
	return token;
};
exports.verify = token => {
	const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
	const result = jwt.verify(token, publicKey);
	return result;
};
exports.date = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return year + '-' + month + '-' + day;
};
exports.time = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
};
exports.manageMurmurComments = (murmurInfo, comments) => {
	const hashMurmur = new Map();
	murmurInfo?.forEach(item => {
		hashMurmur.set(item.murmur, item);
	});
	return depComments(hashMurmur, comments);
};
const depComments = (hashMurmur, comments) => {
	comments?.forEach(item => {
		const murValue = hashMurmur.get(item.murmur);
		item.username = murValue.username;
		item.avatarUrl = murValue.avatarUrl;
		if (item.replyInfo) {
			depComments(hashMurmur, item.replyInfo);
		}
	});
	return comments;
};
// 删除图片
exports.deleteImg = function (imgUrl) {
	const imgName = imgUrl.substr(imgUrl.indexOf('images/') + 7);
	const url = path.join(__dirname, '../public/images', imgName);
	//判断给定的路径是否存在
	if (fs.existsSync(url)) {
		//返回文件和子目录的数组
		// files = fs.readdirSync(url);

		// files.forEach(function (file, index) {
		// 	// var curPath = url + "/" + file;
		// 	var curPath = path.join(url, file);
		// 	//fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
		// 	if (fs.statSync(curPath).isDirectory()) {
		// 		// recurse
		// 		deleteFolderRecursive(curPath);

		// 		// 是文件delete file
		// 	} else {
		// 		fs.unlinkSync(curPath);
		// 	}
		// });
		//清除文件
		fs.unlinkSync(url);
	} else {
		console.log('给定的路径不存在，请给出正确的路径');
	}
};
// 生成随机颜色
exports.randomColor = () => {
	const colorList = ['#ffcc00', '#66CDAA', '#acc2e6', '#d7b0d8', '#95abe6', '#ffc47b', '#b6d288', '#f49586', '#bcaf7a', '#c6c5c1'];
	return colorList[Math.floor(Math.random() * 10)];
};
// // 生成随机颜色
// exports.randomHex = () =>
// 	`#${Math.floor(Math.random() * 0xffffff)
// 		.toString(16)
// 		.padEnd(6, '0')}`;
