import { stringify } from 'query-string';

export class StringUtil {
  static formatMobile(str: string) {
    if (str) {
      str = str.replace(/[^\d]/g, '');
      str = str.substring(0, 11);
      if (str.length < 4) {
        return str;
      } else if (str.length < 8) {
        return str.replace(/(\d{3})(\d*)/i, '$1-$2');
      } else if (str.length === 11) {
        return str.replace(/(\d{3})(\d{4})(\d{1,})/i, '$1-$2-$3');
      } else {
        return str.replace(/(\d{3})(\d{3})(\d{1,})/i, '$1-$2-$3');
      }
    } else {
      return str;
    }
  }

  static getFileNameExt(file: string) {
    const idx = file.lastIndexOf('.');
    if (idx > -1) {
      const ext = file.substring(idx + 1);
      const fileName = file.substring(0, idx);
      return [fileName, ext];
    } else {
      return [file, undefined];
    }
  }

  static queryStringfy(obj: { [key: string]: any }) {
    return stringify(obj);
  }

  static textHighlighting(text: string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts
      .map((part) => (part.toLowerCase() === highlight.toLowerCase() ? `<mark>${part}</mark>` : part))
      .join('');
  }

  static removeHTML(str: string) {
    str = str.replace(/(<([^>]+)>)/gi, '');
    return str;
  }
}
