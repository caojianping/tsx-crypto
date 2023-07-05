/***
 * @file:
 * @author: caojianping
 * @Date: 2023-07-05 20:31:27
 */

import CryptoJS from 'crypto-js';
import { randomStr } from '../utils';

/**
 * AES辅助类
 */
export class AesHelper {
  /**
   * 随机生成指定长度的16进制密钥
   * @param num 指定长度
   * @returns 返回AES密钥
   */
  public static generateKey(num: number): string {
    return randomStr(num);
  }

  /**
   * AES加密
   * @param key 密钥
   * @param data 数据
   * @returns 返回密文
   */
  public static encrypt(key: string, data: any): string {
    const pkey = CryptoJS.enc.Utf8.parse(key);
    const pword = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(pword, pkey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  /**
   * AES解密
   * @param key 密钥
   * @param data 数据
   * @returns 返回明文
   */
  public static decrypt(key: string, data: any): string {
    const pkey = CryptoJS.enc.Utf8.parse(key);
    const decrypt = CryptoJS.AES.decrypt(data, pkey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}
