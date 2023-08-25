import type { Equal, Expect } from '@type-challenges/utils'

type CamelCaseKey<T> = T extends `${infer F}_${infer R}`
  ? R extends ''
    ? T
    : CamelCaseKey<`${F}${Capitalize<R>}`>
  : T;

type CamelizeArray<T> = T extends [infer F, ...infer R]
  ? [Camelize<F>, ...CamelizeArray<R>]
  : []

type Camelize<T> = {
  [K in keyof T as CamelCaseKey<K>]: T[K] extends Record<PropertyKey, unknown>
    ? Camelize<T[K]>
    : T[K] extends any[]
      ? CamelizeArray<T[K]>
      : T[K]
}

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]
