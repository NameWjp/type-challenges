import type { Equal, Expect } from '@type-challenges/utils'

// 在 ts 里可以使用拓展运算符来展开类型
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]