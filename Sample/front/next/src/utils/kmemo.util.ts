export class KmemoUtil {
  static isIe() {
    return /MSIE \d|Trident.*rv:/.test(navigator.userAgent);
  }

  static resizeIframe(frame) {
    const contentHeight = frame.currentTarget.contentWindow.document.body.scrollHeight + 20;
    frame.currentTarget.style.height = contentHeight + 'px';
  }
}
