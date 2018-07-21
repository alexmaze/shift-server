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
  tertiary: "logic_not"
}

export class LogicNotHandler extends AbstractNodeHandler {
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

    const ip0 = findInputPort(node, 0)
    if (ip0.type === NodeInputSourceType.Reference) {
      const targetNode = findRefNode(ip0.refId, ctx.data)
      const targetNodeVarName = getNodeVarName(targetNode)

      loopWriter.writeLine(`${varName}_0 = ${targetNodeVarName}.data[1];`)
    } else {
      loopWriter.writeLine(`${varName}_0 = ${ip0.value};`)
    }

    loopWriter.writeLine(`${varName}.data[1] = !${varName}_0;`)
  }
}
