import type { Equal, Expect } from '@type-challenges/utils'

// 从头遍历较复杂，建议使用下面的从尾遍历的方法
// type LastIndexOf<
//   T extends unknown[],
//   P, Index extends unknown[] = [],
//   TargetIndex extends unknown[] = []
// > = T extends [infer First, ...infer Rest]
//   ? (<V>() => V extends First ? 1 : 0) extends (<V>() => V extends P ? 1 : 0)
//     ? LastIndexOf<Rest, P, [...Index, 1], [...Index]>
//     : LastIndexOf<Rest, P, [...Index, 1], TargetIndex>
//   : TargetIndex extends []
//     ? -1
//     : TargetIndex['length']

// 巧妙的利用了 A 前面的元素组成的数组的长度恰好等于 A 的 index 的特性
type LastIndexOf<T extends unknown[], P> = T extends [...infer Rest, infer Last]
  ? (<V>() => V extends Last ? 1 : 0) extends (<V>() => V extends P ? 1 : 0)
    ? Rest['length']
    : LastIndexOf<Rest, P>
  : -1;

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]
