import type { Equal, Expect } from '@type-challenges/utils'

type ExtractType<T> = T extends (infer P | Promise<infer P>) ? P : T;

/**
 * declare 用来定义外部的变量或函数
 * as const 代表数组无法再修改，readonly 用来描述无法修改的数组
 */
declare function PromiseAll<T extends unknown[]>(values: readonly [...T]): Promise<{
  [K in keyof T]: ExtractType<T[K]> extends Promise<infer R> ? R : ExtractType<T[K]>
}>;

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
type b = typeof promiseAllTest3
type c = number | Promise<number> extends Promise<any> ? true : false;

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]
