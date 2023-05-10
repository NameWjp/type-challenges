import type { Equal, Expect } from '@type-challenges/utils'

// 巧妙的利用 never 来排除 K 类型的子集
type MyExclude<T, K> = T extends K ? never : T;

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]