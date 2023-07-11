import type { Equal, Expect } from '@type-challenges/utils'

type CheckRepeatedChars<T extends string> = T extends `${infer First}${infer Rest}`
  ? Rest extends `${string}${First}${string}`
    ? true
    : CheckRepeatedChars<Rest>
  : false;

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]
