export default {
	switch: function(to, time){
		if(time){
			$('main').fadeOut(time);
			$('#'+to).fadeIn(time);
			return;
		}
		$('main').hide();
		$('#'+to).show();
	}
}