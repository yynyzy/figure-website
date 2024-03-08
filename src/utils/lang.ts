export const isObject: (value: any) => Boolean = (value) => Object.prototype.toString.call(value) === '[object Object]';
