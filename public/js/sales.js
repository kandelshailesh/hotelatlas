for( var i=1;i<2;i++)
{

$('.salestable').append(`<tr  class=" m-0 row text-center">
      <td id="sn" class="col-md-1  ">${i}</td>
      <td  class="col-md-4 p-0"><input list="itemnamelist" class="form-control" name="itemname" id="itemname-${i}" type="text" required oninvalid="this.setCustomValidity('Item not in the list!!')"/></td>
      <td  class="col-md-2 p-0"><input  name="quantity" id="quantity-${i}" class="form-control" min="0" type="number"  /></td>
      <td  class="col-md-2 p-0"><input name="rate" id="rate-${i}"  type="number" min="0" class="form-control"  /></td>
      <td   class="col-md-1 p-0"><input  name="per" id="per-${i}"  type="number" min="0" class="form-control" /></td>
      <td   class="col-md-2 p-0"><input onkeypress="createnewsalesbox(event)" cname="amount" id="amount-${i}" type="text" class="form-control text-center" readonly  /></td>
    </tr>`)
  }

  $(document).on('input','[id^=quantity-]',function(e)
  {
  console.log(e.target.value);
  var targetid= e.target.id.split('-')[1];
  var amountlist= $("[id^=amount-");
  var totalamount=Number(0);
  $(`#amount-${targetid}`).val($(`#rate-${targetid}`).val() * $(`#quantity-${targetid}`).val());
   for(i=0;i<amountlist.length;i++)
   {
  totalamount=totalamount+Number($(amountlist).eq(i).val());
   }
  console.log("Totalamount is" +totalamount);
   console.log("TYpe of "+typeof(totalamount))

if(Number(totalamount)>0)
  {
   $('#totalamount').text(totalamount);
  }
  else
  {
   $('#totalamount').text(0);

 }
   // $('#totalamount').text(totalamount);

   $(`#amount-${targetid}`).val($(`#rate-${targetid}`).val() * $(`#quantity-${targetid}`).val());


  })
   $(document).on('input','[id^=rate-]',function(e)
  {
    var targetid= e.target.id.split('-')[1];
    console.log(e.target.value);
  var amountlist= $("[id^=amount-");

    var totalamount=0;

  $(`#amount-${targetid}`).val($(`#rate-${targetid}`).val() * $(`#quantity-${targetid}`).val());
   for(i=0;i<amountlist.length;i++)
   {
  totalamount=totalamount+Number($(amountlist).eq(i).val());
   }
   console.log("TYpe of "+typeof(totalamount))
  console.log("Totalamount is" +totalamount);
  
if(Number(totalamount)>0)
  {
   $('#totalamount').text(totalamount);
  }
  else
  {
   $('#totalamount').text(0);
    
 }

   $(`#amount-${targetid}`).val($(`#rate-${targetid}`).val() * $(`#quantity-${targetid}`).val());

  })

function createnewsalesbox(e)
{
    e.preventDefault();
var i = parseInt(e.target.id.split('-')[1])+1;
    console.log('Pressed');
    if(e.altKey && e.key === "c")
    {
        console.log("EJ");
        $('#totalamount').focus();
    }
    // if(e.keyCode===13)
    // {
    if($(`#itemname-${i}`).length === 0 && e.keyCode===
        13)
  {
   
$('.salestable').append(`<tr  class=" m-0 row text-center">
      <td id="sn" class="col-md-1  ">${i}</td>
      <td  class="col-md-4 p-0"><input list="itemnamelist" class="form-control" name="itemname" id="itemname-${i}" type="text" required oninvalid="this.setCustomValidity('Item not in the list!!')"/></td>
      <td  class="col-md-2 p-0"><input  name="quantity" id="quantity-${i}" class="form-control" min="0" type="number"  /></td>
      <td  class="col-md-2 p-0"><input name="rate" id="rate-${i}"  type="number" min="0" class="form-control"  /></td>
      <td   class="col-md-1 p-0"><input  name="per" id="per-${i}"  type="number" min="0" class="form-control" /></td>
      <td   class="col-md-2 p-0"><input onkeypress="createnewsalesbox(event)" cname="amount" id="amount-${i}" type="text" class="form-control text-center" readonly  /></td>
    </tr>`)
  }

}

var itemcheck=0;
var itemalertshow=0;
$(document).on('focusout','[id^=itemname-]',function(e)
{


// $('[id^=itemname-]').focusout(function(e)
// {
console.log("Itemname is "+ e.target.value);
var itemnameentered=e.target.value;
var targetid=e.target.id.split('-')[1];
var itemlist=$("#itemnamelist option");
for(i=0;i<itemlist.length;i++)
{
  console.log($(itemlist).eq(i).val())
  if(itemnameentered===$(itemlist).eq(i).val())
  {
    itemcheck=1;
   
  }
}
if(itemcheck===1)
{
  console.log("ok");
  itemcheck=0;
if($( `#itemname-${targetid}`).hasClass('bg-danger'))
{
$( `#itemname-${targetid}`).removeClass('bg-danger');
}
if(!$( `#itemname-${targetid}`).hasClass('bg-white'))
{
$( `#itemname-${targetid}`).addClass('bg-white');
$( `#itemname-${targetid}`).next('p').remove();

}
// $( `#itemname-${targetid}`).addClass('bg-white');

}
else
{
  if($( `#itemname-${targetid}`).hasClass('bg-white'))
  {
$(`#itemname-${targetid}`).removeClass('bg-white');

  }
// $( `#itemname-${targetid}`).removeClass('bg-white');

if(!$( `#itemname-${targetid}`).hasClass('bg-danger'))
{
$( `#itemname-${targetid}`).addClass('bg-danger');
$( `#itemname-${targetid}`).after('<p>Item not in the list</p>');

}
// $( `#itemname-${targetid}`).addClass('bg-danger');


// console.log("A is "+a);

$(`#itemname-${targetid}`).focus();



}

})
$('#salespurchasetransaction').on('keyup', 'input', function(zEvent) {

        var self = $(this),
            form = self.parents('form:eq(0)'),
            focusable, next, prev;

        // if (zEvent.shiftKey) {
            if (zEvent.keyCode == 8) {

                focusable = form.find('input,a,select,button,textarea').filter(':enabled');
                console.log(this);
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
        if (zEvent.keyCode == 13) {
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


