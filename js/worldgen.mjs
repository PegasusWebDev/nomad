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
      tile.bitmap = new Array(4);
      promises.push(loadTileBitmapData(path, tile, 0));
      promises.push(loadTileBitmapData(path, tile, 1));
      promises.push(loadTileBitmapData(path, tile, 2));
      promises.push(loadTileBitmapData(path, tile, 3));
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

function expandRotations (structure) {
  let newNeighbors = [];
  for(let i in structure.neighbors){
    if(structure.neighbors[i].anyrot){
      let n = structure.neighbors[i];
      newNeighbors.push(n);
      newNeighbors.push({left: n.left + " 1", right: n.right});
      newNeighbors.push({left: n.left + " 2", right: n.right});
      newNeighbors.push({left: n.left + " 3", right: n.right});
      newNeighbors.push({left: n.left, right: n.right + " 1"});
      newNeighbors.push({left: n.left, right: n.right + " 2"});
      newNeighbors.push({left: n.left, right: n.right + " 3"});
      newNeighbors.push({left: n.left + " 1", right: n.right + " 1"});
      newNeighbors.push({left: n.left + " 1", right: n.right + " 2"});
      newNeighbors.push({left: n.left + " 1", right: n.right + " 3"});
      newNeighbors.push({left: n.left + " 2", right: n.right + " 1"});
      newNeighbors.push({left: n.left + " 2", right: n.right + " 2"});
      newNeighbors.push({left: n.left + " 2", right: n.right + " 3"});
      newNeighbors.push({left: n.left + " 3", right: n.right + " 1"});
      newNeighbors.push({left: n.left + " 3", right: n.right + " 2"});
      newNeighbors.push({left: n.left + " 3", right: n.right + " 3"});
    } else {
      newNeighbors.push(structure.neighbors[i]);
    }
    structure.neighbors = newNeighbors;
    return structure;
  }
}

export default class Level {
	constructor(r){
    let d = expandRotations(definition);
    console.log(d);
		addBitmapDataToStructure(d, function (err, d) {
			if (err) {
				throw err;
			}
			
			const destWidth = 16;
			const destHeight = 16;
			
			try {
				const model = new WFC.SimpleTiledModel(d, null, destWidth, destHeight, false);
				const finished = model.generate();
			
				if (finished) {
					console.log('Success');
					let data = r.ctx.createImageData(112, 112);
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