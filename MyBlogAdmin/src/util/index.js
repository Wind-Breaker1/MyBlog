export const setToken = token => {
	sessionStorage.setItem("TOKEN", JSON.stringify(token));
};
export const getToken = () => {
	return JSON.parse(sessionStorage.getItem("TOKEN"));
};
// /清除token
export const clearToken = () => {
	sessionStorage.removeItem("TOKEN");
	sessionStorage.removeItem("userInfo");
};
export const setClassifies = classifies => {
	sessionStorage.setItem("CLASSIFIES", JSON.stringify(classifies));
};
export const setUserInfo = user => {
	sessionStorage.setItem("userInfo", JSON.stringify(user));
};
export const getUserInfo = () => {
	return JSON.parse(sessionStorage.getItem("userInfo"));
};
export const getClassifyList = () => {
	return JSON.parse(sessionStorage.getItem("CLASSIFIES"));
};
// 压缩图片
export const pressImg = img => {
	// 用于压缩图片的canvas
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	// 瓦片canvas
	const tCanvas = document.createElement('canvas');
	const tctx = tCanvas.getContext('2d');
	const initSize = img.src.length;
	let width = img.width;
	let height = img.height;
	// 如果图片大于四百万像素，计算压缩比并将大小压至4万以下
	let ratio;
	if ((ratio = (width * height) / 40000) > 1) {
		ratio = Math.sqrt(ratio);
		width /= ratio;
		height /= ratio;
	} else {
		ratio = 1;
	}
	canvas.width = width;
	canvas.height = height;
	// 铺底色
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// 如果图片像素大于100万则使用瓦片绘制
	let count;
	if ((count = (width * height) / 10000) > 1) {
		count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
		// 计算每块瓦片的宽和高
		const nw = ~~(width / count);
		const nh = ~~(height / count);
		tCanvas.width = nw;
		tCanvas.height = nh;
		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
				tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio * 2, nh * ratio * 2, 0, 0, nw, nh);
				ctx.drawImage(tCanvas, i * nw, j * nh, nw * 2, nh * 2);
			}
		}
	} else {
		ctx.drawImage(img, 0, 0, width * 2, height * 2);
	}
	// 进行最小压缩
	const pressImgData = canvas.toDataURL('image/jpeg', 0.5);
	console.log('压缩前：' + initSize);
	console.log('压缩后：' + pressImgData.length);
	console.log('压缩率：' + ~~((100 * (initSize - pressImgData.length)) / initSize) + '%');
	return pressImgData;
};
// 图片转为二进制
export const toBolb = (basestr, type) => {
	const text = window.atob(basestr.split(',')[1]);
	const buffer = new ArrayBuffer(text.length);
	const ubuffer = new Uint8Array(buffer);
	for (let i = 0; i < text.length; i++) {
		ubuffer[i] = text.charCodeAt(i);
	}
	const Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
	let blob;
	if (Builder) {
		const builder = new Builder();
		builder.append(buffer);
		blob = builder.getBlob(type);
	} else {
		blob = new window.Blob([buffer], { type: type });
	}
	return blob;
};