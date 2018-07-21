import { INode, IContext, INodeType, NodeTypePrimary } from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"

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
    // TODO
    console.log("handle")
  }
}
