


function displaydata(value)
{
var titlename=value;
$.ajax({
	url:'/getdetailtitle',
	type:'post',
	data:{titlename:titlename},
	success:function(data)
	{
		console.log(data.result);
		$('div#displayledger').html('');
		$('div.totaldc').html('');

		if ( Array.isArray(data.result) && data.result.length) 
		{
		$('div#displayledger').append(`

			<p>शीर्षक: ${value}</p><table style="width:100%" class="text-center subtitletable ">
			<tr class="row m-0 ">
			<th class="col-md-6">उपशीर्षक</th>
			<th class="col-md-6">रकम</th>
			</tr>`);

		for(i=0;i<data.result.length;i++)
		{
			$('table.subtitletable').append(`<tr class="row m-0" ><td class="col-md-6">${data.result[i].subaccount}</td><td class="col-md-6">${data.result[i].totalamount}</td></tr>`);

		}
		$('table.subtitletable').append(`<tr class="row m-0"><td class="col-md-6">जम्मा</td><td class="col-md-6">${data.total}</td></tr></table></div>`)


		var monthlistreverse={"असार": 3,"असोज": 6,"कार्तिक": 7,"चैत": 12,"जेठ": 2,"पौष": 9,"फागुन": 11,"बैशाख": 1,"भदौ": 5,"मंसिर": 8,"माघ": 10,"साउन": 4}
		

		var monthlist=["साउन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत","बैशाख", "जेठ", "असार"];
		// var monthlist= {"4":"साउन","5":"भदौ","6":"असोज","7":"कार्तिक","8":"मंसिर","9":"पौष","10":"माघ", "11":"फागुन","12":"चैत","1":"बैशाख","2":"जेठ","3":"असार"};
		var appenddata='';
		for(i=0;i<monthlist.length;i++)
		{
			// console.log(count);
		if(i<9)
		{
		appenddata+=`<a style="border:1px solid black; font-size:12px;" onclick="javascript:monthlydata('${monthlistreverse[monthlist[i]]}','${titlename}',${initialdate})"  class="nav-link">${monthlist[i]}</a>`;
		}
		else
		{
				appenddata+=`<a style="border:1px solid black; font-size:12px;" onclick="javascript:monthlydata('${monthlistreverse[monthlist[i]]}','${titlename}',${finaldate})"  class="nav-link">${monthlist[i]}</a>`;
		}
	}
		$('div.totaldc').append(appenddata);


}else{
	$('div#displayledger').append(`<p class="text-center">डाटा उपलब्ध भएन</p>`);	
	}

}
		// $('div#displayledger').append('<p>Hello</p>');

	
})
}

function monthlydata(count,titlename)
{
	$.ajax({
	url:'/getdetailtitlebymonth',
	type:'post',
	data:{titlename:titlename,count:count},
	success:function(data)
	{
		console.log(data.result);
		$('#displayledger').html('');
		// $('table.subtitletable').text('');


		// $('div.totaldc').html('');
		// var monthlist= ["बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"];
		var monthlist= {4:"साउन",5:"भदौ",6:"असोज",7:"कार्तिक",8:"मंसिर",9:"पौष",10:"माघ", 11:"फागुन",12:"चैत",1:"बैशाख",2:"जेठ",3:"असार"};
		if(data.result)
		{
		$('div#displayledger').append(`<p class='d-inline'>शीर्षक: ${titlename}</p> <p class='d-inline ml-4 '> महिना: ${monthlist[count]}</p><table class="text-center mt-2 subtitletable " style="width:100%;">
			<tr class="m-0 row">
			<th class="col-md-6">उपशीर्षक</th>
			<th class="col-md-6">रकम</th>
			</tr>`);
	

		for(i=0;i<data.result.length;i++)
		{
			$('table.subtitletable').append(`<tr class="m-0 row"><td class="col-md-6">${data.result[i].subaccount}</td><td class="col-md-6">${data.result[i].totalamount}</td></tr>`);
		}
		$('table.subtitletable').append(`<tr class="m-0 row"><td class="col-md-6">जम्मा</td><td class="col-md-6">${data.total}</td></tr></table></div>`);
	}
	else
	{
	$('div#displayledger').append(`<p class="text-center">डाटा उपलब्ध भएन</p>`);	
	}
		// var monthlist= ["बैशाख", "जेठ", "असार", "सावन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"];
		// var appenddata='';
		// monthlist.forEach(function(result,count)
		// {
		// 	appenddata+=`<a style="border:1px solid black; font-size:12px;" onclick="javascript:monthlydata(${count+1},${titlename})"  class="nav-link">${result}</a>`;
		// })
		// $('div.totaldc').append(appenddata);


		// $('div#displayledger').append('<p>Hello</p>');

	}
})
}


$('#ledgerinitialdate').calendarsPicker({calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'})
$('#ledgerfinaldate').calendarsPicker({calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'})
