import type { Equal, Expect } from '@type-challenges/utils'

type Repeat<T extends string, C extends number, Len extends  unknown[] = []> = Len['length'] extends C
  ? ''
  : `${T}${Repeat<T, C, [...Len, 1]>}`

namespace RLE {
  export type Encode<T extends string, C extends string = '', Len extends unknown[] = []> = T extends `${infer F}${infer L}`
    ? C extends ''
      ? Encode<L, F, [1]>
      : F extends C
        ? Encode<L, F, [...Len, 1]>
        : `${Len['length'] extends 1 ? '' : Len['length']}${C}${Encode<L, F, [1]>}`
    : `${Len['length'] extends 1 ? '' : Len['length']}${C}`;

  export type Decode<T extends string> = T extends `${infer C extends number}${infer S}${infer L}`
    ? `${Repeat<S, C>}${Decode<L>}`
    : T extends `${infer F}${infer R}`
      ? `${F}${Decode<R>}`
      : '';
}

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]
