import type { Equal, Expect } from '@type-challenges/utils'

type Merge<Result extends Record<string, unknown>, Item extends Record<string, unknown>> = {
  [K in Exclude<keyof Result, keyof Item>]: Result[K]
} & {
  [K in keyof Item]: K extends keyof Result ? Result[K] | Item[K] : Item[K]
}

type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}

type MergeAll<T, Result extends Record<string, unknown> = {}> = T extends [infer First extends Record<string, unknown>, ...infer Rest extends Record<string, unknown>[]]
  ? MergeAll<Rest, Merge<Result, First>>
  : IntersectionToObj<Result>;

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll<[{ a: string }, { a: string }]>,
    { a: string }>
  >,
  Expect<Equal<
    MergeAll<[{ }, { a: string }]>,
    { a: string }>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1 }, { c: 2 }]>,
    { a: 1; c: 2 }>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2; b: 2; c: 3 }>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]
