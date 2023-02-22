import screen from './js/screens.mjs'

navigator.serviceWorker.register('/offline.js', {scope: '.'});

$(()=>{
	$('#menu-play').click(()=>{
		screen.switch('test')
	})
	$('#test-back').click(()=>{
		screen.switch('menu')
	})
});