import { INode, IContext, NodeTypePrimary } from "./models"
import { Writer } from "./utils/writer"
import { renderLayout } from "./templates/layout"
import { getNodeVarName, getNodeVarType } from "./utils/node"

export class Shift {
  context: IContext
  data: INode[]
  loopDelay: number

  constructor(data: INode[], loopDelay = 100) {
    this.data = data
    this.loopDelay = loopDelay

    this.context = {
      setupWriter: new Writer({ paddingLeft: 2 }),
      loopWriter: new Writer({ paddingLeft: 4 }),
      data
    }
  }

  render(): string {
    const { setupWriter, loopWriter } = this.context
    return renderLayout(
      this.loopDelay,
      setupWriter.toString(),
      loopWriter.toString()
    )
  }

  compile() {
    const { setupWriter, loopWriter } = this.context
    setupWriter.clean()
    loopWriter.clean()

    // compile setup
    for (const node of this.data) {
      setupWriter.writeLine(`${getNodeVarType(node)} ${getNodeVarName(node)};`)

      if (!!node.address) {
        setupWriter.writeLine(`${getNodeVarName(node)} = ${node.address};`)
      }
      setupWriter.writeLine()
    }

    // compile loop
  }
}
