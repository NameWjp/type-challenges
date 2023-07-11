import type { Equal, Expect } from '@type-challenges/utils'

// 类型判断参考：https://github.com/type-challenges/type-challenges/issues/22057
type PickPrimitive<T> = T extends (...args: unknown[]) => unknown
  ? Function
  : T extends { valueOf: () => infer P }
    ? P
    : T

type ToPrimitive<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> | readonly unknown[] ? ToPrimitive<T[K]> : PickPrimitive<T[K]>
}

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]
