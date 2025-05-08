import CryptoJS from "crypto-js";

const secret_key: string = String(process.env.SECRET_KEY);

const iv = CryptoJS.enc.Utf8.parse(secret_key);
const padding = CryptoJS.pad.Pkcs7;
const mode = CryptoJS.mode.CBC;
/**
 * @apiNote : 암호화 유틸
 */

/**
 * aes128 암·복호화 유틸
 */
export const cryptoUtil = {
  // 암호화
  encrypt(plainText: string) {
    const cipher = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(secret_key), {
      iv: iv,
      padding: padding,
      mode: mode,
    });
    return CryptoJS.enc.Base64.parse(cipher.toString()).toString();
  },

  // 복호화
  decrypt(encrypted: string) {
    const encryptedHex = CryptoJS.enc.Hex.parse(encrypted).words;
    const encryptedHexArray = CryptoJS.lib.WordArray.create(encryptedHex);
    const encryptedHexToBase64 = CryptoJS.enc.Base64.stringify(encryptedHexArray);

    const cipher = CryptoJS.AES.decrypt(encryptedHexToBase64, CryptoJS.enc.Utf8.parse(secret_key), {
      iv: iv,
      padding: padding,
      mode: mode,
    });

    try {
      return CryptoJS.enc.Utf8.stringify(cipher);
    } catch (error) {
      console.log(`[[decAES256 ${error}]]`)
    }
  },
};

/**
 * SHA-256 해싱 유틸
 */
export const sha256Cipher = {
  hasing(text: string) {
    return CryptoJS.SHA256(text).toString();
  },
};
