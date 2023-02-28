import screen from './js/screens.mjs'
import Renderer from './js/render.mjs'
import Level from './js/worldgen.mjs'

navigator.serviceWorker.register('/offline.js', {scope: '.'});

$(()=>{
	screen.switch('menu');
	const r = new Renderer($('canvas').get(0));
	let level = new Level().render(r);
	$('#travel').click((e)=>{
		let x = Math.floor((e.offsetX/$('canvas').width())*105)
		let y = Math.floor((e.offsetY/$('canvas').height())*105)
		level = new Level(level.x, level.y).render(r);
	})
	$('#menu-play').click(()=>{
		screen.switch('game')
		r.draw('./assets/game/blank_tile.png', 10, 10);
	})
});