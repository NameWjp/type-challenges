import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 获取可选的类型，原理：将某个键变为可选，如果仍然 extends 原类型，则证明是可选的
 * 参考：https://zhuanlan.zhihu.com/p/43206436
 */
type IsOptional<T, K extends keyof T> = {
  [K1 in Exclude<keyof T, K>]: T[K1]
} & { K?: T[K] } extends T ? true : false

type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>

type ObjectEntries<T> = {
  [K in keyof T]-?: [K, IsOptional<T, K> extends true ? RemoveUndefined<T[K]> : T[K]]
}[keyof T]

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]
