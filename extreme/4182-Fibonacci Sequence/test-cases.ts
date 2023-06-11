import type { Equal, Expect } from '@type-challenges/utils'

type Fibonacci<
  T extends number,
  CurrentIndex extends unknown[] = [1],
  Prev extends unknown[] = [],
  Current extends unknown[] = [1],
> = T extends CurrentIndex['length']
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
