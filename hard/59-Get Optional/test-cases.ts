import type { Equal, Expect } from '@type-challenges/utils'

type GetOptional<T> = { [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P] };

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]
