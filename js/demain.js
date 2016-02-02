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
		//Enlarge the content
		$('.collapse').on('show.bs.collapse', function(e){
			var col = $(e.target).parent();
			//Insure the content is at the begining
			$(col).detach().prependTo('#accordion-content');

			$(col).animate({width:"100%"}, {complete: function(){
				$(col).removeClass('col-md-3');
			}});
		});
		//Schrink the content
		$('.collapse').on('hide.bs.collapse', function(e){
			var col = $(e.target).parent();
			$(col).animate({width:"25%"}, {complete: function(){
				$(col).addClass('col-md-3');
			}});
		});
	});
});