import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 这里必须是 Record<string, any> 不能是 Record<string, (...args: unknown[]) => unknown> 否则不能正确推断，神奇的 ts
 */
type GetComputed<C extends Record<string, any>> = { [K in keyof C]: ReturnType<C[K]> }

/**
 * ThisType 一般用于字面量对象中，用于定义字面量对象的 this
 * ref: https://jkchao.github.io/typescript-book-chinese/typings/thisType.html
 */
declare function SimpleVue<D, C extends Record<string, any>, M>(
  options: {
    data: (this: {}) => D,
    computed: C & ThisType<D & GetComputed<C> & M>,
    methods: M & ThisType<D & GetComputed<C> & M>,
  }
): D & GetComputed<C> & M

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})
