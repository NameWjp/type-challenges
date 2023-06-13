import type { Equal, Expect } from '@type-challenges/utils'

/**
 * extends readonly unknown[] 使得普通的和 readonly 的数组都能通过测试
 */
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly unknown[]
    ? number extends T['length']
      ? false
      : true
    : false

/**
 * 下面的 C 的类型是 true，说明 [] 继承自 readonly []，readonly [] 范围更大
 */
type C = [] extends readonly [] ? true : false

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]
