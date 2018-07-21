import { INode, IContext } from "../models"

export interface IHander {
  test: (node: INode) => boolean
  handle: (node: INode, ctx: IContext) => void
}
