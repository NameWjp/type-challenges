import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 1. 创建两个类型 T、U，其中 U 等于 T
 * 2. 利用分配条件类型：T extends T，分配 T 的每一个类型
 * 3. 再次利用分配条件类型：U extends T，分配 U 的类型。如果 T 是联合类型，则这里必返回 true | unknown，实际就是 unknown
 * 4. 利用 extends true 来判断是否是联合类型
 * 答案地址：https://github.com/type-challenges/type-challenges/issues/1140
 */
type IsUnion<T, U = T> = (
  T extends T
    ? U extends T
      ? true
      : unknown
    : never
) extends true ? false : true;

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]
