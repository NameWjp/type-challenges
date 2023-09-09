import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 参考：https://github.com/type-challenges/type-challenges/issues/11216
 * 神奇的 ts，在使用下面这种写法尾递归优化，从而突破递归 999 层的限制
 * issues讨论：https://github.com/microsoft/TypeScript/issues/49459
 */
// type Tuple<T, Res extends 1[] = []> = 0 extends 1
//   ? never
//   : Res['length'] extends T
//     ? Res
//     : Tuple<T, [...Res, 1]>;

type Tuple<T, Res extends 1[] = []> = Res['length'] extends T
  ? Res
  : Tuple<T, [...Res, 1]>;

type Subtract<M extends number, S extends number> =
  Tuple<M> extends [...Tuple<S>, ...infer Rest]
    ? Rest['length']
    : never

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]
