import "./lib/perlin.js" //exports to globalThis.noise
function perlinPlane(x, y, w, h, s){
	let r = [];
	for(let i = 0; i < w; i++){
		let a = [];
		for(let j = 0; j < h; j++){
			a.push(noise.perlin2(x + s*i, y + s*j) * 256);
		}
		r.push(a);
	}
	return r;
}
export default class Level {
	constructor(){
		noise.seed(Math.random());
		this.map = perlinPlane(0, 0, 16, 16, 0.001)
	}
	render(c){
		let i = c.createImageData(16,16), d = i.data;
		for(let x = 0; x < this.map.length; x++){
			for(let y = 0; y < this.map[x].length; y++){
				let v = Math.abs(this.map[x][y] * 256);
				let c = (x + y * this.map[x].length) * 4;
				d[c] = d[c+1] = d[c+2] = v;
				d[c+3] = 255;
			}
		}
		c.putImageData(i, 0, 0);
	}
}