import * as fs from "fs"
import { NodeModel } from "./model/common-node"

import { NodeHandler } from "./handler/node-handler"

const data = fs.readFileSync("../api_test2", "utf-8")
const nodes = JSON.parse(data).nodes

const deviceDataType = "DeviceDataType param;\n"

console.log("==========creating nodes start==========")

const nodeModels = []
for (let i = 0; i < nodes.length; i++) {
  const node = NodeHandler.createNode(nodes[i])
  nodeModels.push(node)
}

console.log("==========creating nodes end==========")

console.log("\n")

// 以下开始生成代码
console.log("==========handling nodes start==========\n")

let initialCode =
  '#include "cAppTask.h"\n\n' + "osThreadId cI2C_Thread_Task1;\n"

console.log(initialCode)

const dataStructureCode =
  "struct Node{\n" + "    int inputs[20];\n" + "    int outputs[20];\n" + "};\n"

console.log(dataStructureCode)

console.log("void cI2C_Task1Fun(void const * argument){")

console.log("    " + deviceDataType)

for (let i = 0; i < nodeModels.length; i++) {
  console.log("    Node node" + i + ";")
}
console.log("")

console.log("    while(1) {")
for (let i = 0; i < nodeModels.length; i++) {
  nodeModels[i].handle(nodes)
}
console.log("        osDelay(1000);\n")
console.log("        osDelay(100);")
console.log("    }")
console.log("}\n")

const endCode =
  "void cI2C_Task1(void) {\n" +
  "    osThreadDef(cI2C_Handle_Task1, cI2C_Task1Fun, osPriorityNormal, 0, 256);\n" +
  "    cI2C_Thread_Task1 = osThreadCreate(osThread(cI2C_Handle_Task1), NULL);\n" +
  "}\n\n" +
  "void cI2C_Task(void) {\n" +
  "    cI2C_Task1();\n" +
  "}"

console.log(endCode)

console.log("==========handling nodes end==========\n")
