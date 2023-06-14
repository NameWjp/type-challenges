import type { Equal, Expect } from '@type-challenges/utils'

type ToUnion<T> = T extends any[] ? T[number] : T

type Without<T extends unknown[], M> = T extends [infer First, ...infer Rest]
  ? First extends ToUnion<M>
    ? Without<Rest, M>
    : [First, ...Without<Rest, M>]
  : []

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]
