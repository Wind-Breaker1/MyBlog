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
exports.formatDate = dateNum => {
	if (!dateNum) {
		return dateNum;
	}
	const date = new Date(dateNum);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	// return (y < 10 ? '0' + y : y) + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
	return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
};
exports.formatTime = timeNum => {
	const date = new Date(timeNum);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	return (
		year +
		'-' +
		(month < 10 ? '0' + month : month) +
		'-' +
		(day < 10 ? '0' + day : day) +
		' ' +
		(hour < 10 ? '0' + hour : hour) +
		':' +
		(minutes < 10 ? '0' + minutes : minutes)
	);
};
exports.manageTags = (articleTags, tags) => {
	const result = [];
	articleTags?.forEach(artTag => {
		tags?.forEach(tag => {
			if (artTag.toString() == tag._id.toString()) {
				result.push(tag);
			}
		});
	});
	return result;
};
exports.manageMurmurComments = (murmurInfo, comments) => {
	const hashMurmur = new Map();
	murmurInfo?.forEach(item => {
		hashMurmur.set(item.murmur, item);
	});
	return depComments(hashMurmur, comments);
};
const depComments = (hashMurmur, comments, fatherId) => {
	comments?.forEach(item => {
		const murValue = hashMurmur.get(item.murmur);
		item.date = this.formatTime(item.date);
		item.username = murValue.username;
		item.avatarUrl = murValue.avatarUrl;
		if (fatherId) {
			item.fatherId=fatherId;
		}
		if (item.replyInfo?.length > 0) {
			item.children = item.replyInfo;
			depComments(hashMurmur, item.replyInfo, item._id);
		}
		delete item.replyInfo;
	});
	return comments;
};
exports.imgBaseUrl = type => {
	switch (type) {
		case 'avatar':
			return 'http://127.0.0.1:3000/avatars/';
		case 'image':
			return 'http://127.0.0.1:3000/images/';
		case 'photo':
			return 'http://127.0.0.1:3000/photos/';
	}
};
/**
 *删除图片
 * @param {*} imgUrl
 */
exports.deleteImg = function (imgUrl) {
	const imgName = imgUrl.substr(imgUrl.indexOf('avatars/') + 7);
	const url = path.join(__dirname, '../public/avatars', imgName);
	console.log(url, 'url');
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
	const colorList = ['#ffcc00', '#66CDAA', '#acc2e6', '#d7b0d8', '#95abe6', '#ffc47b', '#b6d288', '#f49586', '#bcaf7a', '#a6a5a1'];
	return colorList[Math.floor(Math.random() * 10)];
};
// 处理数据面板数据
exports.manangeDataBoard = (tags, blogs, jottings) => {
	const map = new Map();
	const now = Date.now();
	const savenDaysAgo = this.formatDate(now - 7 * 24 * 3600 * 1000);
	const articleOfTag = [], blogsOf7=Array(7).fill(0),jottingsOf7=Array(7).fill(0);
	tags.forEach(item => {
		map.set(item._id.toString(), {name:item.title,value:0});
		articleOfTag.push(map.get(item._id.toString()));
	})
	blogs.forEach(blog => {
		blog.tags.forEach(item => {
			const temp = map.get(item.toString());
			if (temp)
			temp.value++;
		})
		const date = this.formatDate(blog.date);
			if (date >= savenDaysAgo) {
				for (let i = 1; i <= 7; i++ ) {
					if (date >= this.formatDate(now - i * 24 * 3600 * 1000 )) {
						blogsOf7[i]++;
						break;
					} 
				}
			}
	})
	jottings.forEach(jotting => {
		jotting.tags.forEach(item => {
			const temp = map.get(item.toString());
			if (temp)
				temp.value++;
		})
		const date = this.formatDate(jotting.date);
			if (date >= savenDaysAgo) {
				for (let i = 1; i <= 7; i++ ) {
					if (date >= this.formatDate(now - i * 24 * 3600 * 1000 )) {
						jottingsOf7[i]++;
						break;
					} 
				}
			}
	})
	return {articleOfTag,blogsOf7,jottingsOf7};
}
