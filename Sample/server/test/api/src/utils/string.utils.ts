export class StringUtils {
  static getBytes(str: string) {
    let b = 0,
      i = 0,
      c: number;

    for (b = i = 0; (c = str.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);

    return b;
  }

  static centerMasking(str: string, replaceStr = '*') {
    if (str.length < 2) {
      return str;
    } else if (str.length === 2) {
      return str.replace(/.$/, replaceStr);
    } else {
      return str
        .split('')
        .map((_str, i) => (i === 0 || i === str.length - 1 ? _str : replaceStr))
        .join('');
    }
  }

  static lastMasking(str: string, replaceStr = '*') {
    if (str.length < 2) {
      return str;
    } else if (str.length === 2) {
      return str.replace(/.$/, replaceStr);
    } else {
      return str
        .split('')
        .map((_str, i) => (i < Math.floor(str.length / 2) ? _str : replaceStr))
        .join('');
    }
  }

  static emailMasking(email: string, replaceStr = '*') {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      const [id, ...addr] = email.split('@');
      const maskingId = this.lastMasking(id, replaceStr);
      return [maskingId, '@', ...addr].join('');
    } else {
      return email;
    }
  }
}
