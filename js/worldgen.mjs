import * as WFC from './lib/wavefunctioncollapse/index.js'
import Renderer from './render.mjs'

export default class Level {
	constructor(r){
		Renderer.toImageData('assets/game/blank_tile.png').then((data)=>{
			let randomGrass = new WFC.OverlappingModel(data.data, data.width, data.height, 3, 10, 10, true, true, 1, 0);
			let newData = r.ctx.createImageData(10, 10);
			randomGrass.graphics(newData);
			r.ctx.putImageData(newData, 0, 0);
			this.render(r);
		})
	}
	render(r){
		
	}
}