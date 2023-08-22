import type { Debug, Equal, Expect, IsAny } from '@type-challenges/utils'

class ClassA {}

type InferComputed<C extends Record<string, any>> = { [K in keyof C]: ReturnType<C[K]> }

type PropConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T }

type PropType<T> = PropConstructor<T> | PropConstructor<T>[]

type Prop<T = any> = PropType<T> | { type?: PropType<T> }

// 注意这里可以推断传入的泛型
type InferPropType<P> =
  P extends Prop<infer T>
    ? unknown extends T
      ? any
      : T
    : any

// 根据 porps 来解析返回的类型
type InferProps<P extends Record<string, any>> = {
  [K in keyof P]: InferPropType<P[K]>
}

/**
 * 参考：https://github.com/type-challenges/type-challenges/issues/215
 */
declare function VueBasicProps<P extends Record<string, any>, D, C extends Record<string, any>, M, Props = InferProps<P>>(
  options: {
    props?: P,
    data(this: Props): D,
    computed: C & ThisType<Props & D & InferComputed<C> & M>,
    methods: M & ThisType<Props & D & InferComputed<C> & M>
  }
): Props & D & InferComputed<C> & M

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

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
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})
