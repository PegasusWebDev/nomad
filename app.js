import screen from './js/screens.mjs'
import Renderer from './js/render.mjs'

navigator.serviceWorker.register('/offline.js', {scope: '.'});

$(()=>{
	screen.switch('menu');
	const r = new Renderer($('canvas').get(0));
	$('canvas').click((e)=>{
		let x = Math.floor((e.offsetX/$('canvas').width())*105)
		let y = Math.floor((e.offsetY/$('canvas').height())*105)
		r.draw('./assets/game/blank_tile.png', x, y);
	})
	$('#menu-play').click(()=>{
		screen.switch('game')
		r.draw('./assets/game/blank_tile.png', 10, 10);
	})
});