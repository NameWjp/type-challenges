import type { Equal, Expect } from '@type-challenges/utils'

type Merge<T> = {
  [K in keyof T]: T[K]
}

type MergeQuery<T extends string, Result extends Record<PropertyKey, unknown>> = T extends `${infer K}=${infer V}`
  ? K extends keyof Result
    ? Result[K] extends unknown[]
      ? V extends Result[K][number]
        ? Result
        : Omit<Result, K> & { [_K in K]: [...Result[K], V] }
      : Result[K] extends V
        ? Result
        : Omit<Result, K> & { [_K in K]: [Result[K], V] }
    : Result & { [_K in K]: V }
  : T extends ''
    ? Result
    : T extends keyof Result
      ? Result[T] extends true
        ? Result
        : Omit<Result, T> & { [_K in T]: [Result[T], true] }
      : Result & { [_K in T]: true }

type ParseQuery<T extends string, Result extends Record<PropertyKey, unknown> = {}> = T extends `${infer F}&${infer L}`
  ? ParseQuery<L, MergeQuery<F, Result>>
  : MergeQuery<T, Result>

type ParseQueryString<T extends string> = Merge<ParseQuery<T>>

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]
