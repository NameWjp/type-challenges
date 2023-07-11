import type { Equal, Expect } from '@type-challenges/utils'

type Combs<T extends unknown[]> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? Rest['length'] extends 0
    ? never
    : `${First} ${Rest[number]}` | Combs<Rest>
  : never;

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']
type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>,
]
