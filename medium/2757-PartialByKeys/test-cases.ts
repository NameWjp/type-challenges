import type { Equal, Expect } from '@type-challenges/utils'

// 可以遍历联合类型的 key 来重新生成类型
type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}

type PartialByKeys<T, U extends keyof T = keyof T> = IntersectionToObj<{
  [K in U]?: T[K]
} & {
  [K in keyof T as K extends U ? never : K]: T[K]
}>

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]
