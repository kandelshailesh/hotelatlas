function bookroom(event,id)
	{
		event.preventDefault();
		var room;
		// console.log(ids);
		if($('#'+id).hasClass('text-success'))
		{
			$('#'+id).removeClass('text-success')

			$('#'+id).addClass('text-danger')
		}
		else
		{
			$('#'+id).removeClass('text-danger')

			$('#'+id).addClass('text-success')

		}

		// $('#'+id).find('i').css('color','');
  	
		// console.log(room);
		// console.log(room);
		// // room.removeClass("");
		// room.addClass("text-danger");

		// console.log($(event.target).children());
		// console.log(event.target.css({'color':'red'}));
	}

	
	$('.room-select').on('change',function(event){
		console.log(event.target.value);
	});

	$('#doa').calendarsPicker({calendar: $.calendars.instance('nepali')});
	$('#dod').calendarsPicker({calendar: $.calendars.instance('nepali')});

	$('#category').on('change',function(event){
		if(!$('#hidden').hasClass('d-none'))
		{
			$('#hidden').addClass('d-none');
		}

		console.log(event.target.value);
		if(event.target.value==='0')
		{
			if(!$('.room-select').hasClass('d-none'))
			{
			
			$('.room-select').addClass('d-none');
	$('.room-select').multipleSelect();

		}
		if(!$('.hall-select').hasClass('d-none'))
			{
			$('.hall-select').addClass('d-none');
		}
		if($('#hidden').hasClass('d-none'))
			{
			$('#hidden').removeClass('d-none');
		}

		}
		else if(event.target.value==='1')
		{
		
			if($('.room-select').hasClass('d-none'))
			{
			
			$('.room-select').removeClass('d-none');
		}
		if(!$('.hall-select').hasClass('d-none'))
		{
			$('.hall-select').addClass('d-none');		
		}
		}
		else
		{
			if(!$('.room-select').hasClass('d-none'))
			{
			$('.room-select').addClass('d-none');
			}
			if($('.hall-select').hasClass('d-none'))
			{
			$('.hall-select').removeClass('d-none');
		}
	}
	});


$('.guest-information').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            }
            else
            {
            	$('#vtype').focus();
            
            }
        }
    } else
    if (e.keyCode == 13) {
        // e.preventDefault();
        // $('[id^=accountlist]').html('');



        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        console.log(next);

        if (next.length) {
            next.focus();
            next.select();
        } 
        else
        {
            	$('#vtype').focus();
            	
           
            	

        }
        return false;
    }
});

$('.vehicle-information').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            }
            else
            {
            	
            	$('#identificationno').focus();
            }
        }
    } else
    if (e.keyCode == 13) {
        // e.preventDefault();
        // $('[id^=accountlist]').html('');



        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        console.log(next);

        if (next.length) {
            next.focus();
            next.select();
        } 
        else
        {
            
            	$('#doa').focus();

           
            	

        }
        return false;
    }
});


$('.date-information').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            }
            else
            {
            	
            	$('#vplate').focus();
            }
        }
    } else
    if (e.keyCode == 13) {
        // e.preventDefault();
        // $('[id^=accountlist]').html('');



        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        console.log(next);

        if (next.length) {
            next.focus();
            next.select();
        } 
        else
        {
            
            	$('#doa').focus();

           
            	

        }
        return false;
    }
});