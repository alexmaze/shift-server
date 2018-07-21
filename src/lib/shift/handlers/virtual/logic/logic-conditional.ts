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
  tertiary: "logic_conditional"
}

export class LogicConditionalHandler extends AbstractNodeHandler {
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

    const ip1 = findInputPort(node, 0)
    if (ip1.type === NodeInputSourceType.Reference) {
      const targetNode = findRefNode(ip1.refId, ctx.data)
      const targetNodeVarName = getNodeVarName(targetNode)

      loopWriter.writeLine(`${varName}_1 = ${targetNodeVarName}.data[1];`)
    } else {
      loopWriter.writeLine(`${varName}_1 = ${ip1.value};`)
    }

    loopWriter.writeLine(
      `${varName}.data[1] = ${varName}_0 ${node.extra.operator} ${varName}_1;`
    )
  }
}
