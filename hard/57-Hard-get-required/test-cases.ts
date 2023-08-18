import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 获取可选的类型，原理：将某个键变为可选，如果仍然 extends 原类型，则证明是可选的
 * 参考：https://zhuanlan.zhihu.com/p/43206436
 */
type IsOptional<T, K extends keyof T> = {
  [K1 in Exclude<keyof T, K>]: T[K1]
} & { K?: T[K] } extends T ? true : false


type GetRequired<T> = {
  [K in keyof T as IsOptional<T, K> extends true ? never : K]: T[K]
}

// 其它答案，原理：如果某个键的值继承去掉可选后的值，则说明这个键是必选的
// type GetRequired<T> = { [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P] };

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]
