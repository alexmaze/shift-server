import {
  INode,
  IContext,
  INodeType,
  NodeTypePrimary,
  NodeInputSourceType
} from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"
import { writeCommonSetup } from "../../../utils/handler"
import {
  getNodeVarName,
  findOutputPort,
  findInputPort,
  findRefNode
} from "../../../utils/node"

const TYPE: INodeType = {
  primary: NodeTypePrimary.Virtual,
  secondary: "logic",
  tertiary: "logic_and"
}

export class LogicAndHandler extends AbstractNodeHandler {
  getSupportedType() {
    return TYPE
  }

  handle(node: INode, ctx: IContext) {
    const { setupWriter, loopWriter } = ctx
    const varName = getNodeVarName(node)

    // DEF
    // no extra diff

    // SETUP
    writeCommonSetup(setupWriter, node)

    // LOOP
    const rules = []

    for (let i = 0; i < node.inputs.length; i++) {
      const ipi = findInputPort(node, i)
      if (ipi.type === NodeInputSourceType.Reference) {
        const targetNode = findRefNode(ipi.refId, ctx.data)
        const targetNodeVarName = getNodeVarName(targetNode)

        loopWriter.writeLine(`${varName}_${i} = ${targetNodeVarName}.data[1];`)
      } else {
        loopWriter.writeLine(`${varName}_${i} = ${ipi.value};`)
      }

      rules.push(`${varName}_${i}`)
    }

    loopWriter.writeLine(`${varName}.data[1] = ${rules.join(" && ")};`)
  }
}
