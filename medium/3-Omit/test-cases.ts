import type { Equal, Expect } from '@type-challenges/utils'

// 使用这种写法会丢失 readonly 等修饰符,例子见下
// type MyExclude<T, U> = T extends U ? never : T;
// type MyOmit<T, K extends keyof T> = {
//   [P in MyExclude<keyof T, K>]: T[P]
// }

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

interface Todo2 {
  readonly title: string
  description: string
  completed: boolean
}
// 这里的 title 的 readonly 修饰符不会被丢掉
type Test = MyOmit<Todo2, 'completed'>;

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}
