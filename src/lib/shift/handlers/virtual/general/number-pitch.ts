import { INode, IContext, INodeType, NodeTypePrimary } from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"
import { writeCommonSetup } from "../../../utils/handler"
import { getNodeVarName, findOutputPort } from "../../../utils/node"

const TYPE: INodeType = {
  primary: NodeTypePrimary.Virtual,
  secondary: "general",
  tertiary: "number_pitch"
}

export class NumberPitchHandler extends AbstractNodeHandler {
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
    const op0 = findOutputPort(node, 0)
    setupWriter.writeLine(`${varName}.data[1] = ${op0.value};`)

    // LOOP
    // no loop
  }
}
