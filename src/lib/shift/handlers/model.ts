import { INode, IContext, INodeType } from "../models"

export interface IHander {
  getSupportedType: () => INodeType
  handle: (node: INode, ctx: IContext) => void
}

export interface IHandlerClass {
  new (): IHander
}
