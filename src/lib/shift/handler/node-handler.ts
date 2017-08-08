import { AndPatch } from "../model/virtual/logic/and-patch"
import { OrPatch } from "../model/virtual/logic/or-patch"
import { NotPatch } from "../model/virtual/logic/not-patch"
import { ConditionalPatch } from "../model/virtual/logic/conditional-patch"

import { AbsPatch } from "../model/virtual/math/abs-patch"
import { LinearPatch } from "../model/virtual/math/linear-patch"
import { TrigonometryPatch } from "../model/virtual/math/trigonometry-patch"

import { ArithmeticPatch } from "../model/virtual/operator/arithmetic-patch"
import { CompoundPatch } from "../model/virtual/operator/compound-patch"

import { SwitchNode } from "../model/device/switch/switch-node"
import { RGBNode } from "../model/device/module/rgb-node"

export class NodeHandler {
  static createNode(commonNode) {
    const primary = commonNode.type.primary
    const secondary = commonNode.type.secondary
    const tertiary = commonNode.type.tertiary

    console.log(primary + "/" + secondary + "/" + tertiary)

    switch (primary) {
      case "virtual":
        switch (secondary) {
          case "logic":
            switch (tertiary) {
              case "and":
                return new AndPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              case "or":
                return new OrPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              case "not":
                return new NotPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              case "conditional":
                return new ConditionalPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              default:
                throw "ERROR"
            }
          case "math":
            switch (tertiary) {
              case "abs":
                return new AbsPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              case "linear":
                return new LinearPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              case "trigonometry":
                return new TrigonometryPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              default:
                throw "ERROR"
            }
          case "operator":
            switch (tertiary) {
              case "arithmetic":
                return new ArithmeticPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              case "compound":
                return new CompoundPatch(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              default:
                throw "ERROR"
            }
          default:
            throw "ERROR"
        }
      case "device":
        switch (secondary) {
          case "module":
            switch (tertiary) {
              case "rgb":
                return new RGBNode(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              default:
                throw "ERROR"
            }
          case "switch":
            switch (tertiary) {
              case "snap":
                return new SwitchNode(
                  commonNode.id,
                  commonNode.type,
                  commonNode.address,
                  commonNode.operation,
                  commonNode.label,
                  commonNode.position,
                  commonNode.inputs,
                  commonNode.outputs
                )
              default:
                throw "ERROR"
            }
          default:
            throw "ERROR"
        }
      default:
        throw "ERROR"
    }
  }
}
