import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 其它答案，很聪明
 * type Last<T extends any[]> = [any, ...T][T["length"]];
 */
type Last<T extends unknown[]> = T extends [...unknown[], infer P] ? P : never;

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
