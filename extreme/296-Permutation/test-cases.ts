import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 1. 判断 never 使用数组规避 extends 的分配条件类型特征
 * 2. 遍历联合类型利用了 extends 的分配条件类型特性
 * 答案：https://github.com/type-challenges/type-challenges/issues/614
 */
type Permutation<T, K=T> = [T] extends [never]
  ? []
  : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

// extends 的分配条件类型特性例子
type P<T> = T extends never ? true : false;
type A1 = P<never> // never
type A2 = P<any> // boolean

type Q<T> = [T] extends [never] ? true : false;
type B1 = Q<never> // true
type B2 = Q<any> // false
