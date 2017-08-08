import { NodeModel } from "../../common-node"

export class RGBNode extends NodeModel {
  constructor(id, type, address, operation, label, position, inputs, outputs) {
    super(id, type, address, operation, label, position, inputs, outputs)
  }

  handle(nodes) {
    const ret = []

    const indent = "        "
    let comment = indent + "// RGBNode device_write\n"
    ret.push(comment)

    let index = -1
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === this.id) {
        index = i
      }
    }

    let variantName = "node" + index

    let input = this.inputs[0]

    switch (input.type) {
      case "ref":
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === input.refId) {
            let sourceOutputs = nodes[i].outputs
            for (let j = 0; j < sourceOutputs.length; j++) {
              if (sourceOutputs[j].port === input.refOutputPort) {
                let code =
                  indent +
                  variantName +
                  ".inputs[0] = node" +
                  i +
                  ".outputs[" +
                  j +
                  "];"
                ret.push(code)
              }
            }
          }
        }
        break
      default:
        throw "ERROR"
    }

    let code =
      indent +
      "param.address = " +
      this.id +
      ";\n" +
      indent +
      "param.command = 0;\n" +
      indent +
      "param.value = " +
      variantName +
      ".inputs[0];\n" +
      indent +
      "device_write(&param);\n"

    ret.push(code)
    return ret.join("")
  }
}
