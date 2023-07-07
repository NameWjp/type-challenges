import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 观察 [1, 2, 3] 的结果，发现每次枚举到下一个下标时，相当于将该下标放到前面所有枚举中的数组的最后，例如：
 * 初始：[]
 * 下标 1：[1]
 * 下标 2：[2] | [1, 2]
 * 下标 3：[3] | [1, 3] | [2, 3] | [1, 2, 3]
 * 以此为规律可以写出下面的代码
 */
type Subsequence<T extends unknown[], Result extends unknown[] = []> = T extends [infer F, ...infer Rest]
  ? Subsequence<Rest, Result | [...Result, F]>
  : Result

type c = Subsequence<[1, 2, 3]>

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]
