import type { Equal, Expect } from '@type-challenges/utils'

type GetValue<T> = T extends [infer F, ...infer R]
  ? [CapitalizeNestObjectKeys<F>, ...GetValue<R>]
  : T extends Record<PropertyKey, unknown>
    ? CapitalizeNestObjectKeys<T>
    : T;

type CapitalizeNestObjectKeys<T> = {
  [K in keyof T as K extends string ? Capitalize<K> : never]: GetValue<T[K]>
}

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]
