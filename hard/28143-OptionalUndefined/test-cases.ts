import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

// 可以遍历联合类型的 key 来重新生成类型
type Merge<T> = {
  [K in keyof T]: T[K]
}

type GetOptionalKeys<T extends keyof V, U, V> = T extends U
  ? undefined extends V[T]
    ? T
    : never
  : never;

type OptionalUndefined<T, U extends keyof T = keyof T> = Merge<{
  [K in GetOptionalKeys<keyof T, U, T>]?: T[K]
} & {
  [K in Exclude<keyof T, GetOptionalKeys<keyof T, U, T>>]: T[K]
}>

type cases = [
  Expect<Equal<OptionalUndefined<{ value: string | undefined }, 'value'>, { value?: string | undefined }>>,
  Expect<Equal<OptionalUndefined<{ value: string; desc: string }, 'value'>, { value: string; desc: string }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string }, 'value'>, { value?: string; desc: string }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string | undefined }, 'value'>, { value?: string | undefined; desc: string | undefined }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string }, 'value' | 'desc'>, { value?: string; desc: string }>>,
  Expect<Equal<OptionalUndefined<{ value: string | undefined; desc: string | undefined }>, { value?: string; desc?: string }>>,
  Expect<Equal<OptionalUndefined<{ value?: string }, 'value'>, { value?: string }>>,
  Expect<Equal<OptionalUndefined<{ value?: string }>, { value?: string }>>,
]
