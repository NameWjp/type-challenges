import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

/**
 * 需要注意的是：前面的 K 通过 as 强转后和后面的 K 类型不一样
 */
type Flip<T extends Record<string, string | number | boolean>> = {
  [K in keyof T as `${T[K]}`]: K
}


type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
]
