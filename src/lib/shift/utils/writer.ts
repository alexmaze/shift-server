export interface IWriterConfig {
  paddingLeft: number
}

export class Writer {
  data = []

  config: IWriterConfig

  constructor(config?: IWriterConfig) {
    this.config = config || {
      paddingLeft: 0
    }
  }

  clean() {
    this.data = []
  }

  write(...data: string[]) {
    this.data.push(...data)
  }

  writeLine(...data: string[]) {
    const { paddingLeft } = this.config
    this.write(this._getPadding(paddingLeft), ...data, "\n")
  }

  toString() {
    return this.data.join("")
  }

  _getPadding(num: number) {
    const ret = []
    for (let i = 0; i < num; i++) {
      ret.push(" ")
    }
    return ret.join("")
  }
}
