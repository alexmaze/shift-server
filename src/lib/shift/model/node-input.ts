export class Input {
  port: string
  type: string
  refId: string
  refOutputPort: string
  constValue: string
  value: string
  valueType: string
  sub: string

  constructor(
    port,
    type,
    refId,
    refOutputPort,
    constValue,
    value,
    valueType,
    sub,
  ) {
    this.port = port // 输入孔位：孔位根据设计图从上往下定义
    // 位于不同顺序位置上的输入代表不同输入类型
    // 同时有多输入情况下和数组index保持一致
    // 多选一的情况下，用于判定选择类型，此时为string类型
    this.type = type // 输入类型：ref/const
    this.refId = refId // ref数据来源
    this.refOutputPort = refOutputPort // ref数据来源端口
    this.constValue = constValue // const数据值
    this.value = value // 值
    this.valueType = valueType // 值类型
    this.sub = sub // 子输入，主要用于模块节点，输入有其他参数
  }
}
