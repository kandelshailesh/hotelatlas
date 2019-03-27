// var targArea =$("#itemname-1");
// console.log(targArea);
var itemcreatecount=0;
$('.iteminformations').on('keyup', 'input', function(e) {
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;
        if(itemcreatecount===0)
        {
        $('.iteminformations').find('[autofocus]').focus();
        itemcreatecount=1;
    }
    // if (e.shiftKey) {
        if (e.keyCode == 8) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            if(this.value.length===0)
            {
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                form.submit();
            }
        }
        }
    // } else
    if (e.keyCode == 13) {
        // e.preventDefault();
        // $('[id^=accountlist]').html('');



        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        console.log(next);

        if (next.length) {
            next.focus();

        } else {
            form.submit();
        }
        return false;
    }
   e.preventDefault();

});


$("[id^=itemname]").on('keydown', reportKeyEvent);


function reportKeyEvent(zEvent) {
    // zEvent.preventDefault();


    var reportStr =
        "The " +
        (zEvent.ctrlKey ? "Control " : "") +
        (zEvent.shiftKey ? "Shift " : "") +
        (zEvent.altKey ? "Alt " : "") +
        (zEvent.metaKey ? "Meta " : "") +
        zEvent.key + " " +
        "key was pressed.";
    console.log(reportStr);
    // <!-- $("#statusReport").text (reportStr); -->

    //--- Was a Ctrl-Alt-E combo pressed?
    if (zEvent.altKey && zEvent.key === "c") {
        $("#itemModal").modal();
        // <!-- this.hitCnt = ( this.hitCnt || 0 ) + 1; -->
        // <!--  $("#statusReport").after (
        //      '<p>Bingo! cnt: ' + this.hitCnt + '</p>'
        //  ); -->
    }
    
    // zEvent.stopPropagation();
}


$('form.iteminformations').on('submit',function(e)
{
    e.preventDefault();

    var itemcreateform = $(".iteminformations").serializeArray();
    var formObj = {};
    $.each(itemcreateform, function (i, input) {
        formObj[input.name] = input.value;
    });
   console.log(formObj);
     $.ajax({
            type: 'post',
            url: '/createitem',
            data: { formobj:formObj },
            async:false,
            
            success: function(data) {
            
                alert("Item added successfully");
           
            
                // alert("Submitted successfully");
                // $(".iteminformations").reset();
                $('button.closeitem').click();
                $('form.iteminformations').trigger("reset");
                // $('button.close').click();

                 $('#itemModal').modal('toggle');
                  $("#itemnamelist").append(`<option>${formObj.itemsname}</option>`);
            },
            error: function(data) {
                // var data=JSON.parse(data);
                alert("Item is already in the list");
                console.log(data.result);
            }

})
})



$('body').on('shown.bs.modal', '#itemModal', function () {
    alert("Entered")
    $('input:visible:enabled:first', this).focus();
})


    $('#itemgroupModal').on('shown.bs.modal', function() {
        console.log("Entered");
         $(this).find('input').eq(0).focus();

        // $(this).find('[autofocus]').focus();
    });
 $('#itemcategoryModal').on('shown.bs.modal', function() {
        console.log("Entered");
         $(this).find('input').eq(0).focus();

        // $(this).find('[autofocus]').focus();
    });