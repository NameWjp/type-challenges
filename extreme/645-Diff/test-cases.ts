import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 其它答案：type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>
 * 利用了对象的 | 和 & 特性
 */
type Diff<T, U> = {
  [K in Exclude<keyof T | keyof U, keyof T & keyof U>]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
}

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]
