// var targArea =$("#itemname-1");
// console.log(targArea);
$("#itemgroupcreate").on('keydown',reportKeyEvent);
console.log("HEllo from itemgroupcreate");

$('.itemgroupinformations').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                form.submit();
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
        } else {
            form.submit();
        }
        return false;
    }
   e.preventDefault();

    
});

function reportKeyEvent (zEvent) {


    var reportStr   =
        "The " +
        ( zEvent.ctrlKey  ? "Control " : "" ) +
        ( zEvent.shiftKey ? "Shift "   : "" ) +
        ( zEvent.altKey   ? "Alt "     : "" ) +
        ( zEvent.metaKey  ? "Meta "    : "" ) +
        zEvent.key + " " +
        "key was pressed."
    ;
    console.log(reportStr);
    // <!-- $("#statusReport").text (reportStr); -->

    //--- Was a Ctrl-Alt-E combo pressed?
    if (zEvent.altKey  &&  zEvent.key === "c") {
        $("#itemgroupModal").modal();
        // <!-- this.hitCnt = ( this.hitCnt || 0 ) + 1; -->
       // <!--  $("#statusReport").after (
       //      '<p>Bingo! cnt: ' + this.hitCnt + '</p>'
       //  ); -->
    }
    zEvent.stopPropagation ();
    zEvent.preventDefault ()
}