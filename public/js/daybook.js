$("[id^=month]").on('click',function(e)
{
var month =event.target.id.split('-')[1];
console.log(month);
var monthdata=$('.month');
// if(monthdata=month)
// {
// 	$('month')
// }

var monthlength=0;
for(i=0;i<monthdata.length;i++)
{
if($('.month').eq(i).attr('data-month')==month)
{
	monthlength=monthlength+1;
}
}

console.log(monthlength);
console.log(monthdata.length);
if(monthlength==0)
{
	$('.table-header').hide();
	$('.nodata').show();
}
for(i=0;i<monthdata.length;i++)
{
if($('.month').eq(i).attr('data-month')==month)
{
	$('.table-header').show();

	$('.month').eq(i).show();
	$('.month-total').eq(i).show();
	$('.month-row').eq(i).show();
	$('.nodata').hide();



}
else
{
	$('.month').eq(i).hide();
	$('.month-total').eq(i).hide();
	$('.month-row').eq(i).hide();



}


}


})
