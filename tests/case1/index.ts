import * as fs from "fs"
import { shift } from "../../src/lib/shift"

const data = fs.readFileSync("./input.json", "utf-8")
const ret = shift(JSON.parse(data))

console.log(ret)
