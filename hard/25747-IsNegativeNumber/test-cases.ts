import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 联合类型的判断可以参考 IsUnion 问题
 */
type IsNegativeNumber<T extends number, U = T> = number extends T
  ? never
  : T extends U
    ? [U] extends [T]
      ? T extends 0
        ? false
        : `${T}` extends `-${string}`
          ? true
          : false
      : never
    : never;

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
]
