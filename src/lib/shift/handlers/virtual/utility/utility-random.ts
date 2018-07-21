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
//   secondary: "utility",
//   tertiary: "utility_random"
// }

// export class UtilityRandomHandler extends AbstractNodeHandler {
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

//     const ip0 = findInputPort(node, 0)
//     const ip0Target = findRefNode(ip0.refId, ctx.data)
//     const ip0TargetName = getNodeVarName(ip0Target)
//     loopWriter.writeLine(`${varName}_0 = ${ip0TargetName}.data[1];`)

//     const ip1 = findInputPort(node, 1)
//     const ip1Target = findRefNode(ip1.refId, ctx.data)
//     const ip1TargetName = getNodeVarName(ip1Target)
//     loopWriter.writeLine(`${varName}_1 = ${ip1TargetName}.data[1];`)

//     // TODO
//   }
// }

// ?
