import type { Equal, Expect } from '@type-challenges/utils'

type Join<T extends unknown[], U extends number | string> = T extends [infer First extends string, ...infer Rest]
  ? Rest extends []
    ? `${First}`
    : `${First}${U}${Join<Rest, U>}`
  : ''

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
]
