import type { Equal, Expect } from '@type-challenges/utils'

type RequiredKeys<T extends Record<string, unknown>, Key = keyof T> = Key extends keyof T
  ? T[Key] extends Required<T>[Key]
    ? Key
    : never
  : never;

type c = RequiredKeys<{ a: number; b?: string }>

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]
