import type { Equal, Expect } from '@type-challenges/utils'

/**
 * never 和任何类型或处理，返回该类型。可以利用该特性来规避一些分支
 */
type StringToUnion<T extends string> = T extends `${infer P}${infer U}` ? P | StringToUnion<U> : never

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]
