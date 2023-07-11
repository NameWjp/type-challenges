import type { Equal, Expect } from '@type-challenges/utils'

/**
 * extends 可以以两种方式使用:
 * 1. extends 左边是单个类型时，普通用法，判断是否继承
 * 2. extends 左边是联合类型且是泛型时，称为分配条件类型（非常常用和重要），表示挨个遍历联合类型中的类型，然后用 | 连接
 * https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 */
type LookUp<U, T> = U extends { type: T } ? U : never;

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]
