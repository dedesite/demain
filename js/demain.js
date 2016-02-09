$(function(){
	$.getJSON('data.json', function(data){
		//Add an index for Mustache
		$.each(data.sections, function(ind, section){
			section.index = ind;
		});

		//Divide the sections in 3 columns
		var nbItemsInCol = Math.floor(data.sections.length / 3);
		for(var i = 0 ; i < 3 ; i++){
			var template = $('#template').html();
			Mustache.parse(template);   // optional, speeds up future uses
			var col = {};
			var last = i != 2 ? i*nbItemsInCol + nbItemsInCol : data.sections.length;
			col.sections = data.sections.slice(i*nbItemsInCol, last);
			var rendered = Mustache.render(template, col);
			$('#accordion').append(rendered);
		}

		//Hide the carousel cause it cusumes a lot
		$('.carousel').hide();
		$('.carousel').carousel('pause');
		//Set the active element otherwise carousel plugin crash
		$('.carousel-inner').each(function(ind, el){
			$(el).children().first().addClass('active');
		});

		var colToRattach = null;
		var previousContent = null;
		//Enlarge the content
		$('.collapse').on('show.bs.collapse', function(e){
			window.scrollTo(0, 0);
			if(previousContent != null){
				previousContent.collapse('hide');
			}
			previousContent = $(e.target);
			var section = $(e.target).parent();
			colToRattach = section.parent();
			//Insure the content is at the begining
			$(section).detach().prependTo('#content');
			$(section).find('.carousel').show();
		});

		//Schrink the content
		$('.collapse').on('hide.bs.collapse', function(e){
			var section = $(e.target).parent();
			$(section).find('.carousel').hide();
			$(section).detach().prependTo(colToRattach);
		});
	});
});