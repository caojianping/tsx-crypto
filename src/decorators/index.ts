/***
 * @file:
 * @author: caojianping
 * @Date: 2023-07-05 20:31:27
 */

/**
 * 数字签名装饰器
 * @param enable 启用开关
 * @returns 返回装饰器
 */
export function sign(enable: boolean): any {
  return function (target: any, name: string, descriptor: any) {
    const odescriptor = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      if (enable) {
        arg = arg.map((item) => `签名前缀_${JSON.stringify(item)}`);
        return odescriptor.apply(this, arg);
      } else {
        return odescriptor.apply(this, arg);
      }
    };

    return descriptor;
  };
}

/**
 * 数据解密装饰器
 * @param enable 启用开关
 * @returns 返回装饰器
 */
export function decrypt(enable: boolean): any {
  return function (target: any, name: string, descriptor: any) {
    const odescriptor = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      if (enable) {
        const result = odescriptor.apply(this, arg);
        return `解密后缀_${JSON.stringify(result)}`;
      } else {
        return odescriptor.apply(this, arg);
      }
    };

    return descriptor;
  };
}
