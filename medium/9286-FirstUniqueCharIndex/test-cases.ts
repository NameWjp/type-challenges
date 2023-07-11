import type { Equal, Expect } from '@type-challenges/utils'

type StringToLength<T extends string, Result extends unknown[] = []> = T extends `${infer First}${infer Rest}`
  ? StringToLength<Rest, [...Result, First]>
  : Result['length'];

type FirstUniqueCharIndex<T extends string, Result extends unknown[] = []> = Result['length'] extends StringToLength<T>
  ? -1
  : T extends `${infer First}${infer Rest}`
    ? Rest extends `${string}${First}${string}`
      ? FirstUniqueCharIndex<`${Rest}${First}`, [...Result, First]>
      : Result['length']
    : never;

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]
