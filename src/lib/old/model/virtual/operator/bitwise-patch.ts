import { NodeModel } from "../../common-node.js"

export class BitwisePatch extends NodeModel {
  constructor(id, type, address, operation, label, position, inputs, outputs) {
    super(id, type, address, operation, label, position, inputs, outputs)
  }

  handle(nodes) {
    let prev = this.inputs[0]
    let prevValue

    switch (prev.type) {
      case "ref":
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === prev.refId) {
            let sourceinputs = nodes[i].inputs
            for (let j = 0; j < sourceinputs.length; j++) {
              if (sourceinputs[j].port === prev.refOutputPort) {
                prev.value = sourceinputs[j].value
                prev.valueType = sourceinputs[j].valueType
              }
            }
          }
        }
        prevValue = prev.value
        break
      case "const":
        prevValue = prev.constValue
        break
      default:
        throw "ERROR"
    }

    let post = this.inputs[1]
    let postValue

    switch (post.type) {
      case "ref":
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === post.refId) {
            let sourceinputs = nodes[i].inputs
            for (let j = 0; j < sourceinputs.length; j++) {
              if (sourceinputs[j].port === post.refOutputPort) {
                post.value = sourceinputs[j].value
                post.valueType = sourceinputs[j].valueType
              }
            }
          }
        }
        postValue = post.value
        break
      case "const":
        postValue = post.constValue
        break
      default:
        throw "ERROR"
    }

    switch (this.operation) {
      case "&":
        this.outputs[0].value = prevValue & postValue
        break
      case "|":
        this.outputs[0].value = prevValue | postValue
        break
      case "^":
        this.outputs[0].value = prevValue ^ postValue
        break
      case "~":
        // this.outputs[0].value = prevValue ~ postValue;
        break
      case ">>":
        this.outputs[0].value = prevValue >> postValue
        break
      case "<<":
        this.outputs[0].value = prevValue << postValue
        break
      default:
        throw "ERROR"
    }
  }
}
