import type { Equal, Expect } from '@type-challenges/utils'

/**
 * typescript 4.1 引入了四个编译器内部实现的类型：
 *   Uppercase：将字符串全部大写
 *   Lowercase：将字符串全部小写
 *   Capitalize：将字符串首字母大写
 *   Uncapitalize：将字符串首字母小写
 * 本题主要考察 Capitalize 或 Uncapitalize 的使用
 */
type KebabCase<T extends string> = T extends `${infer P}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<P>}${KebabCase<U>}`
    : `${Uncapitalize<P>}-${KebabCase<U>}`
  : T;

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]
