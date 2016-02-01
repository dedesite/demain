$(function(){
	$.getJSON('data.json', function(data){
		//Add an index for Mustache
		$.each(data.sections, function(ind, section){
			section.index = ind;
		});
		var template = $('#template').html();
		Mustache.parse(template);   // optional, speeds up future uses
  		var rendered = Mustache.render(template, data);
  		$('#accordion-content').html(rendered);
		$('.carousel').carousel();
		$('.carousel-inner').each(function(ind, el){
			$(el).children().first().addClass('active');
		});
	});
});