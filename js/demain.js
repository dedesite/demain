$(function(){
	$.getJSON('data.json', function(data){
		//Add an index for Mustache
		$.each(data.sections, function(ind, section){
			section.index = ind;
		});
		var template = $('#template').html();
		Mustache.parse(template);   // optional, speeds up future uses
  		var rendered = Mustache.render(template, data);
		$('#accordion').html(rendered);

		//Hide the carousel cause it cusumes a lot
		$('.carousel').hide();
		$('.carousel').carousel('pause');

		$('.carousel-inner').each(function(ind, el){
			$(el).children().first().addClass('active');
		});

		//Enlarge the content
		$('.collapse').on('show.bs.collapse', function(e){
			window.scrollTo(0, 0);
			var col = $(e.target).parent();
			//Insure the content is at the begining
			$(col).detach().prependTo('#accordion');
			$(col).find('.carousel').show();
			console.log($(col).children('.carousel'));
			$(col).animate({width:"100%"}, {complete: function(){
				$(col).removeClass('col-md-3');
			}});
		});

		//Schrink the content
		$('.collapse').on('hide.bs.collapse', function(e){
			var col = $(e.target).parent();
			$(col).find('.carousel').hide();
			$(col).animate({width:"25%"}, {complete: function(){
				$(col).addClass('col-md-3');
			}});
		});
	});
});