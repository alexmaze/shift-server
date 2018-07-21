import {
  INode,
  NodeTypePrimary,
  INodeType,
  INodeInput,
  INodeOutput
} from "../models"

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

export function findInputPort(node: INode, port: number): INodeInput {
  return node.inputs.find(input => input.port === port)
}

export function findOutputPort(node: INode, port: number): INodeOutput {
  return node.outputs.find(input => input.port === port)
}

export function findRefNode(refId: string, nodes: INode[]): INode {
  return nodes.find(node => node.id === refId)
}
