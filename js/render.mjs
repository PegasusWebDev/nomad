export default class Renderer {
	constructor(c){
		this.c = c;
		this.ctx = c.getContext();
		this.ctx.imageSmoothingEnabled = false;
	}
	draw(url, x, y){
		let i = new Image();
		i.src = url;
		this.ctx.drawImage(i, x, y);
	}
}