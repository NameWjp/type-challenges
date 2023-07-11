import type { Equal, Expect } from '@type-challenges/utils'

type Zip<T extends unknown[], U extends unknown[], R extends unknown[] = []> = T extends [infer FirstT, ...infer RestT]
  ? U extends [infer FirstU, ...infer RestU]
    ? Zip<RestT, RestU, [...R, [FirstT, FirstU]]>
    : R
  : R

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]
