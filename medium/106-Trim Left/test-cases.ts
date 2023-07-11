import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 此题主要考察模板字符串的使用：https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
 */
type Space = ' ' | '\n' | '\t'
type TrimLeft<T extends string> = T extends `${Space}${infer P}` ? TrimLeft<P> : T;

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
