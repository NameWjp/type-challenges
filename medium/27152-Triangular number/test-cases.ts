import type { Equal, Expect } from '@type-challenges/utils'

type MakeArrayByCount<T extends number, Result extends unknown[] = []> = Result['length'] extends T
  ? Result
  : MakeArrayByCount<T, [...Result, 1]>

type Triangular<T extends number, Len extends unknown[] = [], Result extends unknown[] = []> = Len['length'] extends T
  ? Result['length']
  : Triangular<T, [...Len, 1], [...Result, ...MakeArrayByCount<[...Len, 1]['length']>]>

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>,
]
