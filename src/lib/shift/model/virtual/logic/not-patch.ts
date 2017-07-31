import { NodeModel } from "../../common-node"

export class NotPatch extends NodeModel {
  constructor(id, type, address, operation, label, position, inputs, outputs) {
    super(id, type, address, operation, label, position, inputs, outputs)
  }

  handle(nodes) {
    let index = -1
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === this.id) {
        index = i
      }
    }

    let origin = this.inputs[0]
    let originValue

    switch (origin.type) {
      case "ref":
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === origin.refId) {
            let sourceinputs = nodes[i].inputs
            for (let j = 0; j < sourceinputs.length; j++) {
              if (sourceinputs[j].port === origin.refOutputPort) {
                origin.value = sourceinputs[j].value
                origin.valueType = sourceinputs[j].valueType
              }
            }
          }
        }
        originValue = origin.value
        break
      case "const":
        originValue = origin.constValue
        break
      default:
        throw "ERROR"
    }

    this.outputs[0].value = !originValue

    // generate c code
    let variantName = "node" + index
    let code = variantName + ".output =" + this.outputs[0].value
  }
}
