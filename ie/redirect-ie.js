var ua = window.navigator.userAgent;
var isIE = /MSIE|Trident/.test(ua);
if (isIE){
    window.location = "{{ site.baseurl }}/ie/";
}
