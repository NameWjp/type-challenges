import type { Equal, Expect } from '@type-challenges/utils'

type ObjectFromEntries<T extends [string, unknown]> = {
  [K in T[0]]: T extends [K, unknown] ? T[1] : never
}

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]


type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]
