import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 为什么在 Record<PropertyKey, any> 中要使用 any：
 * 对于 interface 来说是可以新增属性的，所以 T extends Record<PropertyKey, unknown> 校验是没法通过的，
 * 除非使用 type 定义或者为 interface 加上 [key:  PropertyKey]: unknown 的索引签名
 * 参考：https://juejin.cn/post/7057471253279408135
 */
type DeepMutable<T extends Record<PropertyKey, any>> = {
  -readonly [K in keyof T]: T[K] extends Record<string, unknown> | readonly unknown[] ? DeepMutable<T[K]> : T[K]
}

interface Test1 {
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly meta: {
    readonly author: string
  }
}
type Test2 = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 's'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
interface DeepMutableTest1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type DeepMutableTest2 = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 's'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>,
]

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>,
]
