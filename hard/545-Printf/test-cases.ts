import type { Equal, Expect } from '@type-challenges/utils'

type Format<T> = T extends `${string}%${infer O}${infer R}`
  ? O extends 'd'
    ? (d: number) => Format<R>
    : O extends 's'
      ? (s: string) => Format<R>
      : Format<R>
  : string;

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]
