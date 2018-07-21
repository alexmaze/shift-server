import { INode, IContext } from "../models"
import { IHander } from "./model"

export class NodeHandlerManager implements IHander {
  handlers: IHander[]

  test(node: INode) {
    return true
  }

  handle(node: INode, ctx: IContext) {
    for (const h of this.handlers) {
      if (h.test(node)) {
        return h.handle(node, ctx)
      }
    }
  }

  register(handler: IHander) {
    this.handlers.push(handler)
  }
}

export const nodeHandlerManager = new NodeHandlerManager()
