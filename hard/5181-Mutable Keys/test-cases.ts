import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 需要注意 readonly 不会影响 extends，所以下面的代码都会返回 true
 * { a: number } extends { readonly a: number }
 * { readonly a: number } extends { a: number }
 */
type IsReadonly<T> = Equal<T, Readonly<T>>

type MutableKeys<T> = keyof {
  [K in keyof T as IsReadonly<Pick<T, K>> extends false ? K : never]: unknown
}

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]
