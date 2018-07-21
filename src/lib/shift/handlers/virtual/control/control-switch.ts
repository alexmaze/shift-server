// import {
//   INode,
//   IContext,
//   INodeType,
//   NodeTypePrimary,
//   NodeInputSourceType
// } from "../../../models"
// import { AbstractNodeHandler } from "../../abstract-handler"
// import { writeCommonSetup } from "../../../utils/handler"
// import {
//   getNodeVarName,
//   findOutputPort,
//   findInputPort,
//   findRefNode
// } from "../../../utils/node"

// const TYPE: INodeType = {
//   primary: NodeTypePrimary.Virtual,
//   secondary: "control",
//   tertiary: "control_switch"
// }

// export class ControlSwitchHandler extends AbstractNodeHandler {
//   getSupportedType() {
//     return TYPE
//   }

//   handle(node: INode, ctx: IContext) {
//     const { setupWriter, loopWriter } = ctx
//     const varName = getNodeVarName(node)

//     // DEF
//     // no extra diff

//     // SETUP
//     writeCommonSetup(setupWriter, node)

//     // LOOP

//     for (let i = 0; i < node.inputs.length; i++) {
//       const ipi = findInputPort(node, i)
//       const targetNode = findRefNode(ipi.refId, ctx.data)
//       const targetNodeVarName = getNodeVarName(targetNode)

//       // loopWriter.writeLine(`${varName}_${i} = ${targetNodeVarName}.data;`)

//       if (i === 0) {
//         loopWriter.writeLine(`switch (${varName}_${i}) {`)
//       } else if (i === 1) {
//         loopWriter.writeLine(`  default:`)
//         loopWriter.writeLine(`    ${varName}.data = ${targetNodeVarName}.data;`)
//         loopWriter.writeLine(`    break;`)
//       } else {
//         loopWriter.writeLine(`  case :`)
//         loopWriter.writeLine(`    ${varName}.data = ${targetNodeVarName}.data;`)
//         loopWriter.writeLine(`    break;`)
//       }
//     }
//     loopWriter.writeLine(`}`)
//   }
// }

// ? 有歧义
