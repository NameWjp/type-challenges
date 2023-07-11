import type { Alike, Expect } from '@type-challenges/utils'

type MyReadonly2<T, U extends keyof T = keyof T> = {
  // 这里执行优先级： 先执行 in keyof 引出类型 P，再执行 extends 缩小范围，最后执行 as 强转
  [P in keyof T as P extends U ? never : P]: T[P]
} & {
  readonly [P in U]: T[P]
}

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
