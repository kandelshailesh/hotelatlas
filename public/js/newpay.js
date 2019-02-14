Cookies.set('name', 'Shailesh', { expires: 1 });
console.log(Cookies.get('name'));
// Cookies.remove('paymentno');


$("#report").click(function() {
    $(".reportlist").toggle();
});
console.log(Cookies.get('paymentno'));
var paymentno = Cookies.get('paymentno');
$(".paymentno").text(paymentno);
var liSelected;
// $(window).keydown(function(e) {
//         var li = $('li#accounttype');
//         var targetid= e.target.id.split('-')[1];
//         // console.log(li); 
//         console.log(e.which);

//         if (e.which === 40) {
//             console.log("Succeed on down arrow");
//             if (liSelected) {
//                 liSelected.removeClass('selected');
//                 next = liSelected.next();
//                 if (next.length > 0) {
//                     liSelected = next.addClass('selected');
//                     $(`#accounttype-${targetid}`).val($('li.selected').text())
//                     console.log($('li.selected').text());

//                 } else {
//                     liSelected = li.eq(0).addClass('selected');
//                     $(`#accounttype-${targetid}`).val($('li.selected').text())

//                 }
//             } else {
//                 liSelected = li.eq(0).addClass('selected');
//                     $(`#accounttype-${targetid}`).val($('li.selected').text())

//             }
//         } else if (e.which === 38) {
//             if (liSelected) {
//                 liSelected.removeClass('selected');
//                 next = liSelected.prev();
//                 if (next.length > 0) {
//                     liSelected = next.addClass('selected');
//                     $(`#accounttype-${targetid}`).val($('li.selected').text())

//                 } else {
//                     liSelected = li.last().addClass('selected');

//                     $(`#accounttype-${targetid}`).val($('li.selected').text())
//                 }
//             } else {
//                 liSelected = li.last().addClass('selected');
//                     $(`#accounttype-${targetid}`).val($('li.selected').text())

//             }
//         }  else if (e.which === 13) {
//           console.log("pressed enter");
//            $("#accounttype").remove();
//         }
//         else if (e.which === 27) {
//             $("#syrInputForm").val('');
//             $("#suggest-results").html('&nbsp;');
//             return false;
//         }
//     });
// <ul class="list-group" style="list-style-type:none;  outline:1px solid green; left:-1px;  max-height:150px; position:absolute; z-index:99; overflow:auto; padding:0px; margin:0px;" id="accountlist-${i}" class="d-none" disabled></ul>
for (var i = 1; i < 20; i++) {

    $('.paymenttable').append(`<tr  class=" m-0 row text-center">
      <td id="sn" class="col-md-1  ">${i}</td>
      <td   class="col-md-1 p-0"><input class="form-control" name="dctype" id="dctype-${i}" type="text" maxlength="1" oninput="javascript:oninputdctype(event);" />

      <td  class="col-md-3 p-0"><input  name="accounttype-${i}" id="accounttype-${i}" type="text" class="form-control text-center" disabled /><div style= "max-height:150px; margin:auto; overflow-y:scroll; position:relative; z-index:99; width:100% !important;"><ul class="list-group" style="max-height:150px; width:100%;" id="accountlist-${i}" class="d-none" disabled></ul></div></td>
      <td  class="col-md-2 p-0"><input oninput="javascript:checktotaldc(event);" name="debit" id="debit-${i}"  type="number" min="0" class="form-control" disabled /></td>
      <td   class="col-md-2 p-0"><input oninput="javascript:checktotaldc(event);" name="credit" id="credit-${i}"  type="number" min="0" class="form-control" disabled/></td>
      <td   class="col-md-3 p-0"><input name="narration" id="narration-${i}" type="text" class="form-control text-center" disabled   /></td>
    </tr>`)
}

function checktotaldc(event) {
    // event.preventDefault();
    var credittag = $("[id^=credit]");
    var debitamount = 0;
    var creditamount = 0;
    var debittag = $("[id^=debit]");
    for (var i = 0; i < credittag.length; i++) {
        if (credittag[i].value !== '') {
            console.log(credittag[i].value);
            // debittag[i].value == 0;
            var subcredit = parseInt(credittag[i].value);
            creditamount = creditamount + subcredit;
            console.log(creditamount);

        }
    }

    for (var i = 0; i < debittag.length; i++) {
        if (debittag[i].value !== '') {
            console.log(debittag[i].value);
            // debittag[i].value == 0;
            var subdebit = parseInt(debittag[i].value);
            debitamount = debitamount + subdebit;
            console.log(debitamount);
        }
    }
    $("#totalcredit").text('Rs ' + creditamount);
    $("#totaldebit").text('Rs ' + debitamount);

}

function oninputdctype(event) {
    var targetid = event.target.id.split('-')[1];
    if (event.target.value != 'c' || event.target.value != 'd') {
        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#accounttype-" + targetid).attr('disabled', 'disabled');
        $("#credit-" + targetid).attr('disabled', 'disabled');
        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#narration-" + targetid).attr('disabled', 'disabled');
    }
    event.target.value = event.target.value.replace(/[^cd]/, '');
    // targetid=event.target.id.split('-')[1];


    console.log(targetid);
    if (targetid !== 1 && (event.target.value === 'c' || event.target.value === 'd')) {
        var checkprevious = $(`#dctype-${targetid-1}`).val();
        console.log(checkprevious);
        if (checkprevious === 'c') {

            if ($(`#accounttype-${targetid-1}`).val() === '') {
                console.log('error');
                $(`#accounttype-${targetid-1}`).addClass('border-danger');
            } else {
                if ($(`#accounttype-${targetid-1}`).hasClass('border-danger')) {
                    $(`#accounttype-${targetid-1}`).removeClass('border-danger');
                }

            }
            if ($(`#credit-${targetid-1}`).val() === '') {
                $(`#credit-${targetid-1}`).addClass('border-danger');
                checktotaldc('event');

            } else {
                if ($(`#credit-${targetid-1}`).hasClass('border-danger')) {
                    $(`#credit-${targetid-1}`).removeClass('border-danger');
                    checktotaldc('event');

                }
            }
        }
        if (checkprevious === 'd') {


            if ($(`#accounttype-${targetid-1}`).val() === '') {
                console.log('error');
                $(`#accounttype-${targetid-1}`).addClass('border-danger');
            } else {
                if ($(`#accounttype-${targetid-1}`).hasClass('border-danger')) {
                    $(`#accounttype-${targetid-1}`).removeClass('border-danger');
                }

            }
            if ($(`#debit-${targetid-1}`).val() === '') {
                $(`#debit-${targetid-1}`).addClass('border-danger');
                checktotaldc('event');

            } else {
                if ($(`#debit-${targetid-1}`).hasClass('border-danger')) {
                    $(`#debit-${targetid-1}`).removeClass('border-danger');
                    checktotaldc('event');

                }
            }
        }
    }


    if (event.target.value === 'c') {


        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#accounttype-" + targetid).removeAttr('disabled', 'disabled');
        $("#debit-" + targetid).val('');
        checktotaldc('event');

        $("#credit-" + targetid).removeAttr('disabled', 'disabled');
        // $("#debit-"+targetid).addClass('bg-white');
        $("#narration-" + targetid).removeAttr('disabled', 'disabled');
    }


    if (event.target.value === 'd') {
        if (targetid !== 1) {
            $("#accounttype-" + targetid).removeAttr('disabled', 'disabled');
            $("#narration-" + targetid).removeAttr('disabled', 'disabled');
            checktotaldc('event');

            $("#debit-" + targetid).removeAttr('disabled', 'disabled');
            $("#credit-" + targetid).attr('disabled', 'disabled');
            $("#credit-" + targetid).val('');

            // $("#credit-"+targetid).addClass('bg-white');
        }
    }
}

function createpopup(event) {
    event.preventDefault();
    $("#master").addClass('bg-dark');


}

function keypresshandler(event) {
    event.preventDefault();
    var charCode = event.keyCode;
    // var targetid = event.target.id.split('-');
    // var targetid= targetid[1];
    // console.log(targetid);
    console.log(charCode);
    //Non-numeric character range
    if (charCode === 47 || charCode === 48)
        //   {
        //    if(charCode===47)
        //    {
        //      $("#credit-"+targetid).attr('disabled','disabled');
        //    }
        //    if(charCode===48)
        //    {
        //      $("#credit-"+targetid).attr('disabled','disabled');

        //    }

        // }
        return false;
}

function paymentform() {
    $("#transactiontitle").text('Payment');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }

}

function receiptform() {
    $("#transactiontitle").text('Receipt');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }


}

function journalform(event) {
    $("#transactiontitle").text('Journal');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }



}

function contraform(event) {
    $("#transactiontitle").text('Contra');
    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
    }
}


function salesform(event) {
    $("#transactiontitle1").text('Sales');
    if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').addClass('d-none');
    }
    if ($(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").removeClass('d-none');
    }

}

function purchaseform(event) {
    $("#transactiontitle1").text('Purchase');
    if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').addClass('d-none');
    }
    if ($(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").removeClass('d-none');
    }
}


function submitdata(event) {
    event.preventDefault();
    var paymentform = $("#paymenttranscation").serializeArray();
    console.log($("#paymenttranscation").serializeArray());
    var o = [];
    var op = [];
    //  $.each(paymentform, function() {
    //        if (o[this.name]) {
    //            if (!o[this.name].push) {
    //                o[this.name] = [o[this.name]];
    //            }
    //            o[this.name].push(this.value || '');
    //        } else {
    //            o[this.name] = this.value || '';
    //        }
    //    }); 
    // console.log(o);
    var count = 0;
    var paymentlength = $("[id^=accounttype]:enabled").length;
    console.log(paymentlength);

    for (i = 0; i < paymentlength * 4; i = i + 4) {
        console.log("Paymentform" + paymentform[i]);
        if ((paymentform[i]['value'] == 'c' && paymentform[i + 2]['value'] !== '') && paymentform[i + 1]['value'] !== "") {
            console.log([paymentform[i]['value'], paymentform[i + 1]['value'], paymentform[i + 2]['value'], paymentform[i + 3]['value'], $("#transactiontitle").text(), parseInt($("#transactionid").text()) + 1]);
            op.push([paymentform[i]['value'], paymentform[i + 1]['value'], paymentform[i + 2]['value'], paymentform[i + 3]['value'], $("#transactiontitle").text(), parseInt($("#transactionid").text()) + 1]);
            // op[count]={"dctype":paymentform[i]['value'],"accounttype":paymentform[i+1]['value'],"dcamount":paymentform[i+3]['value'],"narration":paymentform[i+4]['value']};
            count++;
        }
        if ((paymentform[i]['value'] == 'd' && paymentform[i + 2]['value'] !== '') && paymentform[i + 1]['value'] !== "") {
            console.log([paymentform[i]['value'], paymentform[i + 1]['value'], paymentform[i + 2]['value'], paymentform[i + 3]['value'], parseInt($("#transactionid").text()) + 1]);
            op.push([paymentform[i]['value'], paymentform[i + 1]['value'], paymentform[i + 2]['value'], paymentform[i + 3]['value'], $("#transactiontitle").text(), parseInt($("#transactionid").text()) + 1]);
            // op[count]={"dctype":paymentform[i]['value'],"accounttype":paymentform[i+1]['value'],"dcamount":paymentform[i+2]['value'],"narration":paymentform[i+4]['value']};
            count++;
        }

    }
    // op.push($("#transactiontitle").text());
    console.log(op);
    if (($("#totalcredit").text() == $("#totaldebit").text()) && ($("[id^=accounttype]:enabled").length > 1)) {
        $.ajax({
            type: 'post',
            url: 'paymentsubmit',
            data: { op },
            error: function(data) {
                // var data=JSON.parse(data);
                console.log(data.result);
            },
            success: function(data) {
                console.log(data);
                var transactiontitle = $("#transactiontitle").text();
                if (transactiontitle === 'Sales') {
                    if (Cookies.get('salesno') == undefined) {
                        Cookies.set('salesno', 0, { expires: 1 });
                    } else {
                        var paymentnovalue = parseInt(Cookies.get('salesno')) + 1;
                        Cookies.set('salesno', paymentnovalue, { expires: 1 });
                    }
                } else if (transactiontitle === 'Payment') {
                    if (Cookies.get('paymentno') == undefined) {
                        Cookies.set('paymentno', 0, { expires: 1 });
                    } else {
                        var paymentnovalue = parseInt(Cookies.get('paymentno')) + 1;
                        Cookies.set('paymentno', paymentnovalue, { expires: 1 });
                    }
                } else if (transactiontitle === 'Contra') {
                    if (Cookies.get('contrano') == undefined) {
                        Cookies.set('contrano', 0, { expires: 1 });
                    } else {
                        var paymentnovalue = parseInt(Cookies.get('contrano')) + 1;
                        Cookies.set('contrano', paymentnovalue, { expires: 1 });
                    }

                }

                // console.log(Cookies.get('paymentno'));
                console.log(data);
                console.log(data.transactionno);
                $("#transactionid").text(data.transactionno);
                $('.resetpayment').click();
                // $('.paymenttable').not([id^=dctype]).attr('disabled','disabled');
                $('.paymenttable td input').attr('disabled', 'disabled');
                $("[id^=dctype]").removeAttr('disabled', 'disabled');

                var paymentno = Cookies.get('paymentno');
                $(".paymentno").text(paymentno);
            }

        });
    }

    // var a= JSON.stringify(paymentform);
    // console.log(a);
}

$("[id^=accounttype]").on('keyup', function(event) {
    var value = event.target.value;
    var targetid = event.target.id.split('-')[1];
    console.log(targetid);
    var a = event.target.value;
    // $("#accountlist-"+targetid).text('');

    console.log(a);
    // var list=$("li#accounttype")?0:$("li#accounttype").length; 
    // console.log("list is"+ list);
    // $("#accountlist-1").html('');
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
        // $('#accountlist-1').show();
        $.ajax({
            type: 'post',
            url: 'accountreturn',
            data: { a },
            success: function(data) {
                // $("#accountlist-1").text('');
                // $("#accountlist-"+targetid).text('');
                $("#accountlist-" + targetid).text('');

                console.log(data.result);
                console.log(data.result.length);
                if(data.result.length>0)
                {
                for (var i = 0; i < data.result.length; i++) {

                    // console.log(data.result[i]['accountname']
                    $("#accountlist-" + targetid).removeClass('d-none');

                    // $("#accountlist-"+targetid).append(`<li style="width:200px; height:25px; border:1px solid black;" onclick="javascript:selectaccount(event);" id="accounttype">${data.result[i]['accountname']}</li>`);
                    $("#accountlist-" + targetid).append(`<li class="list-group-item" style="width:100% !important; " onclick="javascript:selectaccount(event);" id="accounttype">${data.result[i]['accountname']}</li>`);
             
                }
              }
              else
              {
                // alert("Spelling error");
                event.target.value=event.target.value.slice(0,-1);
                a=event.target.value;
                 $.ajax({
            type: 'post',
            url: 'accountreturn',
            data: {a},
            success: function(data) {
                // $("#accountlist-1").text('');
                // $("#accountlist-"+targetid).text('');
        $("#accountlist-" + targetid).text('');


                console.log(data.result);
                console.log(data.result.length);
                for (var i = 0; i < data.result.length; i++) 
                {
                    // console.log(data.result[i]['accountname']
                    $("#accountlist-" + targetid).removeClass('d-none');

                    // $("#accountlist-"+targetid).append(`<li class="list-group-item" style="width:200px; height:25px; border:1px solid black;" onclick="javascript:selectaccount(event);" id="accounttype">${data.result[i]['accountname']}</li>`);
                    $("#accountlist-" + targetid).append(`<li class="list-group-item" style="width:100% !important; " onclick="javascript:selectaccount(event);" id="accounttype">${data.result[i]['accountname']}</li>`);
                }
                
            }




        });



              }
            }




        });
    } else if (event.keyCode < 36 || event.keyCode > 41) {
        // $("#accountlist-" + targetid).text('');
        $.ajax({
            type: 'post',
            url: 'accountreturn',
            data: { a },
            success: function(data) {
                // $("#accountlist-1").text('');
                // $("#accountlist-"+targetid).text('');
        $("#accountlist-" + targetid).text('');


                console.log(data.result);
                console.log(data.result.length);
                for (var i = 0; i < data.result.length; i++) {

                    // console.log(data.result[i]['accountname']
                    $("#accountlist-" + targetid).removeClass('d-none');

                    // $("#accountlist-"+targetid).append(`<li class="list-group-item" style="width:200px; height:25px; border:1px solid black;" onclick="javascript:selectaccount(event);" id="accounttype">${data.result[i]['accountname']}</li>`);
                    $("#accountlist-" + targetid).append(`<li class="list-group-item" style="width:100% !important; " onclick="javascript:selectaccount(event);" id="accounttype">${data.result[i]['accountname']}</li>`);
                }
            }




        });

    }


    console.log(a);
    var targetid = event.target.id.split('-')[1];
    length = value.length;
    if (length > 0) {
        if ($(`#accounttype-${targetid}`).hasClass('border-danger')) {
            $(`#accounttype-${targetid}`).removeClass('border-danger')
        }
        checktotaldc('event');
    }
});
$("[id^=credit]").on('keyup', function(event) {
    var value = event.target.value;
    var targetid = event.target.id.split('-')[1];
    // length= value.length;
    if (value > 0) {
        if ($(`#credit-${targetid}`).hasClass('border-danger')) {
            $(`#credit-${targetid}`).removeClass('border-danger')
            checktotaldc('event');

        }
    } else {
        if (!$(`#credit-${targetid}`).hasClass('border-danger')) {
            $(`#credit-${targetid}`).addClass('border-danger');
            checktotaldc('event');

        }
    }
});

function selectaccount(event) {
    console.log("Clicked list");
    console.log(event.which);
    console.log($('li.selected').text());
    $('#accounttype-1').val($('li.selected').text());
    $("#accountlist-1").text('');

}
$("[id^=debit]").on('keyup', function(event) {
    var value = event.target.value;
    var targetid = event.target.id.split('-')[1];
    // length= value.length;
    if (value > 0) {
        if ($(`#debit-${targetid}`).hasClass('border-danger')) {
            $(`#debit-${targetid}`).removeClass('border-danger')
        }
        checktotaldc('event');

    } else {
        if (!$(`#debit-${targetid}`).hasClass('border-danger')) {
            $(`#debit-${targetid}`).addClass('border-danger');
            checktotaldc('event');

        }
    }

})

var gc = $.calendars.instance('nepali', 'ne');
var currentdate = gc.newDate();
var currenttime = new Date();
var currenttime = currenttime.toLocaleTimeString();

$('.dates').append(`<input  id='datemodify' class='ml-1 border-0 d-inline' value=${currentdate}>`);
$('.times').append("<h6 class='timeupdate ml-1 d-inline'>" + currenttime + "</h6>");
$('#datemodify').calendarsPicker({ calendar: $.calendars.instance('nepali') });

$("[id^=items]").on('keyup', function(event) {
    var ids = event.target.id.split('-');
    var id = ids[1];
    // console.log(id);
    var quantity = $('#itemsquantity-' + id).val();
    var price = $('#itemsprice-' + id).val();
    var totalamount = parseInt(quantity) * parseInt(price);
    $('#amount-' + id).val(totalamount);
    var amountlist = $("[id^=amount]");
    console.log(amountlist[0].value);
    var total = 0;
    var j;
    for (var i = 0; i < amountlist.length; i++) {
        console.log(j);
        var subtotal;
        subtotal = amountlist[i].value;
        console.log(subtotal);
        total = parseInt(total) + parseInt(subtotal);
        console.log(total);

    }
    $("#totalamount").text(total);
});
$("[id^=itemname]").on('keyup', function(event) {

    // var a=String.fromCharCode(event.which);
    console.log(event.which);

    var items = [{ 'item': 'Momo', 'price': 100 }, { 'item': 'Chicken', 'price': 100 }, { 'item': 'Coffee', 'price': 55 }, { 'item': 'Tea', 'price': 30 }, { 'item': 'Rice', 'price': 250 }, { 'item': 'Chowmein', 'price': 100 }];
    var targetids = event.target.id.split('-');
    var targetid = targetids[1];
    console.log(targetid);

    if (event.which !== 16) {
        $('#itemlist-' + targetid).text('');
        for (i = 0; i < items.length; i++) {
            var a = $('#itemname-' + targetid).val();
            console.log(a);
            var b = a.toUpperCase();
            var c = a.toLowerCase();
            console.log(b);
            console.log(c);
            if (a !== '') {
                if (items[i]['item'].indexOf(a) !== -1 || items[i]['item'].indexOf(b) !== -1 || items[i]['item'].indexOf(c) !== -1) {
                    console.log(items[i]['item']);
                    $('#itemlist-' + targetid).show();
                    if ($('#itemlist-' + targetid).hasClass('d-none')) {
                        $('#itemlist-' + targetid).removeClass('d-none');
                    }
                    $('#itemlist-' + targetid).append(`<p id=${i} onclick="javascript:addprice(event,${targetid});" style='font-size:12px; color:blue; margin-top:0px; height:25px; padding-top:5px; width:310px;'>${items[i]['item']}</p><hr style="margin-top:-5px; margin-bottom:0px; background-color:green;" size="5" />`);
                }


            }
        }
    }
})

const addprice = (event, id) => {
    var items = [{ 'item': 'Momo', 'price': 100 }, { 'item': 'Chicken', 'price': 100 }, { 'item': 'Coffee', 'price': 55 }, { 'item': 'Tea', 'price': 30 }, { 'item': 'Rice', 'price': 250 }, { 'item': 'Chowmein', 'price': 100 }];
    console.log(event.target.textContent);

    var itemselected = event.target.textContent;
    $("#itemlist-" + id).hide();
    $("#itemname-" + id).val(`${itemselected}`);
    for (var i in items) {
        if (items[i]['item'] === itemselected) {
            $("#itemsprice-" + id).val(`${items[i]['price']}`);
        }
    }

}

function submitaccount(event) {
    // event.preventDefault();
    var accountdata = $(".accountinformations").serializeArray();
    console.log(accountdata);
    var accountdataarray = [];
    var previousyeardate = $("#previousyear").val().split('-');
    var converteddate = '';
    for (var i = 0; i < 3; i++) {
        if (i < 2) {
            // console.log(calendarFunctions.getNumberByNepaliNumber("१२५"));
            converteddate = converteddate + calendarFunctions.getNumberByNepaliNumber(previousyeardate[i]) + '-';
        } else {
            converteddate = converteddate + calendarFunctions.getNumberByNepaliNumber(previousyeardate[i]);
        }
        console.log(converteddate);

    }
    for (i = 0; i < accountdata.length; i++) {
        if (accountdata[i]['value'] === "") {
            accountdata[i]['value'] = 0;
            console.log(accountdata[i]);
        }
        if (accountdata[i]['name'] == 'previousyear') {
            accountdata[i]['value'] = converteddate;
            console.log(accountdata[i]);
        }
        accountdataarray.push(accountdata[i].value);
    }

    console.log(accountdata);
    console.log(accountdataarray);
    $.ajax({
        type: 'post',
        url: 'accountsubmit',
        dataType: 'application/json',
        data: { accountdataarray },
        success: function(data) {
            console.log(data);
        }
    })


}

function handle(el) {
    $('ul').scrollTop(60);
    $('ul').animate({ scrollTop: el.position().top });
}

function accountselect()
{
// $("[id^=accounttype]").on('input',function(e) {
   var li = $('li#accounttype');
   var text=event.target.value;
 for (var i = 0; i < li.length; i++) {
        console.log(li[i]);
        var litext = li[i].textContent;
        console.log(litext);
        if (litext.indexOf(text) !== -1) {
          console.log("Inserted");
           
            if (!$(`li:eq(${i})`).hasClass('selected')) {
                $(`li#accounttype:eq(${i})`).addClass('selected');
                 $(`li#accounttype:eq(${i})`).css('background-color', 'blue');
            }


        } else {
           if ($(`li:eq(${i})`).hasClass('selected')) {
            $(`li#accounttype:eq(${i})`).removeClass('selected');

            $(`li#accounttype:eq(${i})`).css('background-color', 'white');
}
        }

    }

    handle($('li#accountype.selected'));
    if ($('li#accounttype.selected').length < 1) {
        alert("Spelling error");

    }
  // });
}
$("[id^=accounttype]").keyup(function(e) {
    var li = $('li#accounttype');
    var targetid = e.target.id.split('-')[1];
    console.log(li);
    console.log(e.which);
    console.log(targetid);
    var text = event.target.value;
    console.log(text);   
    if (e.which === 40) {
        console.log("Succeed on down arrow");
        if (liSelected) {
            liSelected.removeClass('selected');
            next = liSelected.next();
            if (next.length > 0) {
                liSelected = next.addClass('selected');
                $(`#accounttype-${targetid}`).val($('li.selected').text())
                console.log($('li.selected').text());

            } else {
                liSelected = li.eq(0).addClass('selected');
                $(`#accounttype-${targetid}`).val($('li.selected').text())

            }
        } else {
            liSelected = li.eq(0).addClass('selected');
            $(`#accounttype-${targetid}`).val($('li.selected').text())

        }
    } else if (e.which === 38) {
        if (liSelected) {
            liSelected.removeClass('selected');
            next = liSelected.prev();
            if (next.length > 0) {
                liSelected = next.addClass('selected');
                $(`#accounttype-${targetid}`).val($('li.selected').text())

            } else {
                liSelected = li.last().addClass('selected');

                $(`#accounttype-${targetid}`).val($('li.selected').text())
            }
        } else {
            liSelected = li.last().addClass('selected');
            $(`#accounttype-${targetid}`).val($('li.selected').text())

        }
    } else if (e.which === 13) {
        console.log("pressed enter");
        // $("#credit-"+targetid).focus();
        // $("#debit-"+targetid).focus();
        // $(`#accounttype-${targetid}`).val($('li#accounttype.selected:nth-child(1)'.text()));
        $('#accountlist-' + targetid).html('');




    }
    // else if (e.which === 27) {
    //     $("#syrInputForm").val('');
    //     $("#suggest-results").html('&nbsp;');
    //     return false;
    // }
});
// $('input').keydown( function(e) {
//         var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
//         if(key == 13) {
//             e.preventDefault();
//             var inputs = $(this).closest('form').find(':input:visible');
//             inputs.eq( inputs.index(this)+1).focus();
//         }
//     });
$('#paymenttranscation').on('keydown', 'input', function(e) {
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;
    console.log("PRessed n");
    if (e.shiftKey) {
        if (e.keyCode == 13) {
            e.preventDefault();
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
        e.preventDefault();
        $('[id^=accountlist]').html('');

        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
});

$('.accountinformations').on('keydown', 'input', function(e) {
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {
            e.preventDefault();
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
        e.preventDefault();
        // $('[id^=accountlist]').html('');

        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
});

$('#newaccount').on('click', function(e) {
    e.preventDefault();

});
// $('#hello').on('click', function(e) {
//   e.preventDefault();
//   console.log("Modal opened");
//     console.log($('.accountinformations').find('input')[0]);

//     $('.accountinformations').find('input')[0].css('border','1px');

//   // $('#textareaID1').focus();
// });
// $('.accountinformations').on('keydown', 'input', function(e) {

// var self = $(this)
//   , form = self.parents('form:eq(0)')
//   , focusable
//   , next
//   , prev
//   ;

// if (e.shiftKey) {
//  if (e.keyCode == 13) {
//   e.preventDefault();
//      focusable =   form.find('input,a,select,button,textarea').filter(':enabled');
//      prev = focusable.eq(focusable.index(this)-1); 

//      if (prev.length) {
//         prev.focus();
//      } else {
//         form.submit();
//     }
//   }
// }
//   else
// if (e.keyCode == 13) {
//   e.preventDefault();
//            // $('[id^=accountlist]').html('');

//     focusable = form.find('input,a,select,button,textarea').filter(':enabled');
//     next = focusable.eq(focusable.index(this)+1);
//     if (next.length) {
//         next.focus();
//     } else {
//         form.submit();
//     }
//     return false;
// }
// });



$('#myModal').on('shown.bs.modal', function() {
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});

// Form control on enter
$('.contraform').on('keydown', 'input', function(e) {

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
});

function submitcontra(event) {
    event.preventDefault();
    var contradata = $('.contraform').serializeArray();
    var contrafinaldata = [];
    for (var i = 0; i < 3; i++) {
        contrafinaldata.push(contradata[i]['value']);
    }
    console.log(contrafinaldata);
    $.ajax({
        type: 'post',
        url: 'submitcontra',
        data: { contrafinaldata },
        success: function(data) {
            console.log("Inserted Successfully");
        }
    });
}

$('#contraentry').on('shown.bs.modal', function(e) {
    e.preventDefault();
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});

function changeaccounttype(event) {
    var value = event.target.value;
    console.log(value);
    if (value > 0 && value < 4) {
        $("#accountnodiv").show();
        $("#accountno").removeAttr('disabled', 'disabled');
    } else {
        $("#accountnodiv").hide();
        $("#accountno").attr('disabled', 'disabled');
    }
}
var currentDate = new Date();
var currentNepaliDate = calendarFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
var formatedNepaliDate = calendarFunctions.bsDateFormat("%y-%m-%d", currentNepaliDate.bsYear, currentNepaliDate.bsMonth, currentNepaliDate.bsDate);



$("#previousyear").nepaliDatePicker({
    dateFormat: "%y-%m-%d",
    closeOnDateSelect: true,
    minDate: "२०७०-१-२०",
    maxDate: formatedNepaliDate
});





$("#clear-bth").on("click", function(event) {


    $(".bod-picker").val('');

});