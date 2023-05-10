import type { Equal, Expect } from '@type-challenges/utils'

// extends 可以以两种方式使用，一个是真正的 extends，另一个就像一个具有 T 遍历的三元表达式，称为分配条件类型
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type MyExclude<T, K> = T extends K ? never : T;

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]