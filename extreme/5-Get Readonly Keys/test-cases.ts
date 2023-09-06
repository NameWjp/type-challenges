import type { Equal, Expect } from '@type-challenges/utils'

type IsReadonly<T> = Equal<T, Readonly<T>>

type GetReadonlyKeys<T> = keyof {
  [K in keyof T as IsReadonly<Pick<T, K>> extends true ? K : never]: K
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]
