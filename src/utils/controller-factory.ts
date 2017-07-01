import * as express from "express"

export function newController(options?: express.RouterOptions) {
  return express.Router(options)
}
