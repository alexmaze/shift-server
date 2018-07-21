import { INode, IContext, INodeType, NodeTypePrimary } from "../../../models"
import { AbstractNodeHandler } from "../../abstract-handler"

export const NUMBER_NODE_TYPE: INodeType = {
  primary: NodeTypePrimary.Device,
  secondary: "sensor",
  tertiary: "number_node"
}

/**
 * device -> sensor -> number_node
 */
export class NumberNodeHandler extends AbstractNodeHandler {
  getSupportedType() {
    return NUMBER_NODE_TYPE
  }

  handle(node: INode, ctx: IContext) {
    // TODO
    console.log("handle")
  }
}
