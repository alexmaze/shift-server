import { INode, IContext, INodeType, NodeTypePrimary } from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"

const TYPE: INodeType = {
  primary: NodeTypePrimary.Virtual,
  secondary: "general",
  tertiary: "bool_pitch"
}

export class BoolPitchHandler extends AbstractNodeHandler {
  getSupportedType() {
    return TYPE
  }

  handle(node: INode, ctx: IContext) {
    // TODO
    console.log("handle")
  }
}
