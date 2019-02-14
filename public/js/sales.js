for( var i=1;i<20;i++)
{

$('.salestable').append(`<tr  class=" m-0 row text-center">
      <td id="sn" class="col-md-1  ">${i}</td>
      <td   class="col-md-4 p-0"><input class="form-control" name="itemname" id="itemname-${i}" type="text" />

      <td  class="col-md-2 p-0"><input  name="quantity" id="quantity-${i}" type="text" class="form-control"  /><div style= "max-height:150px; margin:auto; overflow-y:scroll; position:relative; z-index:99;"><ul class="list-group" style="max-height:150px;" id="itemlist-${i}" class="d-none" ></ul></div></td>
      <td  class="col-md-2 p-0"><input oninput="javascript:checktotaldc(event);" name="rate" id="rate-${i}"  type="number" min="0" class="form-control"  /></td>
      <td   class="col-md-1 p-0"><input oninput="javascript:checktotaldc(event);" name="per" id="per-${i}"  type="number" min="0" class="form-control" /></td>
      <td   class="col-md-2 p-0"><input name="amount" id="amount-${i}" type="text" class="form-control text-center"   /></td>
    </tr>`)
  }

$('#salespurchasetransaction').on('keyup', 'input', function(zEvent) {

        var self = $(this),
            form = self.parents('form:eq(0)'),
            focusable, next, prev;

        if (zEvent.shiftKey) {
            if (zEvent.keyCode == 13) {

                focusable = form.find('input,a,select,button,textarea').filter(':enabled');
                prev = focusable.eq(focusable.index(this) - 1);

                if (prev.length) {
                    prev.focus();
                } else {
                    form.submit();
                }
            }
        } else
        if (zEvent.keyCode == 13) {
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
    });

// $('#salespurchasetransaction').on('keydown', 'input', function(e) {

//     var self = $(this),
//         form = self.parents('form:eq(0)'),
//         focusable, next, prev;

//     if (e.shiftKey) {
//         if (e.keyCode == 13) {

//             focusable = form.find('input,a,select,button,textarea').filter(':enabled');
//             prev = focusable.eq(focusable.index(this) - 1);

//             if (prev.length) {
//                 prev.focus();
//             } else {
//                 form.submit();
//             }
//         }
//     } else
//     if (e.keyCode == 13) {
//         // e.preventDefault();
//         // $('[id^=accountlist]').html('');



//         focusable = form.find('input,a,select,button,textarea').filter(':enabled');
//         next = focusable.eq(focusable.index(this) + 1);
//         console.log(next);

//         if (next.length) {
//             next.focus();
//             next.select();
//         } else {
//             form.submit();
//         }
//         return false;
//     }
// });