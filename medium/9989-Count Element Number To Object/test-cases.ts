import type { Equal, Expect } from '@type-challenges/utils'

type AddCount<T extends Record<PropertyKey, unknown[]>, K extends keyof T> = Omit<T, K> & Record<K, [...T[K], 0]>

type Flatten<T extends unknown[], Result extends unknown[] = []> = T extends [infer First, ...infer Rest]
  ? [First] extends [never]
    ? Flatten<Rest, Result>
    : First extends unknown[]
      ? Flatten<First, Result>
      : Flatten<Rest, [...Result, First]>
  : Result;

type TransformResult<T extends Record<PropertyKey, unknown[]>> = {
  [K in keyof T]: T[K]['length']
}

type Count<
  T extends unknown[],
  Result extends Record<PropertyKey, unknown[]> = {}
> = T extends [infer First extends PropertyKey, ...infer Rest extends PropertyKey[]]
  ? First extends keyof Result
    ? Count<Rest, AddCount<Result, First>>
    : Count<Rest, Result & Record<First, [0]>>
  : TransformResult<Result>

type CountElementNumberToObject< T extends unknown[]> = Count<Flatten<T>>


type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  }
  >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]
