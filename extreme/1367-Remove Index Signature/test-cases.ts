import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 思路：P 不继承 K，K 继承 P 即为非原始类型
 * 1. 遍历 T 的键类型
 * 2. 通过 P extends K ? never : K
 *    在 K 是 string 的时候，P 剩 number | symbol 类型
 *    在 K 是 'str' 的时候，P 保持不变
 * 3. 通过 K extends P ? K : never
 *    在 K 是 string 的时候，为 never
 *    在 K 是 'str' 的时候，为 K
 */
type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K]
}

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]
