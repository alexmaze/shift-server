import { INode, NodeTypePrimary, INodeType } from "../models"

export function getNodeVarName(node: INode) {
  switch (node.type.primary) {
    case NodeTypePrimary.Device:
      return `d_${node.id}`
    case NodeTypePrimary.Virtual:
      return `v_${node.id}`
    default:
      throw new Error("Unknow primary type: " + node.type.primary)
  }
}

export function getNodeVarType(node: INode) {
  switch (node.type.primary) {
    case NodeTypePrimary.Device:
      return "SlaveDevice"
    case NodeTypePrimary.Virtual:
      return "VirtualNode"
    default:
      throw new Error("Unknow primary type: " + node.type.primary)
  }
}

export function getNodeTypeKey(type: INodeType): string {
  return `${type.primary} -> ${type.secondary} -> ${type.tertiary}`
}
