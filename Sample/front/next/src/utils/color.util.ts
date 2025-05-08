export default class ColorUtil {
  static randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  static isLight(hex: string) {
    return this.getBrightness(hex) > 128;
  }

  static isDark(hex: string) {
    return this.getBrightness(hex) <= 128;
  }

  static getBrightness(hex: string) {
    if (hex.includes('#')) {
      hex = hex.substring(1);
    }
    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, '$1$1');
    }
    const rgb = parseInt(hex, 16);
    const red = (rgb >> 16) & 0xff;
    const green = (rgb >> 8) & 0xff;
    const blue = (rgb >> 0) & 0xff;
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return brightness;
  }

  static getLuminance(hex: string) {
    if (hex.includes('#')) {
      hex = hex.substring(1);
    }
    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, '$1$1');
    }
    const rgb = parseInt(hex, 16);
    let red = (rgb >> 16) & 0xff;
    let green = (rgb >> 8) & 0xff;
    let blue = (rgb >> 0) & 0xff;
    const RsRGB = red / 255;
    const GsRGB = green / 255;
    const BsRGB = blue / 255;

    if (RsRGB <= 0.03928) {
      red = RsRGB / 12.92;
    } else {
      red = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    }
    if (GsRGB <= 0.03928) {
      green = GsRGB / 12.92;
    } else {
      green = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    }
    if (BsRGB <= 0.03928) {
      blue = BsRGB / 12.92;
    } else {
      blue = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }
}
