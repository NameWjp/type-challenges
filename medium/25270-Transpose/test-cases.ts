import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

// 下面的方法虽然能实现，但是太不简洁了
// type InitResult<T extends unknown[], Result extends unknown[][] = []> = Result['length'] extends T['length']
//   ? Result
//   : InitResult<T, [...Result, []]>

// type AddList<T extends unknown[], Result extends unknown[][]> = T extends [infer First, ...infer Rest]
//   ? Result extends [infer List extends unknown[], ...infer RestList extends unknown[][]]
//     ? AddList<Rest, [...RestList, [...List, First]]>
//     : never
//   : Result;

// type Transpose<
//   T extends unknown[][],
//   Result extends unknown[][] = InitResult<T[0]>
// > = T extends [infer List extends unknown[], ...infer RestList extends unknown[][]]
//   ? Transpose<RestList, AddList<List, Result>>
//   : Result;

/**
 * 需要注意的是数组也可以通过 keyof 来构建
 * 参考: https://github.com/type-challenges/type-challenges/issues/25297
 */
type Transpose<M extends number[][], R = M['length'] extends 0 ? [] : M[0]> = {
  [X in keyof R]: {
    [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never
  }
}

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>, [[1, 4, 7], [2, 5, 8], [3, 6, 9]]>>,
]
