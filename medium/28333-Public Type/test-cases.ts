import type { Equal, Expect } from '@type-challenges/utils'

type ExcludePrivate<T> = T extends T
  ? T extends `_${infer _Any}`
    ? never
    : T
  : never;

/**
 * 注意使用 as 来规避 readonly 的丢失问题
 */
type PublicType<T> = {
  [K in keyof T as K extends ExcludePrivate<keyof T> ? K : never]: T[K]
}

type cases = [
  Expect<Equal<PublicType<{ a: number }>, { a: number }>>,
  Expect<Equal<PublicType<{ _b: string | bigint }>, {}>>,
  Expect<Equal<PublicType<{ readonly c?: number }>, { readonly c?: number }>>,
  Expect<Equal<PublicType<{ d: string; _e: string }>, { d: string }>>,
  Expect<Equal<PublicType<{ _f: () => bigint[] }>, {}>>,
  Expect<Equal<PublicType<{ g: '_g' }>, { g: '_g' }>>,
  Expect<Equal<PublicType<{ __h: number; i: unknown }>, { i: unknown }>>,
]
