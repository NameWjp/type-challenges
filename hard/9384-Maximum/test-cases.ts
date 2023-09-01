import type { Equal, Expect } from '@type-challenges/utils'

type Maximum<T extends unknown[], U = T[number], Len extends unknown[] = []> = T extends []
  ? never
  : Equal<U, Len['length']> extends true
    ? U
    : Maximum<T, Exclude<U, Len['length']>, [...Len, 1]>

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]
