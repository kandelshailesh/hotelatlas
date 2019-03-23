// var targArea =$("#itemname-1");
// console.log(targArea);
// $("#itemgroupcreate").on('keydown',reportKeyEvent);
$("#itemgroupcreate").on('keydown',reportKeyEvent);

console.log("HEllo from itemgroupcreate");

$('.itemgroupinformations').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

     // if (e.shiftKey) {
        if (e.keyCode == 8) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            if(this.value.length===0)
            {
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                // alert("Do you want to close the form? ");
                form.submit();
            }
        }
        }
        else
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
   // e.preventDefault();

    
});

function reportKeyEvent (zEvent) {


    // var reportStr   =
    //     "The " +
    //     ( zEvent.ctrlKey  ? "Control " : "" ) +
    //     ( zEvent.shiftKey ? "Shift "   : "" ) +
    //     ( zEvent.altKey   ? "Alt "     : "" ) +
    //     ( zEvent.metaKey  ? "Meta "    : "" ) +
    //     zEvent.key + " " +
    //     "key was pressed."
    // ;
    // console.log(reportStr);
    // <!-- $("#statusReport").text (reportStr); -->

    //--- Was a Ctrl-Alt-E combo pressed?
    if (zEvent.altKey  &&  zEvent.key === "c") {
        $("#itemgroupModal").modal();
        // <!-- this.hitCnt = ( this.hitCnt || 0 ) + 1; -->
       // <!--  $("#statusReport").after (
       //      '<p>Bingo! cnt: ' + this.hitCnt + '</p>'
       //  ); -->
    }
    // zEvent.stopPropagation ();
    // zEvent.preventDefault ()
}


$('form.itemgroupinformations').on('submit',function(e)
{
    e.preventDefault();

    var itemcreateform = $(".itemgroupinformations").serializeArray();
    var formObj = {};
    $.each(itemcreateform, function (i, input) {
        formObj[input.name] = input.value;
    });
   console.log(formObj);
     $.ajax({
            type: 'post',
            url: '/creategroup',
            data: { formobj:formObj },
            error: function(data) {
                // var data=JSON.parse(data);
                console.log(data.result);
            },
            success: function(data) {
                if(data.message==='Enter valid data')
                {
                alert("Item added successfully");
                $('.error-msg').text('Enter valid data');
            }
            else
            {
                alert("Submitted successfully");
                // $(".iteminformations").reset();
                $('button.close').click();
                $('form.itemgroupinformations').trigger("reset");
                // $('button.close').click();

                 $('#itemgroupModal').modal('toggle');
                  $("#itemgrouplist").append(`<option>${formObj.groupname}</option>`);

            }
}
})
})