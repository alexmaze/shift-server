export interface IHardware {
  id: string
  image: {
    size?: number
    path?: string
  }
  data: {
    updated?: number
    value?: string
  }
  components: {
    updated?: number
    value?: string
  }
  lastReportAt: Date
}

export class HardwareModel {
  static hardwares = new Map<string, IHardware>()

  static find(id: string): IHardware {
    return (
      this.hardwares.get(id) || {
        id,
        image: {},
        data: {},
        components: {},
        lastReportAt: null
      }
    )
  }

  static save(hd: IHardware) {
    this.hardwares.set(hd.id, hd)
  }

  static all() {
    return this.hardwares.values()
  }
}
