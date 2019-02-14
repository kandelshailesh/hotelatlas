for (var i = 1; i < 2; i++) {

    $('.billtable').append(`<tr  class=" m-0  row text-center">
			<td id="sn" class="col-md-2 ">${i}</td>
			<td   class="col-md-4 p-0"><input id="itemname-${i}" name="itemname-${i}" style="text-align-last:center;" onchange="changeprice(event);" type="text" class="form-control" autocomplete="off" /><ul style="list-style-type:none;  left:-1px;  max-height:150px; position:absolute; outline:1px solid black;z-index:99; overflow:auto; padding:0px; margin:0px;" id="itemlist-${i}"  name="itemlist-${i}"  class="d-none list-group"></ul>
			<td  class="col-md-1 p-0"><input type="number" min="0" onkeyup="changeitemquantity(event)" name="itemsquantity-${i}"  id="itemsquantity-${i}" value=0  class="form-control" /></td>
			<td  class="col-md-2 p-0"><select onchange="unitchange(event)" class="form-control" style="text-align-last:center; text-align: center; " name="unit-${i}" id="unit-${i}" ><option  value="0"></option><option  value="1">Cup</option><option value="2">Plate</option><option value="3">Kachaura</option><option>Pieces</option></select></td>
			<td   class="col-md-1 p-0"><input onchange="changeitemprice(event)" onkeyup="changeitemprice(event)" id="itemsprice-${i}" name="itemsprice-${i}"   value="0" type="number" min="0" class="form-control" /></td>
			<td   class="col-md-2 p-0"><input name="amount-${i}"  style="text-align-last:center;" onkeydown="createnew(event);" id="amount-${i}" value=0  type="number" min="0" class="form-control text-center" value=0  /></td>
			
		</tr>`);
}

function changeprice(event)
{

var ids= event.target.id.split('-');
		var id= ids[1];
		// console.log(id);
		var quantity= $('#itemsquantity-'+id).val();
		var price=$('#itemsprice-'+id).val();
		console.log(price);
		var totalamount=parseInt(quantity)*parseInt(price);
		$('#amount-'+id).val(totalamount);
		var amountlist= $("[id^=amount]");
		console.log(amountlist[0].value);
		var total=0;
		var j;
		for(var i = 0 ; i<amountlist.length;i++)
		{ 
			console.log(j);
			var subtotal;
			subtotal=amountlist[i].value;
			console.log(subtotal);
			total=parseInt(total)+parseInt(subtotal);
			console.log(total);

		}
		var discountamount= 0.2 * total;
		var grandtotalamount= total-discountamount;

		$("#totalamount").val(total);
		$("#discountamount").val(discountamount);
		$("#grandtotalamount").val(grandtotalamount);
$('#itemname-${i}').focus();

}
// <td class="col-md-1 p-0"><button type="button" id="itemdel-${i}" class="btn btn-sm btn-danger">
//     <i class="fa fa-trash"></i> Del
// </button></td>
// $('[id^=amount]').on('keydown',function(e)
// {
	function createnew(e)
	{
	var i = parseInt(e.target.id.split('-')[1])+1;
	console.log('Pressed');
	if(e.altKey && e.key === "c")
	{
		console.log("EJ");
		$('#totalamount').focus();
	}
	if(e.keyCode===13)
	{
	 $('.billtable').append(`<tr  class=" m-0  row text-center">
			<td id="sn" class="col-md-2 ">${i}</td>
			<td   class="col-md-4 p-0"><input id="itemname-${i}" name="itemname-${i}" style="text-align-last:center; " onchange="changeprice(event)" onkeyup="listitem(event);" type="text" class="form-control" autocomplete="off"/><ul style="list-style-type:none;  left:-1px;  max-height:150px; position:absolute; outline:1px solid black;z-index:99; overflow:auto; padding:0px; margin:0px;" id="itemlist-${i}"  name="itemlist-${i}"  class="d-none" autofocus></ul>
			<td  class="col-md-1 p-0"><input type="number" min="0" onkeyup="changeitemquantity(event)" name="itemsquantity-${i}" value=0  id="itemsquantity-${i}" class="form-control" /></td>
			<td  class="col-md-2 p-0"><select onchange="unitchange(event)" class="form-control" style="text-align-last:center; text-align: center; " name="unit-${i}" id="unit-${i}" ><option  value="0"></option><option  value="1">Cup</option><option value="2">Plate</option><option value="3">Kachaura</option><option>Pieces</option></select></td>
			<td   class="col-md-1 p-0"><input id="itemsprice-${i}" onkeyup="changeitemprice(event)" name="itemsprice-${i}" oninput="changeitemprice(event)"  value=0  type="number" min="0" class="form-control" /></td>
			<td   class="col-md-2 p-0"><input value=0  name="amount-${i}"  style="text-align-last:center;" onkeydown="createnew(event);" id="amount-${i}" type="number" min="0" class="form-control text-center" value=0  /></td>
		
		</tr>`);
}
// 	<td class="col-md-1 p-0"><button type="button" id="itemdel-${i}" class="btn btn-sm btn-danger">
//     <i class="fa fa-trash"></i> Del
// </button></td>
$(`#itemname-${i}`).focus();

e.preventDefault();

}


function typechange(event)
{
	$("#rthno").focus();
}
function unitchange(event)
{
	var id= event.target.id.split('-')[1]
	$(`#itemsprice-${id}`).focus();
}

var gc = $.calendars.instance('nepali','ne'); 
var currentdate=gc.newDate();
      var currenttime=new Date();
      var currenttime=currenttime.toLocaleTimeString();
      var random =parseInt(Math.floor((Math.random()*1000000000) +1));

      $('.dates').append("<label class='ml-1 d-inline'>"+currentdate+"</label>");
        $('.times').append("<label class='timeupdate ml-1 d-inline'>"+currenttime+"</label>");
        $('.billno').append("<label class='ml-1 d-inline'>"+random+"</label>");

    // $("[id^=itemsquantity]").on('keyup',function(event){


function changeitemquantity(event)
{
		var ids= event.target.id.split('-');
		var id= ids[1];
		// console.log(id);
		var quantity= $('#itemsquantity-'+id).val();
		var price=$('#itemsprice-'+id).val();
		var totalamount=parseInt(quantity)*parseInt(price);
		$('#amount-'+id).val(totalamount);
		var amountlist= $("[id^=amount]");
		console.log(amountlist[0].value);
		var total=0;
		var j;
		for(var i = 0 ; i<amountlist.length;i++)
		{ 
			console.log(j);
			var subtotal;
			subtotal=amountlist[i].value;
			console.log(subtotal);
			total=parseInt(total)+parseInt(subtotal);
			console.log(total);

		}
		var discountamount= 0.2 * total;
		var grandtotalamount= total-discountamount;

		$("#totalamount").val(total);
		$("#discountamount").val(discountamount);
		$("#grandtotalamount").val(grandtotalamount);
		// $('#itemsprice-'+id).focus();

	}
function changeitemprice(event)
{
var ids= event.target.id.split('-');
		var id= ids[1];
		// console.log(id);
		var quantity= $('#itemsquantity-'+id).val();
		var price=$('#itemsprice-'+id).val();
		var totalamount=parseInt(quantity)*parseInt(price);
		$('#amount-'+id).val(totalamount);
		var amountlist= $("[id^=amount]");
		console.log(amountlist[0].value);
		var total=0;
		var j;
		for(var i = 0 ; i<amountlist.length;i++)
		{ 
			console.log(j);
			var subtotal;
			subtotal=amountlist[i].value;
			console.log(subtotal);
			total=parseInt(total)+parseInt(subtotal);
			console.log(total);

		}
		var discountamount= 0.2 * total;
		var grandtotalamount= total-discountamount;

		$("#totalamount").val(total);
		$("#discountamount").val(discountamount);
		$("#grandtotalamount").val(grandtotalamount);

}

$('#discountamount').on('keyup',function(e)
{
	var value =e.target.value;
   $("#grandtotalamount").val($("#totalamount").val()-$("#discountamount").val());

})

	// $("[id^=itemsprice]").on('keyup',function(event){
	// 	var ids= event.target.id.split('-');
	// 	var id= ids[1];
	// 	// console.log(id);
	// 	var quantity= $('#itemsquantity-'+id).val();
	// 	var price=$('#itemsprice-'+id).val();
	// 	var totalamount=parseInt(quantity)*parseInt(price);
	// 	$('#amount-'+id).val(totalamount);
	// 	var amountlist= $("[id^=amount]");
	// 	console.log(amountlist[0].value);
	// 	var total=0;
	// 	var j;
	// 	for(var i = 0 ; i<amountlist.length;i++)
	// 	{ 
	// 		console.log(j);
	// 		var subtotal;
	// 		subtotal=amountlist[i].value;
	// 		console.log(subtotal);
	// 		total=parseInt(total)+parseInt(subtotal);
	// 		console.log(total);

	// 	}
	// 	$("#totalamount").text(total);
	// });

	function listitem(event)
	{

	    var items=[{'item':'Black Tea','price':20},{'item':'Lemon Tea','price':25},{'item':'Milk Tea','price':30},{'item':'Black Coffee','price':'35'},{'item':'Milk Coffee','price':60},{'item':'Hot lemon with Honey','price':90},{'item':'Cold Coffee','price':110},{'item':'Sweet Lassi','price':120},{'item':'Banana Lassi','price':160},{'item':'Mango Lassi','price':150},{'item':'Mixed Food Lassi','price':180},{'item':'Cold Drinks','price':50},{'item':'Fresh Lime Soda','price':60},{'item':'Mineral Water','price':30},{'item':'Red Bull Big','price':300},{'item':'Red Bull Small' , 'price':160},{'item':'Banana Milk Shake', 'price':140},{'item':'Mango Milk Shake' , 'price':150},{'item':'Apple Milk Shake', 'price':150},{'item':'Pouch Egg' , 'price':70},{'item':'Boiled Egg 2PC', 'price':60},{'item':'Masala Omelete' , 'price':80},{'item':'Puri Tarkaari' , 'price':100},{'item':'Veg Soup', 'price':110},{'item':'Mushroom Soup', 'price':140},{'item':'Chicken Soup','price':150},{'item':'Mutton Soup' , 'price':160},{'item':'Hot and Sour Veg Soup','price':120},{'item':'Hot and Sour Chicken SOup','price':160},{'item':'Cream of Tomato Soup','price':120},{
	    	'item':'Manchow Soup Veg','price':110},{'item':'Manchow Soup Chicken','price':170},{'item':'Veg Sizzler' , 'price':210},{'item':'Chicken Sizzler' , 'price':340},{'item':'Fish Sizzler' , 'price':390},{'item':'Nepali Salad' , 'price':120},{'item':'Green Salad' , 'price':110},{'item':'Russian Salad' , 'price':240},{'item':'Chicken Salad' , 'price':220},{'item':'Veg Fry Rice','price':160},{'item':'Chicken Fry Rice' , 'price':250},{'item':'Egg Fried Rice','price':250},{'item':'Mixed Fried Rice','price':250}];
	
    // var items=[{'item':'Momo','price':100},{'item':'Chicken','price':100},{'item':'Coffee','price':55},{'item':'Tea','price':30},{'item':'Rice','price':250},{'item':'Chowmein','price':100}];
   var targetids= event.target.id.split('-');
   var targetid =targetids[1];
   console.log(targetid);

   if(event.which !== 16)
   {
   	$('#itemlist-'+targetid).text('');
    for(i=0;i<items.length;i++)
    {  
    var a=$('#itemname-'+targetid).val();
    console.log(a);
    var b = a.toUpperCase();
    var c=  a.toLowerCase();
    console.log(b);
    console.log(c);

    if(a!=='')
    {
    if(items[i]['item'].indexOf(a)!== -1 || items[i]['item'].indexOf(b)!== -1 || items[i]['item'].indexOf(c)!== -1 )
    {
    console.log(items[i]['item']);
    $('#itemlist-'+targetid).show();
    if($('#itemlist-'+targetid).hasClass('d-none'))
    {
   $('#itemlist-'+targetid).removeClass('d-none');
	}
   $('#itemlist-'+targetid).append(`<li class="list-group-item" id=${i} onclick="javascript:addprice(event,${targetid});" style='font-size:15px; color:black; margin-top:0px; height:30px; padding-top:5px; outline:1px solid black; width:260px;'><a >${items[i]['item']}</a></li>`);
    }
   

	}
}
}
	}

	$("[id^=itemname]").on('keyup',function(event)
	{

	// var a=String.fromCharCode(event.which);
	console.log(event.which);

	    var items=[{'item':'Black Tea','price':20},{'item':'Lemon Tea','price':25},{'item':'Milk Tea','price':30},{'item':'Black Coffee','price':'35'},{'item':'Milk Coffee','price':60},{'item':'Hot lemon with Honey','price':90},{'item':'Cold Coffee','price':110},{'item':'Sweet Lassi','price':120},{'item':'Banana Lassi','price':160},{'item':'Mango Lassi','price':150},{'item':'Mixed Food Lassi','price':180},{'item':'Cold Drinks','price':50},{'item':'Fresh Lime Soda','price':60},{'item':'Mineral Water','price':30},{'item':'Red Bull Big','price':300},{'item':'Red Bull Small' , 'price':160},{'item':'Banana Milk Shake', 'price':140},{'item':'Mango Milk Shake' , 'price':150},{'item':'Apple Milk Shake', 'price':150},{'item':'Pouch Egg' , 'price':70},{'item':'Boiled Egg 2PC', 'price':60},{'item':'Masala Omelete' , 'price':80},{'item':'Puri Tarkaari' , 'price':100},{'item':'Veg Soup', 'price':110},{'item':'Mushroom Soup', 'price':140},{'item':'Chicken Soup','price':150},{'item':'Mutton Soup' , 'price':160},{'item':'Hot and Sour Veg Soup','price':120},{'item':'Hot and Sour Chicken SOup','price':160},{'item':'Cream of Tomato Soup','price':120},{
	    	'item':'Manchow Soup Veg','price':110},{'item':'Manchow Soup Chicken','price':170},{'item':'Veg Sizzler' , 'price':210},{'item':'Chicken Sizzler' , 'price':340},{'item':'Fish Sizzler' , 'price':390},{'item':'Nepali Salad' , 'price':120},{'item':'Green Salad' , 'price':110},{'item':'Russian Salad' , 'price':240},{'item':'Chicken Salad' , 'price':220},{'item':'Veg Fry Rice','price':160},{'item':'Chicken Fry Rice' , 'price':250},{'item':'Egg Fried Rice','price':250},{'item':'Mixed Fried Rice','price':250}];
	
    // var items=[{'item':'Momo','price':100},{'item':'Chicken','price':100},{'item':'Coffee','price':55},{'item':'Tea','price':30},{'item':'Rice','price':250},{'item':'Chowmein','price':100}];
   var targetids= event.target.id.split('-');
   var targetid =targetids[1];
   console.log(targetid);

   if(event.which !== 16)
   {
   	$('#itemlist-'+targetid).text('');
    for(i=0;i<items.length;i++)
    {  
    var a=$('#itemname-'+targetid).val();
    console.log(a);
    var b = a.toUpperCase();
    var c=  a.toLowerCase();
    console.log(b);
    console.log(c);

    if(a!=='')
    {
    if(items[i]['item'].indexOf(a)!== -1 || items[i]['item'].indexOf(b)!== -1 || items[i]['item'].indexOf(c)!== -1 )
    {
    console.log(items[i]['item']);
    $('#itemlist-'+targetid).show();
    if($('#itemlist-'+targetid).hasClass('d-none'))
    {
   $('#itemlist-'+targetid).removeClass('d-none');
	}
   $('#itemlist-'+targetid).append(`<li class="list-group-item" id=${i} onclick="javascript:addprice(event,${targetid});" style='font-size:15px; color:black; margin-top:0px; height:30px; padding-top:5px; outline:1px solid black; width:260px;'><a >${items[i]['item']}</a></li>`);
    }
   

	}
}
}
	})

const addprice = (event,id) =>{

	    var items=[{'item':'Black Tea','price':20},{'item':'Lemon Tea','price':25},{'item':'Milk Tea','price':30},{'item':'Black Coffee','price':'35'},{'item':'Milk Coffee','price':60},{'item':'Hot lemon with Honey','price':90},{'item':'Cold Coffee','price':110},{'item':'Sweet Lassi','price':120},{'item':'Banana Lassi','price':160},{'item':'Mango Lassi','price':150},{'item':'Mixed Food Lassi','price':180},{'item':'Cold Drinks','price':50},{'item':'Fresh Lime Soda','price':60},{'item':'Mineral Water','price':30},{'item':'Red Bull Big','price':300},{'item':'Red Bull Small' , 'price':160},{'item':'Banana Milk Shake', 'price':140},{'item':'Mango Milk Shake' , 'price':150},{'item':'Apple Milk Shake', 'price':150},{'item':'Pouch Egg' , 'price':70},{'item':'Boiled Egg 2PC', 'price':60},{'item':'Masala Omelete' , 'price':80},{'item':'Puri Tarkaari' , 'price':100},{'item':'Veg Soup', 'price':110},{'item':'Mushroom Soup', 'price':140},{'item':'Chicken Soup','price':150},{'item':'Mutton Soup' , 'price':160},{'item':'Hot and Sour Veg Soup','price':120},{'item':'Hot and Sour Chicken SOup','price':160},{'item':'Cream of Tomato Soup','price':120},{
	    	'item':'Manchow Soup Veg','price':110},{'item':'Manchow Soup Chicken','price':170},{'item':'Veg Sizzler' , 'price':210},{'item':'Chicken Sizzler' , 'price':340},{'item':'Fish Sizzler' , 'price':390},{'item':'Nepali Salad' , 'price':120},{'item':'Green Salad' , 'price':110},{'item':'Russian Salad' , 'price':240},{'item':'Chicken Salad' , 'price':220},{'item':'Veg Fry Rice','price':160},{'item':'Chicken Fry Rice' , 'price':250},{'item':'Egg Fried Rice','price':250},{'item':'Mixed Fried Rice','price':250}];
	    console.log(event.target.textContent);

	    var itemselected=event.target.textContent;
	    $("#itemlist-"+id).hide();
	    $("#itemname-"+id).val(`${itemselected}`);
	    for(var i in items)
	    {
	    	if(items[i]['item']===itemselected)
	    	{
	    		$("#itemsprice-"+id).val(`${items[i]['price']}`);
	    	}
	    }
}


$('.billtableform').on('keydown', 'input', function(e) {

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
            	$('#billsubmit').click();
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
           $('#billsubmit').click();
            	

        }
        return false;
    }
});

$('.billtableform').on('submit',function(e)
{
	// alert("INserted");
	e.preventDefault();

	var billformObj=[];
	var itemname = $("[id^=itemname");
	var itemsquantity= $("[id^=itemsquantity");
	var unit= $("[id^=unit");
	var price= $('[id^=itemsprice');
	var amount=$('[id^=amount');
	for(i=0;i<itemname.length;i++)
	{
	if($(itemname).eq(i).val()!=='' && $(itemsquantity).eq(i).val()!=='' && $(unit).eq(i).val()!==''&& $(price).eq(i).val()!=='' && $(amount).eq(i).val()!=='')
	{
	console.log("NOt");
}
else
{
	return false;
}
}
for(i=0;i<itemname.length;i++)
	{
		billformObj.push([$(itemname).eq(i).val(),$(itemsquantity).eq(i).val(),$(unit).eq(i).val(),$(price).eq(i).val(),$(amount).eq(i).val(),$('.billno').text()]);
		var billdetailstable=[[$('.billno').text(),$('#customername').val(),$('#rthno').val(),$('#type').val(),$('#totalamount').val(),$('#servicechargeamount').val(),$('#taxableamount').val(),$('#discountamount').val(),$('#taxamount').val(),$('#grandtotalamount').val()]]
	}
$.ajax({
	type:'post',
	url:'billsubmit',
	data:{billformObj:billformObj,billdetailstable:billdetailstable},
	success:function(data){
		console.log(data.result);
		console.log("Submitted");
		window.print();
		$('#resetbillform').click();

		// $(".billprint").printArea({ mode: 'popup', popClose: true });

	}

});
	
	



console.log(billformObj);
	var inputs = $('.billtableform').serializeArray();
	   $.each(inputs, function (i, input) {
	   	console.log(i);
	 
    });

console.log(billformObj);
})



// $('[id$=amount]').on('change',function(e))
// {}