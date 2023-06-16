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
			i.onload = ()=>{
				this.ctx.drawImage(i, x, y);
			}
		} else if(s instanceof ImageData){
			createImageBitmap(s).then((i)=>{
				this.ctx.drawImage(i, x, y);
			})
		} else {
			throw "Invalid type passed: accepts URL string or ImageData"
		}
	}
	static toImageData(url) {
		return new Promise((res, rej)=>{
			let c = document.createElement('CANVAS');
			let x = c.getContext('2d');
			let i = new Image();
			i.src = url;
			i.onload = () => {
				c.width = i.width;
				c.height = i.height;
				x.drawImage(i, 0, 0);
				res(x.getImageData(0, 0, i.width, i.height));
			}
		});
	}
}