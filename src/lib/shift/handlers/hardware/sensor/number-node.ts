import {
  INode,
  IContext,
  INodeType,
  NodeTypePrimary,
  NodeInputSourceType
} from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"
import { writeCommonSetup } from "../../../utils/handler"
import { getNodeVarName, findInputPort, findRefNode } from "../../../utils/node"

export const NUMBER_NODE_TYPE: INodeType = {
  primary: NodeTypePrimary.Device,
  secondary: "sensor",
  tertiary: "number_node"
}

export class NumberNodeHandler extends AbstractNodeHandler {
  getSupportedType() {
    return NUMBER_NODE_TYPE
  }

  handle(node: INode, ctx: IContext) {
    const { setupWriter, loopWriter } = ctx
    const varName = getNodeVarName(node)

    // DEF
    // no extra diff

    // SETUP
    writeCommonSetup(setupWriter, node)

    // LOOP
    // 该节点有两个输入，第一个是开关，第二个是显示数字 1-99

    const ip1 = findInputPort(node, 1)
    if (ip1.type === NodeInputSourceType.Reference) {
      const targetNode = findRefNode(ip1.refId, ctx.data)
      const targetNodeVarName = getNodeVarName(targetNode)
      loopWriter.writeLine(`${varName}.data[1] = ${targetNodeVarName}.data[1];`)
    } else {
      loopWriter.writeLine(`${varName}.data[1] = ${ip1.value};`)
    }

    loopWriter.writeLine(`${varName}.command = CMD_WRITE_DATA;`)

    const ip0 = findInputPort(node, 0)
    if (ip0.type === NodeInputSourceType.Reference) {
      const targetNode = findRefNode(ip0.refId, ctx.data)
      const targetNodeVarName = getNodeVarName(targetNode)

      loopWriter.writeLine(`if (${targetNodeVarName}.data[1] == false) {`)
      loopWriter.writeLine(`  ${varName}.data[1] = 0;`)
      loopWriter.writeLine(`}`)
    } else {
      loopWriter.writeLine(`if (${ip0.value} == false) {`)
      loopWriter.writeLine(`  ${varName}.data[1] = 0;`)
      loopWriter.writeLine(`}`)
    }

    loopWriter.writeLine(`device_write(&${varName});`)
    loopWriter.writeLine()
  }
}
