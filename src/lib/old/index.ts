import { NodeModel } from "./model/common-node"
import { NodeHandler } from "./handler/node-handler"

export interface IData {
  nodes: NodeModel[]
}

export function shift(data: IData) {
  const ret = []
  const nodes = data.nodes

  const deviceDataType = "DeviceDataType param;\n"

  console.log("==========creating nodes start==========")

  const nodeModels = []
  for (let i = 0; i < nodes.length; i++) {
    const node = NodeHandler.createNode(nodes[i])
    nodeModels.push(node)
  }

  console.log("==========creating nodes end==========")

  // 以下开始生成代码
  console.log("==========handling nodes start==========\n")

  const initialCode =
    '#include "cAppTask.h"\n\n' + "osThreadId cI2C_Thread_Task1;\n"

  ret.push(initialCode)

  const dataStructureCode =
    "struct Node{\n" +
    "    int inputs[20];\n" +
    "    int outputs[20];\n" +
    "};\n"

  ret.push(dataStructureCode)

  ret.push("void cI2C_Task1Fun(void const * argument){")

  ret.push("    " + deviceDataType)

  for (let i = 0; i < nodeModels.length; i++) {
    ret.push("    Node node" + i + ";")
  }
  ret.push("")

  ret.push("    while(1) {")
  for (let i = 0; i < nodeModels.length; i++) {
    ret.push(nodeModels[i].handle(nodes))
  }
  ret.push("        osDelay(1000);\n")
  ret.push("        osDelay(100);")
  ret.push("    }")
  ret.push("}\n")

  const endCode =
    "void cI2C_Task1(void) {\n" +
    "    osThreadDef(cI2C_Handle_Task1, cI2C_Task1Fun, osPriorityNormal, 0, 256);\n" +
    "    cI2C_Thread_Task1 = osThreadCreate(osThread(cI2C_Handle_Task1), NULL);\n" +
    "}\n\n" +
    "void cI2C_Task(void) {\n" +
    "    cI2C_Task1();\n" +
    "}"

  ret.push(endCode)

  console.log("==========handling nodes end==========\n")
  return ret.join("\n")
}
