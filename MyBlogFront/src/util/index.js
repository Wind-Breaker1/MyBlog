import Fingerprint2 from 'fingerprintjs2';
// export const createFingerprint = () => {
//   // 选择哪些信息做为浏览器指纹生成的依据
//   const options = {
//     fonts: {
//       extendedJsFonts: true,
//     },
//     excludes: {
//       audio: true,
//       userAgent: true,
//       enumerateDevices: true,
//       touchSupport: true,
//     },
//   };
//   // 浏览器指纹
//   const fingerprint = Fingerprint2.get(options, (components) => { // 参数只有回调函数或者options为{}时，默认浏览器指纹依据全部配置信息进行生成
//     const values = components.map(component => component.value); // 配置的值的数组
//     const murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
//     // console.log(components);
//     // console.log(values);
//     console.log(murmur);
//     localStorage.setItem('browserId', murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
//   });
// }
// 获取浏览器指纹
export const createFingerprint = () => {
	Fingerprint2.get(components => {
		const values = components.map((component, index) => {
			if (index === 0) {
				//把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
				return component.value.replace(/\bNetType\/\w+\b/, '');
			}
			return component.value;
		});
		// 生成最终id murmur
		let murmur = Fingerprint2.x64hash128(values.join(''), 31);
		localStorage.setItem('browserId', murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
		console.log('浏览器指纹码：' + murmur);
	});
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
	// 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
	let ratio;
	if ((ratio = (width * height) / 4000000) > 1) {
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
	if ((count = (width * height) / 1000000) > 1) {
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
	const pressImgData = canvas.toDataURL('image/jpeg', 0.8);
	console.log('压缩前：' + initSize);
	console.log('压缩后：' + pressImgData.length);
	console.log('压缩率：' + ~~((100 * (initSize - pressImgData.length)) / initSize) + '%');
	return pressImgData;
};
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
