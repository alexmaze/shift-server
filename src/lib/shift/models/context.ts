import { Writer } from "../utils/writer"
import { INode } from "./node"

export interface IContext {
  data: INode[]
  setupWriter: Writer
  loopWriter: Writer
}
