import type { Equal, Expect } from '@type-challenges/utils'

// 可以遍历联合类型的 key 来重新生成类型
type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}

// 这里的 -? 可参考 TS 内置的 Required 类型写法
type RequiredByKeys<T, U extends keyof T = keyof T> = IntersectionToObj<{
  [K in U]-?: T[K]
} & {
  [K in keyof T as K extends U ? never : K]: T[K]
}>

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
]
