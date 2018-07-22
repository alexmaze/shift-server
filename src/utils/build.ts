import { spawn } from "child_process";
import { resolve } from "path"
import * as fs from "fs"

export function buildBin(c: string, h: String) {
    const p = "C:\\Users\\Alex\\Desktop\\cdi\\smartnoderYth\\YD-HalCdiLibrary"
    const pb = "C:\\Users\\Alex\\Desktop\\cdi\\smartnoderYth\\Master\\MasterApp\\MDK-ARM"
    const pu = "C:\\Users\\Alex\\Desktop\\cdi\\shift-server\\public\\upload"

    // copy files
    fs.writeFileSync(resolve(p, "cAppTask.c"), c)
    fs.writeFileSync(resolve(p, "cAppTask.h"), h)


    // do build
    const bat = resolve('./build.bat');
    console.log(bat)

    return new Promise((res, rej) => {
      const cmd = spawn(bat);
      cmd.on("close", () => {
        console.log("done.")
        const name = new Date().getTime() + ".bin"
        fs.renameSync(resolve(pb, "Master.bin"), resolve(pu, name))

        
        const size = fs.statSync(resolve(pu, name)).size

        res({
          path: "public/upload/"+name,
          size
        })
      })
    })

}