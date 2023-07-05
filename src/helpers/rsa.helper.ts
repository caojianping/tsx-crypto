/***
 * @file:
 * @author: caojianping
 * @Date: 2023-07-05 20:31:27
 */

import { KEYUTIL, KJUR, hextob64, b64utohex, b64tohex, RSAKey } from 'jsrsasign';
import { IRsaKeypair } from '../interfaces';

/**
 * RSA辅助类
 */
export class RsaHelper {
  // 公钥
  static PUBLIC_KEY: string;

  // 私钥
  static PRIVATE_KEY: string;

  /**
   * 生成RSA密钥对
   * @returns 返回IRsaKeypair
   */
  public static generateRsaKeys(): IRsaKeypair {
    const rsaKeypair = KEYUTIL.generateKeypair('RSA', 1024);
    const privateKey = (RsaHelper.PRIVATE_KEY = KEYUTIL.getPEM(rsaKeypair.prvKeyObj, 'PKCS8PRV'));
    const publicKey = (RsaHelper.PUBLIC_KEY = KEYUTIL.getPEM(rsaKeypair.pubKeyObj));
    return { privateKey, publicKey } as IRsaKeypair;
  }

  /**
   * 公钥加密
   * @param data 数据
   * @param injectPublicKey 依赖注入的公钥
   * @returns 返回公钥加密数据
   */
  public static encryptByPublicKey(data: any, injectPublicKey?: string) {
    let pubData = RsaHelper.PUBLIC_KEY;
    /** 后端返回的公钥是不带pub和pri的头 这里需要特殊处理下 **/
    if (injectPublicKey) {
      pubData = `-----BEGIN PUBLIC KEY-----\n${injectPublicKey}\n-----END PUBLIC KEY-----`;
    }
    const pub = KEYUTIL.getKey(pubData);
    const enc = KJUR.crypto.Cipher.encrypt(data, pub as RSAKey, 'RSA');
    return hextob64(enc);
  }

  /**
   * 私钥加密
   * @param data 数据
   * @param injectPrivateKey 依赖注入的私钥
   * @return 返回私钥加密数据
   */
  public static encryptByPrivateKey(data: any, injectPrivateKey?: string) {
    let priData = RsaHelper.PRIVATE_KEY;
    if (injectPrivateKey) {
      priData = `-----BEGIN PRIVATE KEY-----\n${injectPrivateKey}\n-----END PRIVATE KEY-----`;
    }
    const pri = KEYUTIL.getKey(priData);
    const enc = KJUR.crypto.Cipher.encrypt(data, pri as RSAKey, 'RSA');
    return hextob64(enc);
  }

  /**
   * 公钥解密
   * @param publicKey 公钥
   * @param data 数据
   * @returns 返回解密数据
   */
  public static decryptByPublicKey(publicKey: string, data: any) {
    const pub = KEYUTIL.getKey(publicKey);
    const dec = KJUR.crypto.Cipher.decrypt(b64utohex(data), pub as RSAKey, 'RSA');
    return dec;
  }

  /**
   * 私钥解密
   * @param privateKey 私钥
   * @param data 数据
   * @returns 返回解密数据
   */
  public static decryptByPrivateKey(privateKey: string, data: any) {
    const pri = KEYUTIL.getKey(privateKey);
    const dec = KJUR.crypto.Cipher.decrypt(b64utohex(data), pri as RSAKey, 'RSA');
    return dec;
  }

  /**
   * 获取签名
   * @param privateKey 私钥
   * @param data 数据
   * @returns 返回签名
   */
  public static getSignature(privateKey: string, data: any): string {
    const sig = new KJUR.crypto.Signature({ alg: 'MD5withRSA' });
    const priData = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
    sig.init(priData);
    sig.updateString(data);
    return hextob64(sig.sign());
  }

  /**
   * 验证签名
   * @param publicKey 公钥
   * @param data 数据
   * @returns 返回验证结果
   */
  public static verifySignature(publicKey: string, data: any, sign: any) {
    const verify = new KJUR.crypto.Signature({ alg: 'MD5withRSA' });
    verify.init(publicKey);
    verify.updateString(data);
    return verify.verify(b64tohex(sign));
  }
}
