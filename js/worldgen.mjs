import * as WFC from './lib/wavefunctioncollapse/index.js'
import Renderer from './render.mjs'
import definition from './tiledata.mjs'

function loadTileBitmapData (basePath, tile, number) {
  const unique = number !== null;
  const tilePath = basePath + tile.name + (unique ? ' ' + number : '') + '.png';

  return Renderer.toImageData(tilePath).then(function (result) {
    if (unique) {
      tile.bitmap[number] = new Uint8Array(result.data); //add the bitmap data in each tile variant
    } else {
      tile.bitmap = new Uint8Array(result.data); //add the bitmap data in each tile
    }

    return true;
  });
}

function addBitmapDataToStructure (structure, callback) {
  const promises = [];
  const path = structure.path;
  const unique = !!structure.unique;

  structure.tiles.map(function (tile) {
    if (unique) {
      if (tile.symmetry === 'X') {
        tile.bitmap = new Array(1);
        promises.push(loadTileBitmapData(path, tile, 0));
      } else {
        tile.bitmap = new Array(4);
        promises.push(loadTileBitmapData(path, tile, 0));
        promises.push(loadTileBitmapData(path, tile, 1));
        promises.push(loadTileBitmapData(path, tile, 2));
        promises.push(loadTileBitmapData(path, tile, 3));
      }
    } else {
      promises.push(loadTileBitmapData(path, tile, null));
    }
  });

  Promise.all(promises).then(function () {
    callback(null, structure);
  }, function (error) {
    callback(error, null);
  });
}

export default class Level {
	constructor(r){
		addBitmapDataToStructure(definition, function (err, definition) {
			if (err) {
				throw err;
			}
			
			const destWidth = 15;
			const destHeight = 15;
			
			//try catch to prevent the eventual errors from being silenced by the promise...
			
			try {
				const model = new WFC.SimpleTiledModel(definition, null, destWidth, destHeight, false);
				const finished = model.generate();
			
				if (finished) {
					console.log('Success');
					let data = r.ctx.createImageData(109, 109);
					model.graphics(data.data);
					r.ctx.putImageData(data, 0, 0);
				} else {
					console.log('The generation ended in a contradiction');
				}
			} catch(e) {
				console.log('An error occurred');
				console.log(e.stack);
			}
		});
	}
	render(r){
		
	}
}