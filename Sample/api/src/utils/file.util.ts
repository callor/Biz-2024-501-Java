export class FileUtil {
  static getFileType(ext: string) {
    if (/(jp(e|)g|png|gif|tif(f|)|bmp)/.test(ext.toLowerCase())) {
      return 'I';
    }
    if (/(avi|mpg|mpeg|mpe|wmv|asf|asx|flv|rm|mov|dat|mp4)/.test(ext.toLowerCase())) {
      return 'V';
    }

    if (/(txt|hwp|ppt|doc|dot|gul|pdf|xls|xlxs)/.test(ext.toLowerCase())) {
      return 'D';
    }
    return 'N';
  }
}
