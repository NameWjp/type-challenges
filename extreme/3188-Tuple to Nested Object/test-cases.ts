import type { Equal, Expect } from '@type-challenges/utils'

/**
 * O extends string ? O : never 也可以写成 O & string，更加简洁
 */
type TupleToNestedObject<T extends unknown[], V> = T extends [...infer U, infer O]
  ? TupleToNestedObject<U, { [K in O extends string ? O : never]: V }>
  : V

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]
