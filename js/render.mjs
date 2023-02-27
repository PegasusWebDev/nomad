export default class Renderer {
	constructor(c){
		this.c = c;
		this.ctx = c.getContext('2d');
		this.ctx.imageSmoothingEnabled = false;
	}
	draw(s, x, y){
		if(typeof s == 'string'){
			let i = new Image();
			i.src = s;
			this.ctx.drawImage(i, x, y);
		} else if(s instanceof ImageData){
			createImageBitmap(s).then((i)=>{
				this.ctx.drawImage(i, x, y);
			})
		} else {
			throw "Invalid type passed: accepts URL string or ImageData"
		}
	}
}