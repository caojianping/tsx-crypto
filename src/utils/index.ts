/***
 * @file:
 * @author: caojianping
 * @Date: 2023-07-05 20:31:27
 */

/**
 * 随机生成指定长度字符串
 * @param length 长度
 * @returns 返回随机字符串
 */
export function randomStr(length: number) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < length; i++) {
    const randomPoz = Math.floor(Math.random() * CHARS.length);
    str += CHARS.substring(randomPoz, randomPoz + 1);
  }
  return str;
}

/**
 * 预处理数据
 * @param data 数据
 * @returns 返回处理后的数据
 */
export const pretreatData = (data: any) => {
  let result: any = {};
  if (typeof data === 'string') {
    const splitData = data.split('=');
    Reflect.set(result, splitData[0], splitData[1]);
    result = { ...result };
  } else {
    result = { ...result, ...data };
  }
  /** 处理完requestData后开始进行加密处理 **/
  return result;
};
