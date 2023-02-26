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
		console.log(perlinPlane(0, 0, 16, 16, 0.001));
	}
}