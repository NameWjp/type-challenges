import type { Equal, Expect } from '@type-challenges/utils'

// 想要在使用泛型就抛出错误，需要使用 extends 来限制类型输入（这里是类型 B）
type If<B extends boolean, T, P> = B extends true ? T : P;

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>