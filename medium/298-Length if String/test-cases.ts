import type { Equal, Expect } from '@type-challenges/utils'

type LengthOfString<T, U extends unknown[] = []> = T extends ''
  ? U['length']
  : T extends `${infer S}${infer R}`
    ? LengthOfString<R, [...U, S]>
    : never

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]
