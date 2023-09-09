import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 参考：https://github.com/type-challenges/type-challenges/issues/3697
 * 使用 & 可以实现函数重载
 * Curry<T, R, [...D, F]> 可以理解为将 P 中的参数依次放到 D 中，每次做一些事情
 * (...args: [...D, F]) => Curry<T, R> 可以理解为接受 D 个参数，返回剩余参数对应的结果
 */
type Curry<P, R, D extends unknown[] = []> = P extends [infer F, ...infer T]
  ? T extends []
    ? (...args: [...D, F]) => R
    : Curry<T, R, [...D, F]> & ((...args: [...D, F]) => Curry<T, R>)
  : () => R

declare function DynamicParamsCurrying<P extends unknown[], R>(func: (...args: P) => R): Curry<P, R>

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal< typeof curried1Return1, boolean>>,
  Expect<Equal< typeof curried1Return2, boolean>>,
  Expect<Equal< typeof curried1Return3, boolean>>,

  Expect<Equal< typeof curried2Return1, boolean>>,
  Expect<Equal< typeof curried2Return2, boolean>>,
  Expect<Equal< typeof curried2Return3, boolean>>,
  Expect<Equal< typeof curried2Return4, boolean>>,
  Expect<Equal< typeof curried2Return5, boolean>>,
  Expect<Equal< typeof curried2Return6, boolean>>,
  Expect<Equal< typeof curried2Return7, boolean>>,
  Expect<Equal< typeof curried2Return8, boolean>>,
  Expect<Equal< typeof curried2Return9, boolean>>,
  Expect<Equal< typeof curried2Return10, boolean>>,
]
