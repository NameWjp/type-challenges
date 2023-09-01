import type { Equal, Expect } from '@type-challenges/utils'

type GetValue<T, List> = List extends [infer F, ...infer R]
  ? F extends [infer A, infer B]
    ? Equal<T, A> extends true
      ? B
      : GetValue<T, R>
    : never
  : never;

type UnionReplace<T, List> = T extends unknown
  ? [GetValue<T, List>] extends [never]
    ? T
    : GetValue<T, List>
  : never

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null], [Date, Function]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]
