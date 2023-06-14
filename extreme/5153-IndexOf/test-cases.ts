import type { Equal, Expect } from '@type-challenges/utils'

// 使用和 Equal 一样的技巧来判断 any 类型
type IndexOf<T extends unknown[], P, Index extends unknown[] = []> = T extends [infer First, ...infer Rest]
  ? (<V>() => V extends First ? 1 : 0) extends (<V>() => V extends P ? 1 : 0)
    ? Index['length']
    : IndexOf<Rest, P, [...Index, 1]>
  : -1

type c = [string] extends [any] ? true : false;
type b = [any] extends [string] ? true : false;

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]
