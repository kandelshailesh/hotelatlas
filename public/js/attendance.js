var now = new Date();

now.setTime(now.getTime() + 24 * 3600 * 1000);

document.cookie="name=" + now;
document.cookie = "expires=" + now.toUTCString() + ";"
document.write ("Setting Cookies : " + "name=" + cookievalue );


$('#cookie_date').val(document.cookie.name);