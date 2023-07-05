/***
 * @file:
 * @author: caojianping
 * @Date: 2023-07-05 20:31:27
 */

/**
 * 数字签名请求数据接口
 */
export interface ISignatureRequest {
  // 数据
  data: string;

  // AES加密密钥
  aesKey: string;

  // 公钥
  publicKey: string;

  // 时间戳
  ts: string;

  // 数字签名
  sign: string;
}

/**
 * 数据加密响应数据接口
 */
export interface IEncryptResponse {
  // 数据
  data: string;

  // 密钥
  aesKey: string;
}

/**
 * RSA密钥对接口
 */
export interface IRsaKeypair {
  // 公钥
  publicKey: string;

  // 密钥
  privateKey: string;
}
