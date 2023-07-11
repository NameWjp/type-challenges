import type { Equal, Expect } from '@type-challenges/utils'

/**
 * -readonly 用法见：
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#readonly-mapped-type-modifiers-and-readonly-arrays
 */
type Mutable<T extends Record<PropertyKey, unknown> | readonly unknown[]> = {
  -readonly [K in keyof T]: T[K]
}

interface Todo1  {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]
