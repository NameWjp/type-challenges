import type { Equal, Expect } from '@type-challenges/utils'

type BinaryToDecimal<
  S extends string,
  R extends unknown[] = []
> = S extends `${infer F}${infer L}`
  ? F extends '0'
    ? BinaryToDecimal<L, [...R, ...R]>
    : BinaryToDecimal<L, [...R, ...R, 1]>
  : R['length']

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]
