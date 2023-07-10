import type { Equal, Expect } from '@type-challenges/utils'

type IsRepeat<T extends unknown[], I> = T extends [infer First, ...infer Rest]
  ? Equal<I, First> extends true
    ? true
    : IsRepeat<Rest, I>
  : false;

type FindEles<T extends unknown[], List extends unknown[] = [], Result extends unknown[] = []> = List['length'] extends T['length']
  ? Result
  : T extends [infer First, ...infer Rest]
    ? IsRepeat<Rest, First> extends true
      ? FindEles<[...Rest, First], [...List, First], Result>
      : FindEles<[...Rest, First], [...List, First], [...Result, First]>
  : never;

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]
