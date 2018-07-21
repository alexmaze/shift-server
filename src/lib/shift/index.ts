import { INode, IContext } from "./models"

import { Writer } from "./utils/writer"
import { getNodeVarName, getNodeVarType } from "./utils/node"

import { renderC } from "./templates/cAppTask.c"
import { renderH } from "./templates/cAppTask.h"
import { NodeHandlerManager } from "./handlers"

export class Shift {
  context: IContext
  data: INode[]
  loopDelay: number
  handler: NodeHandlerManager

  constructor(data: INode[], loopDelay = 100) {
    this.data = data
    this.loopDelay = loopDelay

    this.handler = new NodeHandlerManager()

    this.context = {
      setupWriter: new Writer({ paddingLeft: 2 }),
      loopWriter: new Writer({ paddingLeft: 4 }),
      defWriter: new Writer({ paddingLeft: 0 }),
      data
    }
  }

  renderC(): string {
    const { setupWriter, loopWriter } = this.context
    return renderC(
      this.loopDelay,
      setupWriter.toString(),
      loopWriter.toString()
    )
  }

  renderH(): string {
    const { defWriter } = this.context
    return renderH(defWriter.toString())
  }

  compile() {
    const { setupWriter, loopWriter, defWriter } = this.context
    setupWriter.clean()
    loopWriter.clean()
    defWriter.clean()

    // compile each node
    for (const node of this.data) {
      this.handler.handle(node, this.context)
    }
  }
}
