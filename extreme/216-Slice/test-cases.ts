import type { Equal, Expect } from '@type-challenges/utils'

// 将 N 转成正数，这里巧妙的利用了 Slice 方法
type ToPositive<N extends number, Arr extends unknown[]> =
  `${N}` extends `-${infer P extends number}`
  ? Slice<Arr, P>['length']
  : N

// 从一个数组获取前 N 个值
type InitialN<Arr extends unknown[], N extends number, _Acc extends unknown[] = []> =
  _Acc['length'] extends N | Arr['length']
    ? _Acc
    : InitialN<Arr, N, [..._Acc, Arr[_Acc['length']]]>

/**
 * 参考：https://github.com/type-challenges/type-challenges/issues/22110
 */
type Slice<Arr extends unknown[], Start extends number = 0, End extends number = Arr['length']> =
  InitialN<Arr, ToPositive<End, Arr>> extends [...InitialN<Arr, ToPositive<Start, Arr>>, ...infer Rest]
    ? Rest
    : []

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]
