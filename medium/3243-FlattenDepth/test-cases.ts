import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 思路：利用 length 记录递归的深度，在深度符合条件后终止递归
 * 答案地址：https://github.com/type-challenges/type-challenges/issues/15373
 */
type FlattenDepth<
  T extends unknown[],
  C extends number = 1,
  M extends unknown[] = []
> = M['length'] extends C
  ? T
  : T extends [infer P, ...infer U]
    ? P extends unknown[]
      ? [...FlattenDepth<P, C, [...M, 1]>, ...FlattenDepth<U, C, M>]
      : [P, ...FlattenDepth<U, C, M>]
    : T;

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]
