export enum NodeTypePrimary {
  Device = "device",
  Virtual = "virtual"
}

export enum INodeValueType {
  Bool = "bool",
  Int = "int"
}

export enum INodeInputSourceType {
  Reference = "ref",
  Constant = "const"
}

export interface INodeType {
  primary: NodeTypePrimary
  secondary: string
  tertiary: string
}

export interface INodeInput {
  port: number // 0 ~ n
  value: any
  valueType: INodeValueType
  type: INodeInputSourceType
  refId: string
  refOutputPort: number
}

export interface INodeOutput {
  port: number
  value: any
  valueType: INodeValueType
}

export interface INode {
  id: string
  address: string
  type: INodeType
  inputs: INodeInput[]
  outputs: INodeOutput[]
}
