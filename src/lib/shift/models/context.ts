import { Writer } from "../utils/writer"
import { INode } from "./node"

export interface IContext {
  data: INode[]

  setupWriter: Writer // 用于定义变量
  loopWriter: Writer // 输出 loop 循环中代码
  defWriter: Writer // 输出 .h 文件中定义
}
