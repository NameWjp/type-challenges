import type { Equal, Expect } from '@type-challenges/utils'

type AddPrefix<T extends string[], P extends string> = T extends [] ? '' : `${P}${T[number]}`

type BEM<T extends string, P extends string[], F extends string[]> = `${T}${AddPrefix<P, '__'>}${AddPrefix<F, '--'>}`

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]
