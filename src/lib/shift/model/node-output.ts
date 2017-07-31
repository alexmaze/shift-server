export class Output {
  port: string
  value: any
  valueType: string

  constructor(port, value, valueType) {
    this.port = port
    this.value = value
    this.valueType = valueType
  }
}
