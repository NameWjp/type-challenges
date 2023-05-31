import type { Equal, Expect } from '@type-challenges/utils'

type Merge<T, U> = {
  [K in (keyof T | keyof U)] : K extends keyof U ? U[K] : K extends keyof T ? T[K] : never
}

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]
