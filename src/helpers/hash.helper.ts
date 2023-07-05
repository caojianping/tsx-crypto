/***
 * @file:
 * @author: caojianping
 * @Date: 2023-07-05 20:31:27
 */

import CryptoJS from 'crypto-js';

/**
 * 哈希算法辅助类
 */
export class HashHelper {
  /**
   * MD5
   * @param data 数据
   * @param salt 盐
   * @returns 返回MD5值
   */
  public static md5(data: string, salt?: string) {
    let md5Res = CryptoJS.MD5(data).toString();
    /** 如果md5加密小于32位则对其进行补零操作 **/
    if (md5Res.length < 32) {
      md5Res = `0${md5Res}`;
    }
    return md5Res;
  }
}
