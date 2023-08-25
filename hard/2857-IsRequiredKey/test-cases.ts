import type { Equal, Expect } from '@type-challenges/utils'

type IsRequiredKey<T, U extends keyof T> =  Pick<T, U> extends Required<Pick<T, U>> ? true : false;

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b: undefined }, 'b' | 'a'>, true>>,
]
