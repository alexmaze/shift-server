import { Input } from "./node-input"
import { Output } from "./node-output"

export class NodeModel {
  id: string
  type: string
  address: string
  operation: string
  label: string
  position: string
  inputs: Input[]
  outputs: Output[]

  constructor(id, type, address, operation, label, position, inputs, outputs) {
    this.id = id // 系统保存id
    this.type = type
    this.address = address // 硬件地址
    this.operation = operation // 某些类型的patch需要填写operation, ==/!=/>/</+/-/*...
    this.label = label // 用户设置label
    this.position = position
    this.inputs = inputs
    this.outputs = outputs
  }
}
