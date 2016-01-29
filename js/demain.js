$(function(){
	$.getJSON('data.json', function(data){
		var template = $('#template').html();
  		Mustache.parse(template);   // optional, speeds up future uses
  		var rendered = Mustache.render(template, data[0]);
  		$('#accordion-content').html(rendered);
	});
});