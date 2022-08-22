function easeInQuad(curtime, begin, end, duration) {
	let x = curtime / duration; //x值
	let y = x * x; //y值
	return begin + (end - begin) * y; //套入最初的公式
}
//用平方根构建的缓慢减速运动  核心函数:x*x + 2*x
function easeOutQuad(curtime, begin, end, duration) {
	let x = curtime / duration; //x值
	let y = -x * x + 2 * x; //y值
	return begin + (end - begin) * y; //套入最初的公式
}
function easeInoutQuad(curtime, begin, end, duration) {
	if (curtime < duration / 2) {
		//前半段时间
		return easeInQuad(curtime, begin, (begin + end) / 2, duration / 2); //改变量和时间都除以2
	} else {
		let curtime1 = curtime - duration / 2; //注意时间要减去前半段时间
		let begin1 = (begin + end) / 2; //初始量要加上前半段已经完成的
		return easeOutQuad(curtime1, begin1, end, duration / 2); //改变量和时间都除以2
	}
}
function newCanvas(width, height) {
	let bodyEl = document.body;
	let canvasEl = document.createElement('canvas');
	canvasEl.width = width;
	canvasEl.height = height;
	canvasEl.style.position = 'absolute';
	bodyEl.append(canvasEl);
	let wrap = canvasEl.getContext('2d');
	return wrap;
}
function setBgcolor(wrap, color) {
	wrap.fillStyle = color;
	wrap.fillRect(0, 0, wrap.canvas.width, wrap.canvas.height);
}
function clearBgcolor(wrap) {
	wrap.clearRect(0, 0, wrap.canvas.width, wrap.canvas.height);
}
function newParticle(wrap, position, r, color) {
	let x = position[0];
	let y = position[1];
	wrap.fillStyle = color;
	wrap.beginPath();
	wrap.arc(x, y, r, 0, 2 * Math.PI);
	wrap.shadowBlur = 20;
	wrap.shadowColor = `rgba(255,255,255,0.8)`;
	wrap.fill();
}
function fadeOpcity(cur, start, end, dur) {
	let opcity = parseFloat(easeInoutQuad(cur, start, end, dur).toFixed(2));
	return opcity;
}
let wrap0 = newCanvas(1000, 800);
// let wrap2 = newCanvas(1000, 800);
// let wrap = newCanvas(1000, 800);
// let wrap1 = newCanvas(1000, 800);

setBgcolor(wrap0, 'black');
// setBgcolor(wrap, 'rgba(0,0,0,0)');
// setBgcolor(wrap1, 'rgba(0,0,0,0)');
// setBgcolor(wrap2, 'rgba(0,0,0,0)');
let startPosition = [500, 200];
let r = 10;
let a = -200;
let x = a * (1 - Math.cos(0)) * Math.sin(0) + startPosition[0];
let y = a * (1 - Math.cos(0)) * Math.cos(0) + startPosition[1];
function movePosition(a, g, startPosition) {
	let t = (Math.PI * 2) / 360;
	let x = a * (1 - Math.cos(g * t)) * Math.sin(g * t) + startPosition[0];
	let y = a * (1 - Math.cos(g * t)) * Math.cos(g * t) + startPosition[1];
	return [x, y];
}
function intervalMove(speed, g = 0) {
	if (g === 720) {
		g = 360;
	}
	g = g + speed;
	let nextPosition = movePosition(a, g, startPosition);
	x = nextPosition[0];
	y = nextPosition[1];
	clearBgcolor(wrap0);
	for (let i = 1; i <= 360; i++) {
		let g1 = g - i / 2;
		if (g1 < 0 && g <= 360) {
			break;
		}
		let g1Position = movePosition(a, g1, startPosition);
		newParticle(wrap0, [g1Position[0], g1Position[1]], r / (1 + i / 5), `rgba(255,200,200,0.5)`);
	}
	setTimeout(() => {
		intervalMove(speed, g);
	}, 33);
}

function intervalOpcity(cur = 0, start = 0.3, end = 0.8, dur = 3) {
	if (fadeOpcity(cur, start, end, dur) === end) {
		cur = 0;
		let temp = start;
		start = end;
		end = temp;
	}
	let opcity = fadeOpcity(cur, start, end, dur);
	let color = `rgba(0,0,0,${opcity})`;
	clearBgcolor(wrap0);
	newParticle(wrap0, [x, y], r, color);
	cur = parseFloat(cur + 0.1);
	setTimeout(() => {
		intervalOpcity(cur, start, end, dur);
	}, 33);
}
export default () => {
	intervalOpcity();
	intervalMove(1);
};
