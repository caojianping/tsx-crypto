/***
 * @file:
 * @author: caojianping
 * @Date: 2023-07-05 20:31:27
 */

import { IEncryptResponse } from './interfaces';
import { RsaHelper, AesHelper, HashHelper } from './helpers';
import { KeyTypeEnum } from './enums';
import { pretreatData } from './utils';

export * from './helpers';

/**
 * 加密类
 */
export class Crypto {
  /**
   * 数字签名
   * @param data 数据
   * @param dependenciesPriKey
   * @returns
   */
  public static signature(data: any, dependenciesPriKey: string): URLSearchParams {
    const mergeRequestData = pretreatData(data);
    /** 时间戳 (时间戳为秒) **/
    const ts = (Date.parse(new Date().toString()) / 1000).toString();
    /** MD5加密时间戳和数据 **/
    const md5ZY = HashHelper.md5(JSON.stringify(mergeRequestData) + ts);
    /** 主要用于比对 后台RSA私钥加密 **/
    const sign = RsaHelper.getSignature(dependenciesPriKey, md5ZY);
    const backData = new URLSearchParams();
    backData.append('data', JSON.stringify(mergeRequestData));
    backData.append('ts', ts);
    backData.append('sign', sign);
    return backData;
  }

  /**
   * 解密数据
   * @param response 服务端接口响应数据
   * @returns 返回解密数据
   */
  public static decrypt(response: IEncryptResponse) {
    if (!response) return null;
    // 1. 先通过客户端RSA私钥解密aesKey；
    // 2. 再通过AES解密服务端返回的加密数据；
    const { data, aesKey } = response;
    const key = RsaHelper.decryptByPrivateKey(RsaHelper.PRIVATE_KEY, aesKey);
    const result = AesHelper.decrypt(key, data);
    // 字符串再转换处理；
    try {
      return JSON.parse(result);
    } catch (error: any) {
      throw new Error('服务端接口响应数据解密失败:' + error.message);
    }
  }

  /**
   * 当前端和后端的公钥私钥内容不一致时,
   * 去除当前rsa公钥或者密钥的开头和结尾标示，先去除所有空格和换行，然后在match进行正则匹配
   * @param dataStr 需要处理的str
   * @param type 公钥私钥类型
   * @return 处理后的公钥私钥
   **/
  public static replaceKeyHeaderAndFooter = (dataStr: string, type: any): string => {
    let matchReg = /''/;
    if (type === KeyTypeEnum.PUBLIC) {
      matchReg = /-----BEGINPUBLICKEY-----(\S*)-----ENDPUBLICKEY-----/;
    } else if (type === KeyTypeEnum.PRIVATE) {
      matchReg = /-----BEGINPRIVATEKEY-----(\S*)-----ENDPRIVATEKEY-----/;
    }
    try {
      const dataStrCheck = dataStr.replace(/[ ]|[\r\n]/g, '');
      const matchRegData = dataStrCheck.match(matchReg);
      if (matchRegData != null) {
        return matchRegData[1];
      }
      return dataStr;
    } catch (error: any) {
      throw new Error('处理公钥私钥不一致发生错误:' + error.message);
    }
  };
}
