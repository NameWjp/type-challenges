import type { Equal, Expect } from '@type-challenges/utils'

type IsPalindrome<T extends number | string> = `${T}` extends `${infer F}${infer R}`
  ? R extends ''
    ? true
    : R extends `${infer H}${F}`
      ? IsPalindrome<H>
      : false
  : true;

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abba'>, true>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]
