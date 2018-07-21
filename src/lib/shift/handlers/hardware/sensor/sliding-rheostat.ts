import { INode, IContext, INodeType, NodeTypePrimary } from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"
import { writeCommonSetup } from "../../../utils/handler"
import { getNodeVarName } from "../../../utils/node"

export const SLIDING_RHEOSTAT_TYPE: INodeType = {
  primary: NodeTypePrimary.Device,
  secondary: "sensor",
  tertiary: "sliding_rheostat"
}

export class SlidingRheostatHandler extends AbstractNodeHandler {
  getSupportedType() {
    return SLIDING_RHEOSTAT_TYPE
  }

  handle(node: INode, ctx: IContext) {
    const { setupWriter, loopWriter } = ctx

    const varName = getNodeVarName(node)

    // DEF
    // no extra def

    // SETUP
    writeCommonSetup(setupWriter, node)

    // LOOP
    loopWriter.writeLine(`${varName}.command = CMD_READ_DATA;`)
    loopWriter.writeLine(`device_read(&${varName});`)
    loopWriter.writeLine()
  }
}
