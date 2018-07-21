import { Writer } from "./writer"
import { INode } from "../models"
import { getNodeVarType, getNodeVarName } from "./node"

export function writeCommonSetup(writer: Writer, node: INode) {
  writer.writeLine()
  writer.writeLine(`${getNodeVarType(node)} ${getNodeVarName(node)};`)
  if (!!node.address) {
    writer.writeLine(`${getNodeVarName(node)}.address = ${node.address};`)
  }
}
