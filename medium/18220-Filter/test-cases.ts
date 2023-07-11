import type { Equal, Expect } from '@type-challenges/utils'

type Filter<T extends unknown[], I, Result extends unknown[] = []> = T extends [infer First, ...infer Rest]
  ? First extends I
    ? Filter<Rest, I, [...Result, First]>
    : Filter<Rest, I, Result>
  : Result;

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
]
