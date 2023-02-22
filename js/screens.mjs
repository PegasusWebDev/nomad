export default {
	switch: function(to){
		$('main').hide();
		$('#'+to).show();
	}
}