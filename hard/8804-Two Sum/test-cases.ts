import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 需要兼容联合类型的数字
 */
type NumberToUnionArr<T extends number, R extends unknown[] = []> =
  T extends unknown
    ? R['length'] extends T
      ? R
      : NumberToUnionArr<T, [...R, 0]>
    : never

/**
 * 这里 NumberToUnionArr<Rest[number]> 利用了联合类型的特性
 */
type SumUnion<
  T extends number[],
  R = never,
> =
  T['length'] extends 0 | 1
    ? R
    : T extends [infer A extends number, ...infer Rest extends number[]]
      ? SumUnion<Rest, R | [...NumberToUnionArr<A>, ...NumberToUnionArr<Rest[number]>]['length']>
      : never

/**
 * 参考：https://github.com/type-challenges/type-challenges/issues/22938
 */
type TwoSum<
  T extends number[],
  U extends number,
> = U extends SumUnion<T> ? true : false

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]
