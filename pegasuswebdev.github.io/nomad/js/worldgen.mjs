import perlin from "./lib/perlin.js"
function perlinPlane(x, y, w, h, s){
	let r = [];
	for(let i = 0; i < w; i++){
		let a = [];
		for(let j = 0; j < h; j++){
			a.push(perlin.get(x + s*i, y + s*j));
		}
		r.push(a);
	}
	return r;
}
function makeTile(c, l){
	let i = c.createImageData(10, 10), d = i.data, v = (l+1)*128;
	let shape = [
		[0,1,0,0,0,0,1,0,1,1],
		[1,1,0,0,1,1,1,1,0,1],
		[0,1,1,1,1,1,0,0,1,0],
		[0,0,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,0,0],
		[1,1,0,1,1,1,1,0,0,1],
		[0,0,1,1,1,1,1,1,1,0],
		[1,0,1,1,1,1,1,1,1,0],
		[1,1,1,1,0,0,0,1,0,0],
		[1,0,0,0,0,0,1,1,1,1]
	]
	for(let x = 0; x < 10; x++){
		for(let y = 0; y < 10; y++){
			let c = (x + y * 10) * 4;
			if(shape[y][x]){
				d[c] = d[c+1] = d[c+2] = v;
				d[c+3] = 255;
			} else {
				d[c] = d[c+1] = d[c+2] = d[c+3] = 0;
			}
		}
	}
	return i;
}
export default class Level {
	constructor(px, py){
		debugger;
		let x = (px??0) + (Math.random()-0.5), y = (py??0) + (Math.random()-0.5); //settle close to your previous position, you can't travel the world in a day you know
		this.map = perlinPlane(0, 0, 16, 16, 0.05)
		this.x = x;
		this.y = y;
	}
	render(r){
		let drawlist = [];
		for(let x = 0; x < this.map.length; x++){
			for(let y = 0; y < this.map[x].length; y++){
				drawlist.push({
					data: makeTile(r.ctx, this.map[x][y]),
					x: x*7 - 3,
					y: y*7 - 3
				});
			}
		}
		drawlist = drawlist.sort((a, b) => 0.5 - Math.random()); //more random transitions
		for(let i in drawlist){
			r.draw(drawlist[i].data, drawlist[i].x, drawlist[i].y);
		}
	}
}