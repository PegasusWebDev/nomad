import screen from './js/screens.mjs'
import Renderer from './js/render.mjs'
import Level from './js/worldgen.mjs'

navigator.serviceWorker.register('/offline.js', {scope: '.'});

$(()=>{
	screen.switch('menu');
	const r = new Renderer($('canvas').get(0));
	let level = new Level();
	$('#travel').click((e)=>{
		screen.switch('game', 1000);
		setTimeout(()=>{
			level = new Level();
		}, 1000);
	})
	$('#menu-play').click(()=>{
		screen.switch('game')
	})
});