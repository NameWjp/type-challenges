import type { Equal, Expect } from '@type-challenges/utils'

type OptionalKeys<T extends Record<string, unknown>, Key = keyof T> = Key extends keyof T
  ? T[Key] extends Required<T>[Key]
    ? never
    : Key
  : never;

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]
