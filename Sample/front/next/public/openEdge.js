// IE 일 경우
if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
  window.location = "microsoft-edge:" + window.location;

  setTimeout(function () {
    window.location = "https://go.microsoft.com/fwlink/?linkid=2135547";
  }, 100);
}
