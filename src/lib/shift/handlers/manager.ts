import { INode, IContext } from "../models"
import { IHander, IHandlerClass } from "./model"
import { getNodeTypeKey } from "../utils/node"
import { NumberNodeHandler } from "./hardware/sensor/number-node"
import { SlidingRheostatHandler } from "./hardware/sensor/sliding-rheostat"
import { BoolPitchHandler } from "./virtual/general/bool-pitch"

export class NodeHandlerManager {
  handlers: Map<string, IHander>

  constructor() {
    this.handlers = new Map()

    this.register(NumberNodeHandler)
      .register(SlidingRheostatHandler)
      .register(BoolPitchHandler)
  }

  handle(node: INode, ctx: IContext) {
    const key = getNodeTypeKey(node.type)

    if (!this.handlers.has(key)) {
      throw new Error(`No handler for node type ${key}`)
    }

    const handler = this.handlers.get(key)

    handler.handle(node, ctx)
  }

  register(handlerClz: IHandlerClass) {
    const handler = new handlerClz()
    const key = getNodeTypeKey(handler.getSupportedType())

    if (this.handlers.has(key)) {
      throw new Error(`Duplicate register node handler for ${key}`)
    }

    this.handlers.set(key, handler)

    return this
  }
}
