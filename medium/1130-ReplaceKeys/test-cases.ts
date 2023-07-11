import type { Equal, Expect } from '@type-challenges/utils'

// 对于联合类型 T，传入泛型后会自动触发分配条件类型，type B 等效为 C<NodeA> | C<NodeB> | C<NodeC>
// type C<T> = {
//   [K in keyof T]: T[K]
// }
// type B = C<NodeA | NodeB | NodeC>

// 所以不需要下面 T extends T 这种写法
// type ReplaceKeys<T, K, V> = T extends T
//   ? {
//       [Key in keyof T]: Key extends K
//         ? Key extends keyof V
//           ? V[Key]
//           : never
//         : T[Key]
//     }
//   : never

type ReplaceKeys<U, T, Y> = { [K in keyof U]: K extends T ? K extends keyof Y ? Y[K] : never : U[K] }


type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]



