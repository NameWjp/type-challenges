import type { Equal, Expect } from '@type-challenges/utils'

// 在需要判断特定位置的类型时，使用 infer 推断
type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]