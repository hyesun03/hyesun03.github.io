var ua = window.navigator.userAgent;
var isIE = /MSIE|Trident/.test(ua);
if (isIE){
    window.location = "/ie/for-ie.html";
}
