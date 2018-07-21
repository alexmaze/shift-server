import * as fs from "fs"
import { Shift } from "../../src/lib/shift"

const data = JSON.parse(fs.readFileSync("./input.json", "utf-8"))

const shift = new Shift(data)

shift.compile()

console.log("========== cAppTask.c ===========")
console.log(shift.renderC())
console.log("========== cAppTask.h ===========")
console.log(shift.renderH())
console.log("=================================")
