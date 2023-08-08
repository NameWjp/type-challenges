import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 这里利用 infer 的逆变特性来实现的
 * ref: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types
 */
type UnionToIntersection<T> = (T extends any ? (arg: T) => any : never) extends ((arg: infer I) => any) ? I : never;

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]
