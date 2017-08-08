import { NodeModel } from "../../common-node"

export class SwitchNode extends NodeModel {
  constructor(id, type, address, operation, label, position, inputs, outputs) {
    super(id, type, address, operation, label, position, inputs, outputs)
  }

  handle(nodes) {
    const ret = []
    const indent = "        "
    let index = -1
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === this.id) {
        index = i
      }
    }
    // TODO device value 命名
    const variantName = "node" + index

    const comment = indent + "// SwitchNode device_read\n"
    const code =
      indent +
      "param.address = " +
      this.id +
      ";\n" +
      indent +
      "param.command = 0x40;\n" +
      indent +
      "param.value = 0;\n" +
      indent +
      "device_read(&param);\n" +
      indent +
      variantName +
      ".outputs[0] = param.value;\n"
    ret.push(comment + code)
    return ret.join("")
  }
}
