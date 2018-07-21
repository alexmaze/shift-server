import { INode, IContext } from "../models"
import { IHander, IHandlerClass } from "./model"
import { getNodeTypeKey } from "../utils/node"
import { NumberNodeHandler } from "./hardware/sensor/number-node"
import { SlidingRheostatHandler } from "./hardware/sensor/sliding-rheostat"
import { BoolPitchHandler } from "./virtual/general/bool-pitch"
import { NumberPitchHandler } from "./virtual/general/number-pitch"
import { LogicAndHandler } from "./virtual/logic/logic-and"
import { LogicConditionalHandler } from "./virtual/logic/logic-conditional"
import { LogicNotHandler } from "./virtual/logic/logic-not"
import { LogicOrHandler } from "./virtual/logic/logic-or"
import { ControlIfHandler } from "./virtual/control/control-if"
import { MathAbsHandler } from "./virtual/math/math-abs"
import { OperatorBitwiseHandler } from "./virtual/operator/operator-bitwise"
import { OperatorOperationHandler } from "./virtual/operator/operator-operation"

export class NodeHandlerManager {
  handlers: Map<string, IHander>

  constructor() {
    this.handlers = new Map()

    this.register(NumberNodeHandler)
      .register(SlidingRheostatHandler)

      .register(BoolPitchHandler)
      .register(NumberPitchHandler)

      .register(LogicAndHandler)
      .register(LogicConditionalHandler)
      .register(LogicNotHandler)
      .register(LogicOrHandler)

      .register(ControlIfHandler)

      .register(MathAbsHandler)

      .register(OperatorBitwiseHandler)
      .register(OperatorOperationHandler)
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
