import { IHander } from "./model"
import { INode, IContext, INodeType } from "../models"

/**
 * abstract node handler
 */
export abstract class AbstractNodeHandler implements IHander {
  abstract getSupportedType(): INodeType
  abstract handle(node: INode, ctx: IContext)
}
