import type { Equal, Expect } from '@type-challenges/utils'

// 由于 infer 可以推断空字符串，所以下面这个写法冗余了
// type DropChar<T extends string, U extends string> = T extends `${U}${infer P}`
//   ? DropChar<P, U>
//   : T extends `${infer P}${U}`
//     ? DropChar<P, U>
//     : T extends `${infer P}${U}${infer F}`
//       ? DropChar<`${P}${F}`, U>
//       : T;
type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}` ? DropChar<`${L}${R}`, C> : S;

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]
