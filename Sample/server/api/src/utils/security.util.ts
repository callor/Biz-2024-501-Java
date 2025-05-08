import config from '@config';
import * as short from 'short-uuid';
import { v4 as uuidV4 } from 'uuid';
import * as aesjs from 'aes-js';
import * as crypto from 'crypto';
const translator = short();

export class SecurityUtil {
  private static getUUID() {
    return uuidV4();
  }

  static getShortUUID(uuid?: string) {
    return translator.fromUUID(uuid ?? this.getUUID());
  }

  static randomString(num = 16) {
    return crypto.randomBytes(num).toString('hex');
  }

  static sha256Encrypt(str: string) {
    return crypto.createHash('sha256').update(str).digest('hex');
  }

  static aes128Encrypt(str: string) {
    const basicKey = config.cryptoBasicKey;
    const iv: any = Buffer.from(basicKey);
    const aesCbc = new aesjs.ModeOfOperation.cbc(iv, iv);
    const dataBytes = aesjs.utils.utf8.toBytes(str);
    const encryptedBytes = aesCbc.encrypt(aesjs.padding.pkcs7.pad(dataBytes));
    const hexEncrypt = aesjs.utils.hex.fromBytes(encryptedBytes);
    return hexEncrypt;
  }

  static aes128Decrypt(hash: string) {
    const basicKey = config.cryptoBasicKey;
    const iv: any = Buffer.from(basicKey);
    const aesCbc = new aesjs.ModeOfOperation.cbc(iv, iv);
    const encryptedBytes = aesjs.utils.hex.toBytes(hash);
    const decryptedBytes = aesCbc.decrypt(encryptedBytes);
    const newBytes = decryptedBytes.filter((byte: any) => byte > 16);
    const decrypted = aesjs.utils.utf8.fromBytes(newBytes);
    return decrypted;
  }
}
